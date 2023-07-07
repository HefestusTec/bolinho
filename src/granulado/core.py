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
import serial
from granulado import Messages


class Granulado:
    hardware: serial.Serial | None = None

    def isConnected(self):
        """Is the backend connected to the embedded hardware, returns a boolean"""
        return False if self.hardware is None else True

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
            self.hardware = serial.Serial(port=port, baudrate=baudrate, timeout=timeout)
            return 1
        except:
            return 0

    def sendSerialMessage(self, message: Messages):
        if self.isConnected():
            self.hardware.write(bytes(message, "utf-8"))

    def process(self):
        if self.isConnected():
            received = self.hardware.readline()
            if received:
                print(received, flush=True)

    def end(self):
        self.hardware.close()
