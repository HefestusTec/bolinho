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
import json

from bolinho_api.classes import Readings
from bolinho_api.classes import Material

from bolinho_api.helper import DictToObject


class ExperimentAPI:
    def set_time(self, newTime: float):
        """
        Sets the current time percentage.

        This variable is shown to the user in a progress bar. And is usually between 0-100.
        """
        return eel.setTimeJS(newTime)

    def get_readings(self) -> Readings:
        """
        Asks the front for the current Readings.

        Returns an object of type Readings, this object gathers all the current readings of the machine.
        Such as Current z axis position, current load, and status
        """
        return DictToObject(eel.getReadingsJS()())

    def set_readings(self, newValue: Readings):
        """
        Sets the current Readings.

        Receives an object of type Readings, this object gathers all the current readings of the machine.
        Such as Current z axis position, current load, and status.

        This function dumps the object to a JSON and sends it to the front end
        """
        formatted_json = json.dumps(newValue, default=lambda x: x.__dict__)

        return eel.setReadingsJS(formatted_json)


experiment_api = ExperimentAPI()
