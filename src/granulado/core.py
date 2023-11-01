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

from bolinho_api.ui import ui_api
from bolinho_api.core import core_api


class Granulado:
    def __init__(self, timeout: float = 2):
        self.__hardware: serial.Serial | None = None
        self.__top = False
        self.__bottom = False
        self.__moving = False
        self.__instant_load = 0
        self.__instant_position = 0
        self.__ping = 0
        self.__z_axis_length = 0
        self.__time_since_last_refresh = 0
        self.__last_is_connected = None

    def __del__(self):
        self.__end()

    def __refresh_ping(self):
        current_time = time.time() * 1000.0

        if current_time + 100 > self.__time_since_last_refresh:  # ~10 FPS refresh rate
            self.__time_since_last_refresh = current_time

            self.__send_serial_message("p")

    def loop(self):
        is_conn = self.is_connected()
        if is_conn != self.__last_is_connected:
            self.__last_is_connected = is_conn
            core_api.set_is_connected(is_conn)
        if not is_conn:
            return False

        self.__refresh_ping()

        # Check if there is a message to be read
        """
        if self.__hardware.in_waiting <= 0:
        
            now = time.time()
            if now - self.__last_read > self.__timeout:
                ui_api.prompt_user(
                    description="A máquina parece estar desconectada. Verifique a conexão e tente novamente.",
                    options=["Tentar novamente"],
                    callback_func=lambda x: ui_api.set_focus("connection-component"),
                )
                return
                """

        # Read message from usb
        received = self.__hardware.readline()
        # decode to utf-8
        decodedMessage = received.decode()
        response = decodedMessage[0]
        value = decodedMessage[1:].replace("\r", "").replace("\n", "")

        if response == "p":
            self.__ping = time.time()
        elif response == "e":
            self.__error(value)
        elif response == "r":
            self.__instant_load = float(value)
        elif response == "g":
            self.__instant_position = int(value)
        elif response == "j":
            self.__z_axis_length = int(value)
        if response == "t":
            self.__top = True
            self.__bottom = False
            self.__moving = False
        elif response == "b":
            self.__top = False
            self.__bottom = True
            self.__moving = False
        elif response == "m":
            self.__top = self.__bottom = False
            self.__moving = True
        elif response == "s":
            self.__moving = False

        return True

    def start_experiment(self, compress: bool):
        pass

    def get_is_moving(self):
        return self.__moving

    def get_end_of_axis(self):
        return self.__top, self.__bottom

    def __error(self, error_message):
        self.__send_serial_message("s")
        ui_api.prompt_user(
            description=f"Erro: {error_message}",
            options=["Voltar para a página inicial"],
            callback_func=core_api.go_to_home_page,
        )

    def check_experiment_routine(self):
        checks = [
            self.check_granulado_is_connected(),
            self.check_global_limits(),
            self.check_current_load(),
        ]
        return all(checks)

    def check_granulado_is_connected(self):
        if time.time() - self.__ping > 1000 and self.__ping != 0:
            ui_api.prompt_user(
                description=f"A máquina parece estar desconectada ({time.time() - self.__ping }s). Verifique a conexão e tente novamente.",
                options=["Tentar novamente"],
                callback_func=lambda x: ui_api.set_focus("connection-component"),
            )
            core_api.set_is_connected(False)
            return False
        core_api.set_is_connected(True)
        return True

    def get_readings(self):
        """
        Sends messages to Granulado to get the current load and position, waits for the response and returns the values
        """
        import random

        self.__instant_position += 1
        return random.randrange(0, 100), self.__instant_position
        if self.__send_serial_message("r"):
            if self.__send_serial_message("g"):
                eel.sleep(0.1)
                return self.__instant_load, self.__instant_position

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
            config.get("absoluteMaximumForce", 0) > 0,
            config.get("absoluteMaximumTravel", 0) > 0,
            config.get("absoluteMaximumTime", 0) > 0,
            config.get("zAxisLength", 0) > 0,
            config.get("knownWeight", 0) > 0,
            len(config.get("port", "")) > 0,
        ]
        if all(checks):
            return True

        prompt_text = f"""Os seguintes parâmetros devem ser definidos antes de iniciar o experimento:
        {'- Força máxima absoluta' if not checks[0] else ''}
        {'- Deslocamento máximo absoluto' if not checks[1] else ''}
        {'- Tempo máximo absoluto' if not checks[2] else ''}
        {'- Comprimento do eixo Z' if not checks[3] else ''}
        {'- Peso conhecido' if not checks[4] else ''}
        {'- Porta' if not checks[5] else ''}
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
        if not self.__top:
            self.__top = self.__bottom = False
            return self.__send_serial_message("t")
        return False

    def bottom_z_axis(self):
        if not self.__bottom:
            self.__top = self.__bottom = False
            return self.__send_serial_message("b")
        return False

    def stop_z_axis(self):
        return self.__send_serial_message("s")

    def move_z_axis_millimeters(self, millimeters: int):
        self.__moving = True
        return self.__send_serial_message(f"m{int(millimeters)}")

    def tare_load(self):
        """
        Send serial message to Granulado to tare the load cell
        """
        self.__moving = False
        return self.__send_serial_message("@")

    def is_connected(self):
        """Is the backend connected to the embedded hardware, returns a boolean"""
        return self.__hardware is not None

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
        try:
            from exposed_core import load_config_params, save_config_params

            self.__hardware = serial.Serial(port=port, baudrate=baudrate)
            print(self.__hardware)
            config = load_config_params()
            config["port"] = port
            save_config_params(config)
            return 1
        except Exception as e:
            print(e)
            return 0

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
        try:
            self.__hardware = self.__hardware.close()
            return 1
        except:
            return 0

    def __send_serial_message(self, message: str):
        if not self.is_connected():
            return False
        try:
            self.__hardware.write(bytes(message, "utf-8"))
            eel.sleep(0.001)
            return True
        except Exception as e:
            print(e)
            return False

    def __end(self):
        if not self.is_connected():
            return
        self.__hardware.close()
        self.__hardware = None
