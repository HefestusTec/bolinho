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

from bolinho_api.jsClasses import Readings
from bolinho_api.jsClasses import Material

from bolinho_api.helper import DictToObject


class ExperimentAPI:
    def get_load_percentage(self) -> float:
        """
        Asks the front for the current load percentage.

        This variable is shown to the user in a progress bar. And is usually between 0-100.

        Returns the load percentage value
        """
        return eel.getLoadPercentageJS()()

    def set_load_percentage(self, newPercentage: float):
        """
        Sets the current load percentage.

        This variable is shown to the user in a progress bar. And is usually between 0-100.
        """
        return eel.setLoadPercentageJS(newPercentage)

    def get_time_percentage(self) -> float:
        """
        Asks the front for the current time percentage.

        This variable is shown to the user in a progress bar. And is usually between 0-100.

        Returns the load percentage value
        """
        return eel.getTimePercentageJS()()

    def set_time_percentage(self, newPercentage: float):
        """
        Sets the current time percentage.

        This variable is shown to the user in a progress bar. And is usually between 0-100.
        """
        return eel.setLoadPercentageJS(newPercentage)

    def get_distance_percentage(self) -> float:
        """
        Asks the front for the current distance percentage.

        This variable is shown to the user in a progress bar. And is usually between 0-100.

        Returns the load percentage value
        """
        return eel.getDistancePercentageJS()()

    def set_distance_percentage(self, newPercentage: float):
        """
        Sets the current distance percentage.

        This variable is shown to the user in a progress bar. And is usually between 0-100.
        """
        return eel.setDistancePercentageJS(newPercentage)

    def get_delta_load_percentage(self) -> float:
        """
        Asks the front for the current delta load percentage.

        This variable is shown to the user in a progress bar. And is usually between 0-100.

        Returns the load percentage value
        """
        return eel.getDeltaLoadPercentageJS()()

    def set_delta_load_percentage(self, newPercentage: float):
        """
        Sets the current delta load percentage.

        This variable is shown to the user in a progress bar. And is usually between 0-100.
        """
        return eel.setDeltaLoadPercentageJS(newPercentage)

    def get_experiment_parameters(self) -> str:
        """
        Asks the front for the current experiment parameters.

        Returns a formatted string
        """
        return eel.getExperimentParametersJS()()

    def set_experiment_parameters(self, newValue: str):
        """
        Sets the current experiment parameters.

        Receives a formatted string.
        """
        return eel.setExperimentParametersJS(newValue)

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

    def get_description(self) -> str:
        """
        Asks the front for the current description.

        Returns a formatted string
        """
        return eel.getDescriptionJS()()

    def set_description(self, newValue: str):
        """
        Sets the current description.

        Receives a formatted string.
        """
        return eel.setDescriptionJS(newValue)

    def get_material(self) -> Material:
        """
        Asks the front for the current Material.

        Returns an object of type Material.
        """
        return DictToObject(eel.getMaterialJS()())

    def set_material(self, newValue: Material):
        """
        Sets the current Material.

        Receives an object of type Material

        This function dumps the object to a JSON and sends it to the front end
        """
        formatted_json = json.dumps(newValue, default=lambda x: x.__dict__)

        return eel.setMaterialJS(formatted_json)


experiment_api = ExperimentAPI()
