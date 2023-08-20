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


class Granulado:
    def __init__(self, timeout: float = 0.1):
        self.__hardware: serial.Serial | None = None
        self.__top = False
        self.__bottom = False
        self.__instant_load = 0
        self.__instant_position = 0
        self.__ping = 0
        self.__timeout = timeout

    def __machine_calibrated_callback(self, response):
        if response == "Não":
            ui_api.set_focus("calib-page")
            return
        if response == "Sim":
            self.__run_experiment()

    def loop(self):
        # Read message from usb
        received = self.__hardware.readline()
        # decode to utf-8
        decodedMessage = received.decode()
        response = decodedMessage[0]

        if response == "p":
            self.__ping = time.time()
        if response == "t":
            self.__top
        elif response == "b":
            self.__bottom = True
        elif response == "r":
            self.__instant_load = int(decodedMessage[1:])
        elif response == "g":
            self.__instant_position = int(decodedMessage[1:])
        elif response == "e":
            self.__error(decodedMessage[1:])

    def __error(error_message):
        ui_api.prompt_user(
            description=f"Erro: {error_message}",
            options=["Ok"],
            callback_func=lambda x: None,
        )

    def __run_experiment(self):
        pass

    def check_experiment_routine(self):
        if not self.check_granulado_is_connected():
            return False
        if not self.check_global_limits():
            return False
        if not self.check_current_load():
            return False

        ui_api.prompt_user(
            description="A máquina está calibrada?",
            options=["Sim", "Não"],
            callback_func=self.__machine_calibrated_callback,
        )

    def check_granulado_is_connected(self):
        if self.__send_serial_message("p"):
            # Read message from usb
            received = self.__hardware.readline()
            # Decode message
            decodedMessage = received.decode()
            if decodedMessage == "p":
                return True
        return False

    def check_global_limits(self):
        pass

    def check_current_load(self):
        pass

    def return_z_axis(self):
        return self.__send_serial_message("t")

    def stop_z_axis(self):
        return self.__send_serial_message("s")

    def move_z_axis_millimeters(self, millimeters: int):
        return self.__send_serial_message(f"m{int(millimeters)}")

    def tare_load(self):
        return self.__send_serial_message("@")

    def __is_connected(self):
        """Is the backend connected to the embedded hardware, returns a boolean"""
        return False if self.__hardware is None else True

    def connect(self, port: str, baudrate: int, timeout: float = 0.1):
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
            self.__hardware = serial.Serial(
                port=port, baudrate=baudrate, timeout=timeout
            )
            return 1
        except:
            return 0

    def __send_serial_message(self, message: str):
        if self.__is_connected():
            self.__hardware.write(message)
            return True
        return False

    def end(self):
        self.__hardware.close()
