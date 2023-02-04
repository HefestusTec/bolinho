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

from RPi.GPIO import setmode, BCM, setup, OUT, HIGH, LOW, output


class DataHandler:
    """
    Base class for data handlers.
    """

    def __init__(self, pin):
        self.pin = pin
        setmode(BCM)
        setup(self.pin, OUT)
        output(self.pin, LOW)

    def read():
        pass


class LoadCell(DataHandler):
    """
    Class for handling load cell data.
    """

    def __init__(self, pin):
        super().__init__(pin)

    def read(self):
        output(self.pin, HIGH)


class StepMotor(DataHandler):
    """
    Class for handling step motor data.
    """

    def __init__(self, pin):
        super().__init__(pin)

    def read(self):
        output(self.pin, HIGH)
