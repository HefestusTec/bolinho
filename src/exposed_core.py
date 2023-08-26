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
import serial
import json
import serial.tools.list_ports
from time import time

from bolinho_api.ui import ui_api
from bolinho_api.core import core_api

from granulado.core import Granulado
from DBHandler import db_handler

_CONFIG_PARAMS_PATH = "persist/configParams.json"


granulado = None


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


@eel.expose
def check_can_start_experiment():
    """
    The front end will call this function when the user click to start experiment.

    The backend **MUST** respond with a 1 if everything is ok or 0 if something is not correct.

    In case something is wrong the backend also displays an error to the user telling what went wrong
    """
    # TODO implement me
    return 1


@eel.expose
def start_experiment_routine(experiment_id: int):
    """
    The front end will call this function after everything is correct and ready to change pages.

    Receives an `id` to an experiment as parameter.

    The backend **MUST** send a command to change to the experiment page.

    Returns 1 if succeeded.
    """
    experiment = db_handler.get_experiment_by_id(experiment_id)
    if experiment is None:
        ui_api.error_alert(
            "Não foi possível iniciar o experimento. O experimento não foi encontrado.",
        )
    material_id = experiment.get("material_id")
    if material_id is None:
        ui_api.error_alert(
            "Não foi possível iniciar o experimento. O experimento não possui material associado.",
        )
    material = db_handler.get_material_by_id(material_id)
    if material is None:
        ui_api.error_alert(
            "Não foi possível iniciar o experimento. O material não foi encontrado.",
        )
    compress = material.get("compress")
    if compress is None:
        ui_api.error_alert(
            "Não foi possível iniciar o experimento. O material não possui parâmetro de compressão/tração definida.",
        )

    global granulado
    if not granulado.stop_z_axis():
        ui_api.error_alert(
            "Não foi possível iniciar o experimento. O eixo Z não foi parado. O Granulado está conectado?",
        )
    if not (granulado.return_z_axis() if compress else granulado.bottom_z_axis()):
        ui_api.error_alert(
            "Não foi possível iniciar o experimento. O eixo Z não foi retornado ao topo. O Granulado está conectado?",
        )

    while granulado.get_is_moving():
        eel.sleep(1)

    if not (granulado.bottom_z_axis() if compress else granulado.return_z_axis()):
        ui_api.error_alert(
            "Não foi possível iniciar o experimento. O eixo Z não foi movido para a base. O Granulado está conectado?",
        )

    readings = []

    while granulado.get_is_moving():
        readings.append(granulado.get_readings())
        eel.sleep(0.01)

    data = [
        {
            "x": x,
            "experiment": experiment_id,
            "load": reading[x][0],
            "z_pos": reading[x][1],
        }
        for x, reading in enumerate(readings)
    ]

    reading_ids = [db_handler.post_reading(reading) for reading in data]

    # Do not remove
    core_api.go_to_experiment_page()
    return 1


@eel.expose
def end_experiment_routine():
    """
    The front end will call this function when the user click to end experiment.

    The backend **MUST** send a command to change to the home page.

    Returns 1 if succeeded.
    """

    # TODO Add implementation
    core_api.go_to_home_page()
    return 1


@eel.expose
def prompt_return(
    return_value,
):
    """
    Passes the "return_value" to the stored prompt function
    """
    ui_api.return_prompt_function(return_value)


@eel.expose
def set_custom_movement_distance(new_movement_distance):
    """
    # DEPRECATED

    Sets the movement distance that the z-axis moves when the user is controlling the machine manually.

    This distance is set in MILLIMETERS

    Returns 1 if succeeded.

    """
    print("movement distance set to " + str(new_movement_distance))
    return 1


@eel.expose
def return_z_axis():
    """
    Returns the z-axis to the origin.

    Returns 1 if succeeded (if the function was acknowledged).
    """
    global granulado
    return granulado.return_z_axis()


@eel.expose
def stop_z_axis():
    """
    Stops the z-axis.

    Returns 1 if succeeded (if the function was acknowledged).
    """
    global granulado
    return granulado.stop_z_axis()


@eel.expose
def move_z_axis_millimeters(distance):
    """
    Moves the z-axis [distance]mm.

    This distance is set in MILLIMETERS

    Returns 1 if succeeded (if the function was acknowledged).
    """
    global granulado
    return granulado.move_z_axis_millimeters(distance)


@eel.expose
def get_available_ports_list():
    """
    Returns a JSON object containing the available COM ports:
    ``` JSON
    {
        "port": x,
        "desc": y,
    }
    ```
    """
    ports = serial.tools.list_ports.comports()
    ports_dict = []
    for port, desc, _ in sorted(ports):
        ports_dict.append({"port": port, "desc": desc})
    return ports_dict


@eel.expose
def connect_to_port(port: str):
    """
    Connects to a port. The port argument is a string like `COM4`

    TODO IMPLEMENT THIS FUNCTION

    """
    global granulado
    granulado = Granulado(port)
    while not granulado.connect(port, 115200):
        print(f"Connecting to {port}@115200...")
        eel.sleep(1)

    return granulado.check_granulado_is_connected()


@eel.expose
def tare_load():
    """
    Tares the load cell

    Returns 1 if succeeded (if the function was acknowledged).

    TODO IMPLEMENT THIS FUNCTION
    """
    print("Tare load function was called")
    return 1


@eel.expose
def calibrate_known_weight():
    """
    Calibrates the load cell to the known weight

    Returns 1 if succeeded (if the function was acknowledged).

    TODO IMPLEMENT THIS FUNCTION
    """
    print("Calibrate to the known weight")
    return 1


@eel.expose
def calibrate_z_axis():
    """
    Calibrates z axis of the machine

    Returns 1 if succeeded (if the function was acknowledged).

    TODO IMPLEMENT THIS FUNCTION
    """
    print("Calibrate z axis")
    return 1
