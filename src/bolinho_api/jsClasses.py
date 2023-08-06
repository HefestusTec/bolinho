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

"""
All the classes in this file are formatted such when parsing to JSON all names are compatible with the front end
"""


class Readings:
    """
    This class gathers the machine readings such as position and load.
    """

    def __init__(self, zAxisPos=0, loadReading=0, status=""):
        self.zAxisPos = zAxisPos
        self.loadReading = loadReading
        self.status = status


class Material:
    """
    Class that gathers a material information
    """

    def __init__(
        self, id=0, name="", batch=0, experimentArray=[], supplier="", extraInfo=""
    ):
        self.id = id
        self.name = name
        self.batch = batch
        self.experimentArray = experimentArray
        self.supplier = supplier
        self.extraInfo = extraInfo
