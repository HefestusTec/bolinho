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


class CoreAPI:
    def ping(self):
        """Tries to ping the bolinho front-end, returns 1 if it worked"""
        return eel.pingJS()()

    def get_config_params(self):
        """Returns a JSON with all the params of the config"""
        return eel.getConfigJS()()

    def go_to_experiment_page(self):
        """
        Asks the frontend to go to the experiment page.

        Returns 1 if succeeded.
        """
        return eel.goToExperimentPageJS()()

    def go_to_home_page(self):
        """
        Asks the frontend to go to the home page.

        Returns 1 if succeeded.
        """
        return eel.goToHomePageJS()()

    def show_connect_prompt(self):
        """
        Asks the front end to show the connection prompt.

        The connection prompt is used to select the serial port.

        Returns 1 if succeeded.
        """
        return eel.showConnectPromptJS()()


core_api = CoreAPI()
