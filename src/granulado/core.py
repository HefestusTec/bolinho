# Copyright (C) 2023 Hefestus
#
# This file is part of Bolinho.
#
# Bolinho is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# Bolinho is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with Bolinho.  If not, see <http://www.gnu.org/licenses/>.

import eel
import time
import serial
from enum import Enum

from bolinho_api.ui import ui_api
from bolinho_api.core import core_api
import exposed_core

KG_TO_NEWTONS = 9.80665
NEWTONS_TO_KG = 0.101971621
MOTOR_STEPS = 200
MOTOR_MICRO_STEPS = 64
DEFAULT_RPM = 15


class Granulado:
    def __init__(self, forced_stop_callback):
        self.__hardware: serial.Serial | None = None
        self.__instant_load = 0
        self.__instant_position = 0
        self.__ping = 0
        self.__z_axis_length = 0
        self.__delta_load = 0  # variation of the load measured in grams/second
        self.__time_since_last_refresh = 0
        self.__last_is_connected = None
        self.__serial_buffer = ""
        self.__forced_stop_callback = forced_stop_callback
        self.mm_per_revolution = 0

    def __del__(self):
        self.__end()

    def __refresh_ping(self):
        return
        current_time = time.time()

        # refresh ping every 10 second
        if current_time - self.__time_since_last_refresh > 10:
            self.__time_since_last_refresh = current_time
            self.__send_serial_message("p")

    def __send_serial_message(self, message: str):
        """
        Concatenates the message + "\n" to the serial buffer, checks if Granulado is connected then sends it to the serial device
        """
        self.__serial_buffer += message + "\n"

        if not self.is_connected():
            ui_api.error_alert("O Granulado não está conectado")
            self.__end()
            return False
        return True

    def __error(self, error_message):
        """
        Sends a message to Granulado to stop the z axis and prompts the user with the error message
        """

        if not self.__send_serial_message("s"):
            ui_api.error_alert(
                "Não foi possível parar o eixo Z. O Granulado está conectado?",
            )
        ui_api.error_alert(f"Mensagem de erro do Granulado: {error_message}")

    def __send_buffer(self):
        """
        Sends the serial buffer to the serial device encoded in utf-8 then clears the buffer
        """
        try:
            if not self.__hardware.writable():
                self.disconnect()
                return False
            if (
                self.__hardware.write(bytes(f"{self.__serial_buffer}", "utf-8"))
                is not None
            ):
                self.__serial_buffer = ""
                return True
            self.disconnect()
            return False
        except Exception as e:
            ui_api.error_alert(f"Não foi possível escrever no Granulado: {str(e)}")
            self.__end()
            return False

    def __end(self):
        """
        Closes the serial connection, sets the connection status to False and resets the variables
        """
        if self.__hardware is not None:
            if self.__hardware.isOpen():
                self.__hardware.close()
            self.__hardware = None
        self.__instant_load = 0
        self.__instant_position = 0
        self.__ping = 0
        self.__serial_buffer = ""
        core_api.set_is_connected(False)

    def loop(self):
        is_conn = self.is_connected()
        if is_conn != self.__last_is_connected:
            self.__last_is_connected = is_conn
            core_api.set_is_connected(is_conn)
        if not is_conn:
            return False

        self.__refresh_ping()
        self.__update_delta_load()
        self.__send_buffer()
        try:
            # Check if there is a message to be read
            if self.__hardware.in_waiting <= 0:
                return
            buffer = self.__hardware.read_all()
            cmds = [x for x in buffer.split(b"\n") if x != b""]
            for cmd in cmds:
                # decode from utf-8
                decodedMessage = cmd.decode()
                response = decodedMessage[0]
                value = decodedMessage[1:].replace("\r", "").replace("\n", "")
                match response:
                    case "p":
                        self.__ping = time.time()
                    case "e":
                        self.__error(value)
                    case "r":
                        load = float(value)
                        # convert kg to Newtons 1kg = 9.80665N
                        self.__instant_load = load * KG_TO_NEWTONS
                    case "g":
                        self.__instant_position = (
                            int(value) / (MOTOR_STEPS * MOTOR_MICRO_STEPS)
                        ) * self.mm_per_revolution
                    case "j":
                        self.__z_axis_length = int(value)
                    case "b":
                        ui_api.error_alert(
                            "Sensor de fim de curso inferior foi acionado!"
                        )
                        self.stop_z_axis()
                    case "t":
                        ui_api.error_alert(
                            "Sensor de fim de curso superior foi acionado!"
                        )
                        self.stop_z_axis()
                    case "d":
                        kg_s = float(value)
                        # convert kg/s to Newtons/s 1kg = 9.80665N
                        self.__delta_load = kg_s * KG_TO_NEWTONS
                    case "s":
                        ui_api.error_alert("O motor for interrompido")
                        try:
                            print("trying to call callback")
                            self.__forced_stop_callback()
                            print("callback called")
                        except e:
                            print(e)
                    case "i":
                        print(f"GRANULADO says: {value}")
                    case _:
                        ui_api.error_alert(
                            f"Resposta inesperada do Granulado: ''{response}''"
                        )

            return True
        except serial.SerialException as e:
            ui_api.error_alert(f"Erro de conexão com o Granulado: {str(e)}")
            return False
        except Exception as e:
            return False

    def get_readings(self):
        """
        Sends messages to Granulado to get the current load and position, waits for the response and returns the values
        """
        # import random

        # self.__instant_position += 1
        #   return random.randrange(0, 100), self.__instant_position

        if self.get_load() and self.get_position():
            return self.__instant_load, self.__instant_position
        return -1, -1

    def get_position(self):
        """
        Send serial message to Granulado to get the current position
        """
        return self.__send_serial_message("g")

    def get_load(self):
        """
        Send serial message to Granulado to get the current load
        """
        return self.__send_serial_message("r")

    def get_delta_load(self):
        """
        Returns the latest delta load
        """
        return self.__delta_load

    def __update_delta_load(self):
        """
        Send serial message to Granulado to get the latest current load
        """
        return self.__send_serial_message("d")

    def check_experiment_routine(self):
        checks = [
            self.check_granulado_is_connected(),
            self.check_global_limits(),
            self.check_current_load(),
        ]
        return all(checks)

    def check_granulado_is_connected(self):
        """
        Checks if the time since the last ping is greater than a threshold (10 seconds),
        if it is, the user is prompted to check the connection, if not, the connection is set to True
        """
        if time.time() - self.__ping > 10 and self.__ping != 0:
            ui_api.prompt_user(
                description=f"A máquina parece estar desconectada ({(time.time() - self.__ping):2 }s). Verifique a conexão e tente novamente.",
                options=["Tentar novamente"],
                callback_func=lambda x: ui_api.set_focus("connection-component"),
            )
            self.__end()
            core_api.set_is_connected(False)
            return False
        core_api.set_is_connected(True)
        return True

    def check_global_limits(self):
        """
        Checks if:
        - absoluteMaximumLoad is greater than 0
        - absoluteMaximumTravel is greater than 0
        - absoluteMaximumTime is greater than 0
        - absoluteMaximumDeltaLoad is greater than 0
        - zAxisLength is greater than 0
        - knownWeight is greater than 0
        Else, the user is prompted to set the parameters
        """

        config = exposed_core.load_config_params()
        checks = [
            int(config.get("absoluteMaximumLoad", 0)) > 0,
            int(config.get("absoluteMaximumTravel", 0)) > 0,
            int(config.get("absoluteMaximumTime", 0)) > 0,
            int(config.get("absoluteMaximumDeltaLoad", 0)) > 0,
            int(config.get("zAxisLength", 0)) > 0,
            int(config.get("knownWeight", 0)) > 0,
        ]
        if all(checks):
            return True

        prompt_text = f"""Os seguintes parâmetros devem ser definidos antes de iniciar o experimento:
        {'- Força máxima absoluta' if not checks[0] else ''}
        {'- Deslocamento máximo absoluto' if not checks[1] else ''}
        {'- Tempo máximo absoluto' if not checks[2] else ''}
        {'- Delta carga máxima' if not checks[3] else ''}
        {'- Comprimento do eixo Z' if not checks[4] else ''}
        {'- Peso conhecido' if not checks[5] else ''}
        {'- Porta' if not checks[6] else ''}
        """

        ui_api.prompt_user(
            description=prompt_text,
            options=["Definir parâmetros"],
            callback_func=lambda x: ui_api.set_focus("config-page"),
        )
        return False

    def check_current_load(self):
        """
        Check if the current load is lesser than a threshold
        TODO: Set the threshold in the config file
        """
        if self.__instant_load > 10:
            ui_api.error_alert(
                "A máquina está sob carga. Retire a carga e tente novamente."
            )
            return False
        return True

    def z_axis_top(self, rpm: int = DEFAULT_RPM):
        """
        Send serial message to Granulado to return the z axis to top
        """
        self.set_motor_rpm(rpm)
        eel.sleep(0.01)
        return self.__send_serial_message("t")

    def z_axis_bottom(self, rpm: int = DEFAULT_RPM):
        """
        Send serial message to Granulado to return the z axis to bottom
        """
        self.set_motor_rpm(rpm)

        eel.sleep(0.01)

        return self.__send_serial_message("b")

    def stop_z_axis(self):
        """
        Send serial message to Granulado to stop the z axis
        """
        
        return self.__hardware.write(bytes("s\n", "utf-8"))

    def move_z_axis_millimeters(self, millimeters: int, rpm: int = DEFAULT_RPM):
        """
        Send serial message to Granulado to move the z axis in millimeters
        """
        self.set_motor_rpm(rpm)
        eel.sleep(0.01)

        print(f"move {millimeters}mm PYTHON")

        config = exposed_core.load_config_params()
        millimeters_per_revolution = float(config.get("mmPerRevolution", 0))
        if millimeters_per_revolution <= 0:
            ui_api.error_alert(
                "Não foi possível mover o Eixo-z, o parâmetro Milímetros por Revolução está fora dos limites."
            )
            return False

        millimeters_per_step = millimeters_per_revolution / (
            MOTOR_STEPS * MOTOR_MICRO_STEPS
        )

        # convert millimeters to steps
        steps = millimeters // millimeters_per_step
        return self.__send_serial_message(f"m{steps}")

    def move_z_axis_revolutions(self, revolutions: float, rpm: int = DEFAULT_RPM):
        """
        Send serial message to Granulado to move the z axis in millimeters
        """
        self.set_motor_rpm(rpm)
        eel.sleep(0.01)

        steps = int(revolutions * MOTOR_STEPS * MOTOR_MICRO_STEPS)
        return self.__send_serial_message(f"m{steps}")

    def tare_load(self):
        """
        Send serial message to Granulado to tare the load cell
        """
        return self.__send_serial_message("@")

    def calibrate_known_weight(self):
        """
        Send serial message to Granulado to calibrate the load cell with the known weight
        """
        return self.__send_serial_message(f"w")

    def set_known_weight(self, known_weight: int):
        """
        Send serial message to Granulado to set the known weight in grams
        """
        return self.__send_serial_message(f"x{known_weight}")

    def get_z_axis_length(self):
        """
        Send serial message to Granulado to get the z axis length in millimeters
        """
        return self.__send_serial_message("j")

    def set_z_axis_length(self, z_axis_length: int):
        """
        Send serial message to Granulado to set the z axis length in millimeters
        """
        self.__z_axis_length = z_axis_length
        return self.__send_serial_message(f"y{self.__z_axis_length}")

    def set_max_load(self, max_load: float):
        """
        Send serial message to Granulado to set the max load, receives a value in Newtons and converts to kilograms (1N = 0.101971621kg)
        """
        return self.__send_serial_message(f"l{max_load * NEWTONS_TO_KG}")

    def set_max_travel(self, max_travel: int):
        """
        Send serial message to Granulado to set the max travel in millimeters
        """
        return self.__send_serial_message(
            f"v{(max_travel / self.mm_per_revolution) * MOTOR_STEPS * MOTOR_MICRO_STEPS}"
        )

    def set_max_delta_load(self, max_delta_load: float):
        """
        Send serial message to Granulado to set the max delta load, receives a value in Newtons/second and converts to kilograms/second (1N = 0.101971621kg)
        """
        return self.__send_serial_message(f"a{max_delta_load * NEWTONS_TO_KG}")

    def set_motor_rpm(self, rpm: int):
        """
        Send serial message to Granulado to set the motor RPM
        """
        return self.__send_serial_message(f"e{rpm}")

    def is_connected(self):
        """Is the backend connected to the embedded hardware, returns a boolean"""
        return (self.__hardware is not None) and self.__hardware.isOpen()

    def connect(self, port: str, baudrate: int):
        """
        Connects to a serial device

        returns 1 if SUCCEEDED

        returns 0 if FAILED

        Example of usage

            ```
            from granulado.core import Granulado

            gr = Granulado()
            gr.connect(port='COM4', baudrate=115200, timeout=.1)
            ```
        """
        print(f"porta: {port}")
        try:
            self.__hardware = serial.Serial(port=port, baudrate=baudrate, timeout=0.1)
            print(self.__hardware)
            core_api.set_is_connected(True)
        except Exception as e:
            ui_api.error_alert(f"Não foi possível conectar ao Granulado: {str(e)}")
            self.__end()
            return 0
        return 1

    def disconnect(self):
        """
        Disconnects from a serial device

        returns 1 if SUCCEEDED

        returns 0 if FAILED

        Example of usage

            ```
            from granulado.core import Granulado

            gr = Granulado()
            gr.disconnect()
            ```
        """
        print("disconnecting")
        return self.__end()
