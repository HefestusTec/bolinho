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
from queue import Queue

from bolinho_api.ui import ui_api
from bolinho_api.core import core_api

from DBHandler import db_handler
from app_handler import bolinho_app
import realTimeR


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

    # write all config params to granulado if connected
    if bolinho_app.gran.is_connected():
        globalMaxLoad = float(new_params["absoluteMaximumLoad"])
        globalMaxTravel = int(new_params["absoluteMaximumTravel"])
        globalMaxTime = float(new_params["absoluteMaximumTime"])
        globalMaximumDeltaLoad = float(new_params["absoluteMaximumDeltaLoad"])
        globalZAxisLength = int(new_params["zAxisLength"])
        globalKnownWeight = int(new_params["knownWeight"])

        bolinho_app.set_granulado_configs(
            globalMaxLoad,
            globalMaxTravel,
            globalMaximumDeltaLoad,
            globalZAxisLength,
            globalMaxTime,
            globalKnownWeight,
        )


@eel.expose
def check_can_start_experiment():
    """
    The front end will call this function when the user click to start experiment.

    The backend **MUST** respond with a 1 if everything is ok or 0 if something is not correct.

    In case something is wrong the backend also displays an error to the user telling what went wrong
    """
    if bolinho_app.gran is None:
        ui_api.error_alert(
            "Não foi possível iniciar o experimento. O Granulado não está conectado.",
        )
        return 0
    return bolinho_app.gran.check_experiment_routine()


@eel.expose
def start_experiment_routine(experiment_id: int):
    """
    The front end will call this function after everything is correct and ready to change pages.

    Receives an `id` to an experiment as parameter.

    The backend **MUST** send a command to change to the experiment page.

    Returns the 1 if succeeded else 0.
    """
    experiment = db_handler.get_experiment_by_id(experiment_id)

    if experiment is None:
        ui_api.error_alert(
            "Não foi possível iniciar o experimento. O experimento não foi encontrado.",
        )
        return 0
    exp_body_id = experiment.body
    body = db_handler.get_body_by_id(exp_body_id)
    if body is None:
        ui_api.error_alert(
            "Não foi possível iniciar o experimento. O corpo não foi encontrado.",
        )
        return 0

    material_id = body.material
    if material_id is None:
        ui_api.error_alert(
            "Não foi possível iniciar o experimento. O experimento não possui material associado.",
        )
        return 0

    material = db_handler.get_material_by_id(material_id)
    if material is None:
        ui_api.error_alert(
            "Não foi possível iniciar o experimento. O material não foi encontrado.",
        )
        return 0

    compress = experiment.compress
    if compress is None:
        ui_api.error_alert(
            "Não foi possível iniciar o experimento. O material não possui parâmetro de compressão/tração definida.",
        )
        return 0

    config_params = load_config_params()

    globalMaxLoad = float(config_params["absoluteMaximumLoad"])
    globalMaxTravel = int(config_params["absoluteMaximumTravel"])
    globalMaxTime = float(config_params["absoluteMaximumTime"])
    globalMaximumDeltaLoad = float(config_params["absoluteMaximumDeltaLoad"])
    globalZAxisLength = int(config_params["zAxisLength"])
    globalKnownWeight = int(config_params["knownWeight"])
    
    experiment_motor_rpm = experiment.z_axis_speed

    if experiment.max_load > globalMaxLoad:
        ui_api.error_alert(
            f"Não foi possível iniciar o experimento. O LIMITE DE CARGA do experimento é maior que o limite global. Por favor verifique os valores!",
        )
        return 0
    if experiment_motor_rpm < 0 or experiment_motor_rpm > 600 :
        ui_api.error_alert(
            f"Não foi possível iniciar o experimento. A VELOCIDADE DO MOTOR deve estar entre 1 e 600 RPM. Por favor verifique os valores!",
        )
        return 0
    if experiment.max_travel > globalMaxTravel:
        ui_api.error_alert(
            f"Não foi possível iniciar o experimento. O LIMITE DE DESLOCAMENTO do experimento é maior que o limite global. Por favor verifique os valores!",
        )
        return 0

    if experiment.max_time > globalMaxTime:
        ui_api.error_alert(
            f"Não foi possível iniciar o experimento. O LIMITE DE TEMPO do experimento é maior que o limite global. Por favor verifique os valores!",
        )
        return 0

    if experiment.load_loss_limit > globalMaximumDeltaLoad:
        ui_api.error_alert(
            f"Não foi possível iniciar o experimento. O Δ DE CARGA do experimento é maior que o limite global. Por favor verifique os valores!",
        )
        return 0

    if globalZAxisLength <= 0:
        ui_api.error_alert(
            f"Não foi possível iniciar o experimento. O tamanho do Eixo-z não pôde ser carregado. Por favor verifique os valores!",
        )
        return 0

    bolinho_app.set_granulado_configs(
        globalMaxLoad,
        globalMaxTravel,
        globalMaximumDeltaLoad,
        globalZAxisLength,
        globalMaxTime,
        globalKnownWeight,
    )

    core_api.go_to_experiment_page()
    bolinho_app.start_experiment(experiment_id, compress, globalZAxisLength)
    return 1


@eel.expose
def end_experiment_routine():
    """
    The front end will call this function when the user click to end experiment.

    The backend **MUST** send a command to change to the home page.

    Returns 1 if succeeded.
    """

    bolinho_app.end_experiment()
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
def return_z_axis():
    """
    Returns the z-axis to the origin.

    Returns 1 if succeeded (if the function was acknowledged).
    """
    return bolinho_app.gran.return_z_axis()


@eel.expose
def stop_z_axis():
    """
    Stops the z-axis.

    Returns 1 if succeeded (if the function was acknowledged).
    """
    return bolinho_app.gran.stop_z_axis()


@eel.expose
def move_z_axis_millimeters(distance):
    """
    Moves the z-axis [distance]mm.

    This distance is set in MILLIMETERS

    Returns 1 if succeeded (if the function was acknowledged).
    """
    return bolinho_app.gran.move_z_axis_millimeters(distance)


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
    ports_list = []
    for port in ports:
        ports_list.append({"port": port.device, "desc": port.description})
    return ports_list


@eel.expose
def connect_to_port(port: str):
    """
    Connects to a port. The port argument is a string like `COM4` or `/dev/ttyUSB0`
    """
    if port == "":
        ui_api.error_alert("Nenhuma porta foi selecionada.")
        return False
    if bolinho_app.gran.connect(port, 115200):
        eel.sleep(1)
        return bolinho_app.gran.check_granulado_is_connected()

    return False


@eel.expose
def disconnect_granulado():
    """
    Disconnects from the granulado
    """
    return bolinho_app.gran.disconnect()


@eel.expose
def tare_load():
    """
    Tares the load cell

    Returns 1 if succeeded (if the function was acknowledged).
    """
    return bolinho_app.gran.tare_load()


@eel.expose
def calibrate_known_weight():
    """
    Calibrates the load cell to the known weight

    Returns 1 if succeeded (if the function was acknowledged).
    """
    return bolinho_app.gran.calibrate_known_weight()


@eel.expose
def set_known_weight(weight):
    """
    Sets the known weight

    Returns 1 if succeeded (if the function was acknowledged).
    """
    return bolinho_app.gran.set_known_weight(weight)


@eel.expose
def calibrate_z_axis():
    """
    Calibrates z axis of the machine

    Returns 1 if succeeded (if the function was acknowledged).
    """
    return bolinho_app.gran.calibrate_z_axis()


@eel.expose
def get_granulado_is_connected():
    """
    Checks if granulado is connected

    Returns a boolean
    """
    return bolinho_app.gran.is_connected()
