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


class ExperimentAPI:
    def get_load_percentage(self):
        """
        Asks the front for the current load percentage.

        LoadPercentage is shown to the user in a progress bar.

        This value is usually between 0-100

        Returns returns the LoadPercentage
        """
        return eel.getLoadPercentageJS()()

    def set_load_percentage(self, newPercentage: float):
        """
        Sets the current load percentage.

        LoadPercentage is shown to the user in a progress bar.

        This value is usually between 0-100

        """
        return eel.setLoadPercentageJS(newPercentage)


experiment_api = ExperimentAPI()
