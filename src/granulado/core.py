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


class Granulado:
    def __init__(self, timeout: float = 2):
        self.__hardware: serial.Serial | None = None
        self.__instant_load = 0
        self.__instant_position = 0
        self.__ping = 0
        self.__z_axis_length = 0
        self.__delta_load = 0  # variation of the load measured in grams/second
        self.__time_since_last_refresh = 0
        self.__last_is_connected = None

    def __del__(self):
        self.__end()

    def __refresh_ping(self):
        current_time = time.time() * 1000.0

        if current_time + 100 > self.__time_since_last_refresh:  # ~10 FPS refresh rate
            self.__time_since_last_refresh = current_time
            self.__send_serial_message("p")

    def __send_serial_message(self, message: str):
        if not self.is_connected():
            ui_api.error_alert("O Granulado não está conectado")
            self.__end()
            return False
        try:
            if not self.__hardware.writable():
                self.disconnect()
                return False
            if self.__hardware.write(bytes(message, "utf-8")) is not None:
                return True
            self.disconnect()
            return False
        except Exception as e:
            ui_api.error_alert(f"Não foi possível escrever no Granulado: {str(e)}")
            self.__end()
            return False

    def __error(self, error_message):
        if not self.__send_serial_message("s"):
            ui_api.error_alert(
                "Não foi possível parar o eixo Z. O Granulado está conectado?",
            )
        ui_api.prompt_user(
            description=f"Erro: {error_message}",
            options=["Voltar para a página inicial"],
            callback_func=core_api.go_to_home_page,
        )

    def __end(self):
        core_api.set_is_connected(False)
        if self.__hardware is not None:
            if self.__hardware.isOpen():
                self.__hardware.close()
            self.__hardware = None
        self.__instant_load = 0
        self.__instant_position = 0
        self.__ping = 0

    def loop(self):
        is_conn = self.is_connected()
        if is_conn != self.__last_is_connected:
            self.__last_is_connected = is_conn
            core_api.set_is_connected(is_conn)
        if not is_conn:
            return False

        self.__refresh_ping()
        self.__update_delta_load()
        # Check if there is a message to be read
        if self.__hardware.in_waiting <= 0:
            return

        try:
            # Read message from usb
            received = self.__hardware.readline()
            # decode to utf-8
            decodedMessage = received.decode()
            response = decodedMessage[0]
            value = decodedMessage[1:].replace("\r", "").replace("\n", "")
            match response:
                case "p":
                    self.__ping = time.time()
                case "e":
                    self.__error(value)
                case "r":
                    self.__instant_load = float(value)
                case "g":
                    self.__instant_position = int(value)
                case "j":
                    self.__z_axis_length = int(value)
                case "b":
                    ui_api.error_alert("Sensor de fim de curso inferior foi acionado!")
                    self.stop_z_axis()
                case "t":
                    ui_api.error_alert("Sensor de fim de curso superior foi acionado!")
                    self.stop_z_axis()
                case "d":
                    self.__delta_load = int(value)
                case "s":
                    ui_api.success_alert("O motor for interrompido")
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
        import random

        self.__instant_position += 1
        return random.randrange(0, 100), self.__instant_position

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
        Check if:
            max force, max travel and max time are greater than 0,
            Z axis length is greater than 0,
            known weight is greater than 0, and
            port is set.
        """
        from exposed_core import load_config_params

        config = load_config_params()
        checks = [
            int(config.get("absoluteMaximumLoad", 0)) > 0,
            int(config.get("absoluteMaximumTravel", 0)) > 0,
            int(config.get("absoluteMaximumTime", 0)) > 0,
            int(config.get("absoluteMaximumDeltaLoad", 0)) > 0,
            int(config.get("zAxisLength", 0)) > 0,
            int(config.get("knownWeight", 0)) > 0,
            len(config.get("port", "")) > 0,
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
        Check if the current load is lesser than a threshold (10N)
        """
        if self.__instant_load > 10:
            ui_api.error_alert(
                "A máquina está sob carga. Retire a carga e tente novamente."
            )
            return False
        return True

    def return_z_axis(self):
        return self.__send_serial_message("t")

    def stop_z_axis(self):
        return self.__send_serial_message("s")

    def move_z_axis_millimeters(self, millimeters: int):
        return self.__send_serial_message(f"m{millimeters}")

    def tare_load(self):
        return self.__send_serial_message("@")

    def calibrate_z_axis(self):
        """
        Send serial message to Granulado to calibrate the z axis
        """
        return self.__send_serial_message(f"z")

    def calibrate_known_weight(self):
        """
        Send serial message to Granulado to calibrate the load cell
        """
        return self.__send_serial_message(f"w")

    def set_known_weight(self, known_weight: int):
        """
        Send serial message to Granulado to set the known weight
        """
        return self.__send_serial_message(f"x{known_weight}")

    def get_z_axis_length(self):
        """
        Send serial message to Granulado to get the z axis length
        """
        return self.__send_serial_message("j")

    def set_z_axis_length(self, z_axis_length: int):
        """
        Send serial message to Granulado to set the z axis length
        """
        self.__z_axis_length = z_axis_length
        return self.__send_serial_message(f"y{self.__z_axis_length}")

    def set_max_load(self, max_load: int):
        """
        Send serial message to Granulado to set the max load
        """
        return self.__send_serial_message(f"l{max_load}")

    def set_max_travel(self, max_travel: int):
        """
        Send serial message to Granulado to set the max travel
        """
        return self.__send_serial_message(f"v{max_travel}")

    def set_max_delta_load(self, max_delta_load: int):
        """
        Send serial message to Granulado to set the max delta load
        """
        return self.__send_serial_message(f"a{max_delta_load}")

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
