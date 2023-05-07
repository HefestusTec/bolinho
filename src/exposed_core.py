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
import os
from bolinho_api import core_api

_CONFIG_PARAMS_PATH = "persist/configParams.json"


@eel.expose
def load_config_params():
    if not os.path.exists(_CONFIG_PARAMS_PATH):
        return 0
    with open(_CONFIG_PARAMS_PATH, "r") as open_file:
        # Reading from json file
        json_object = json.load(open_file)

    return json_object


@eel.expose
def save_config_params(new_params):
    os.makedirs(os.path.dirname(_CONFIG_PARAMS_PATH), exist_ok=True)
    # Serializing json
    json_object = json.dumps(new_params, indent=4)
    # Writing to sample.json
    with open(_CONFIG_PARAMS_PATH, "w") as outfile:
        outfile.write(json_object)
    print("saved")


@eel.expose
def start_experiment_routine():
    """
    The front end will call this function when the user click to start experiment.

    The back end **MUST** send a command to change to the experiment page.

    Returns 1 if succeeded.
    """
    core_api.go_to_experiment_page()
    return 1
