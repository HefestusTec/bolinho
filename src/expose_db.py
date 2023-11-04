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
from DBHandler import db_handler
from playhouse.shortcuts import model_to_dict
import exposed_core
from bolinho_api.ui import ui_api
import realTimeR
from state_class import app_state
from state_class import StateE

import numpy as np


# --- Material --- #
@eel.expose
def post_material(data: dict):
    """
    Adds a material to the database
    """
    data["name"] = data.get("name", "Material sem nome")
    data["batch"] = data.get("batch", "Lote sem nome")
    data["supplier_name"] = data.get("supplier_name", "Fornecedor sem nome")
    data["supplier_contact_info"] = data.get(
        "supplier_contact_info", "Contato do fornecedor não informado"
    )
    data["extra_info"] = data.get("extra_info", "Informações adicionais não informadas")

    return db_handler.post_material(data)


@eel.expose
def get_materials():
    """
    Returns a list of materials in the database
    """
    materials = db_handler.get_materials()
    materials_dict_list = [model_to_dict(material) for material in materials]
    return json.dumps(materials_dict_list, default=lambda x: x.__dict__)


@eel.expose
def get_material_by_id(material_id):
    """
    Returns the material with the given id
    """
    material = db_handler.get_material_by_id(material_id)
    material_dict = model_to_dict(material)
    return json.dumps(material_dict, default=lambda x: x.__dict__)


@eel.expose
def patch_material_by_id(data):
    """
    Updates the material with the given id
    """
    material_id = int(data.get("id", -1))
    if material_id == -1:
        ui_api.error_alert("ID de material inválido.")
        return
    current_material = db_handler.get_material_by_id(material_id)

    patch_data = {
        "name": data.get("name", current_material.name),
        "supplier_name": data.get("supplier_name", current_material.supplier_name),
        "supplier_contact_info": data.get(
            "supplier_contact_info", current_material.supplier_contact_info
        ),
        "extra_info": data.get("extra_info", current_material.extra_info),
    }
    try:
        db_handler.patch_material_by_id(material_id, patch_data)
        return True
    except Exception as e:
        ui_api.error_alert(str(e))
        return False


@eel.expose
def delete_material_by_id(id):
    """
    Deletes the material with the given id
    """
    try:
        db_handler.delete_material_by_id(id)
        return True
    except Exception as e:
        ui_api.error_alert(str(e))
        return False


# --- Body --- #


@eel.expose
def get_body_by_id(body_id):
    """
    Returns the body with the given id
    """
    body = db_handler.get_body_by_id(body_id)
    body_dict = model_to_dict(body)
    return json.dumps(body_dict, default=lambda x: x.__dict__)


# --- Experiment --- #


@eel.expose
def post_experiment(data: dict = {}):
    config_params = exposed_core.load_config_params()
    globalMaxLoad = config_params["absoluteMaximumForce"]
    globalMaxTravel = config_params["absoluteMaximumTravel"]
    globalMaxTime = config_params["absoluteMaximumTime"]
    body = data.get("body", {})
    clean_body = {
        "type": int(body.get("type", -1)),
        "material": int(body.get("material_id", -1)),
        "param_a": float(body.get("param_a", 0)),
        "param_b": float(body.get("param_b", 0)),
        "height": float(body.get("height", 0)),
        "extra_info": body.get("extra_info", "Informações adicionais não informadas"),
    }
    body_id = db_handler.post_body(clean_body)

    experiment = data.get("experiment", {})
    clean_experiment = {
        "name": experiment.get("name", "Experimento sem nome"),
        "body": body_id,
        "load_loss_limit": float(experiment.get("load_loss_limit", 0)),
        "max_load": float(experiment.get("max_load", globalMaxLoad)),
        "max_travel": float(experiment.get("max_travel", globalMaxTravel)),
        "max_time": float(experiment.get("max_time", globalMaxTime)),
        "compress": bool(experiment.get("compress", False)),
        "z_axis_speed": float(experiment.get("z_axis_speed", 0)),
        "plot_color": experiment.get("plot_color", "#ff0000"),
        "extra_info": experiment.get(
            "extra_info", "Informações adicionais não informadas"
        ),
    }
    return db_handler.post_experiment(clean_experiment)


@eel.expose
def get_experiments():
    """
    Returns a list of experiments in the database
    """
    experiments = db_handler.get_experiments()
    experiments_dict_list = [model_to_dict(experiment) for experiment in experiments]
    return json.dumps(experiments_dict_list, default=lambda x: x.__dict__)


@eel.expose
def get_experiment_by_id(experiment_id):
    """
    Returns the experiment with the given id
    """
    experiment = db_handler.get_experiment_by_id(experiment_id)
    experiment.date_time = experiment.date_time.strftime("%d/%m/%Y")
    experiment_dict = model_to_dict(experiment)
    return json.dumps(experiment_dict, default=lambda x: x.__dict__)


@eel.expose
def get_experiments_by_material_id(material_id):
    """
    Returns a list of experiments that used the material with the given id
    """
    experiments = db_handler.get_experiments_by_material_id(material_id)
    for experiment in experiments:
        experiment.date_time = experiment.date_time.strftime("%d/%m/%Y")
    experiments_dict_list = [model_to_dict(experiment) for experiment in experiments]
    return json.dumps(experiments_dict_list, default=lambda x: x.__dict__)


@eel.expose
def get_experiment_by_id_list(experiment_id_list):
    """
    Returns a list of experiments that used the material with the given id
    """
    experiments = db_handler.get_experiment_by_id_list(experiment_id_list)
    for experiment in experiments:
        experiment.date_time = experiment.date_time.strftime("%d/%m/%Y")
    experiments_dict_list = [model_to_dict(experiment) for experiment in experiments]
    return json.dumps(experiments_dict_list, default=lambda x: x.__dict__)


@eel.expose
def patch_experiment_by_id(data):
    """
    Updates the experiment with the given id
    """
    experiment_id = int(data.get("id", -1))
    if experiment_id == -1:
        ui_api.error_alert("ID de experimento inválido.")
        return
    current_experiment = db_handler.get_experiment_by_id(experiment_id)

    patch_data = {
        "name": data.get("name", current_experiment.name),
        "extra_info": data.get("extra_info", current_experiment.extra_info),
        "plot_color": data.get("plot_color", current_experiment.plot_color),
    }
    try:
        db_handler.patch_experiment_by_id(experiment_id, patch_data)
        return True
    except Exception as e:
        ui_api.error_alert(str(e))
        return False


@eel.expose
def delete_experiment_by_id(experiment_id):
    """
    Deletes the experiment with the given id
    """
    try:
        db_handler.delete_experiment_by_id(experiment_id)
        return True
    except Exception as e:
        ui_api.error_alert(str(e))
        return False


# --- Reading --- #


@eel.expose
def get_load_over_time_by_experiment_id(experiment_id):
    """
    Returns a list of load over time data points for the experiment with the given id
    """
    if app_state.state == StateE.RUNNING_EXPERIMENT:
        # TODO: truncate list on 10k points
        q = realTimeR.load_over_time_realtime_readings.queue
        n_points = len(q)
        q_list = list(q)
        # pick 10k points evenly spaced
        if n_points > 10000:
            readings_dict = q_list[:: n_points // 10000]
        else:
            readings_dict = q_list
    else:
        config_params = exposed_core.load_config_params()
        numOfDataPointsPerExp = config_params["numOfDataPointsPerExp"]
        print(numOfDataPointsPerExp)
        # TODO get at max `numOfDataPointsPerExp` points and return
        # The valid values are the following str "1k" | "10k" | "50k" | "200k" | "500k" | "ilimitado"
        n_points = {
            "1k": 1000,
            "10k": 10000,
            "50k": 50000,
            "200k": 200000,
            "500k": 500000,
            "ilimitado": 1,
        }
        if numOfDataPointsPerExp not in n_points:
            ui_api.error_alert("Número de pontos inválido.")
            return

        readings = db_handler.get_load_over_time_by_experiment_id(experiment_id)
        n_points["ilimitado"] = len(readings)
        if len(readings) == 0:
            ui_api.error_alert("Experimento sem dados.")
            return {}
        
        if len(readings) > n_points[numOfDataPointsPerExp]:
            readings = np.array(readings)
            # pick `numOfDataPointsPerExp` points evenly spaced
            n_data_points = n_points[numOfDataPointsPerExp]
            # round up len(readings) / n_data_points
            readings = readings[
                :: int(np.ceil(len(readings) / n_data_points))
            ].tolist()

        readings_dict = [model_to_dict(reading) for reading in readings]
        # rename the "load" key to "y"
        for reading in readings_dict:
            reading["y"] = reading.pop("load")
        print(len(readings_dict))
    return json.dumps(readings_dict, default=lambda x: x.__dict__)


@eel.expose
def get_load_over_position_by_experiment_id(experiment_id):
    """
    Returns a list of load over position data points for the experiment with the given id
    """
    if app_state.state == StateE.RUNNING_EXPERIMENT:
        # truncate list on 10k points
        q = realTimeR.load_over_position_realtime_readings.queue
        n_points = len(q)
        q_list = list(q)
        # pick 10k points evenly spaced
        if n_points > 10000:
            readings_dict = q_list[:: n_points // 10000]
        else:
            readings_dict = q_list

    else:
        config_params = exposed_core.load_config_params()
        numOfDataPointsPerExp = config_params["numOfDataPointsPerExp"]
        print(numOfDataPointsPerExp)
        # TODO get at max `numOfDataPointsPerExp` points and return
        # The valid values are the following str "1k" | "10k" | "50k" | "200k" | "500k" | "ilimitado"
        n_points = {
            "1k": 1000,
            "10k": 10000,
            "50k": 50000,
            "200k": 200000,
            "500k": 500000,
            "ilimitado": 1,
        }
        if numOfDataPointsPerExp not in n_points:
            ui_api.error_alert("Número de pontos inválido.")
            return {}

        readings = db_handler.get_load_over_position_by_experiment_id(experiment_id)
        n_points["ilimitado"] = len(readings)

        if len(readings) == 0:
            ui_api.error_alert("Experimento sem dados.")
            return {}
        
        if len(readings) > n_points[numOfDataPointsPerExp]:
            readings = np.array(readings)
            # pick `numOfDataPointsPerExp` points evenly spaced
            n_data_points = n_points[numOfDataPointsPerExp]
            # round up len(readings) / n_data_points
            readings = readings[
                :: int(np.ceil(len(readings) / n_data_points))
            ].tolist()

        readings_dict = [model_to_dict(reading) for reading in readings]
        # rename the "z_pos" key to "x"
        # rename the "load" key to "y"
        for reading in readings_dict:
            reading["x"] = reading.pop("z_pos")
            reading["y"] = reading.pop("load")
        print(len(readings_dict))
    return json.dumps(readings_dict, default=lambda x: x.__dict__)


"""
get_materials
get_experiments


get_experiments_by_material_id


get_body_by_id
get_experiment_by_id
get_material_by_id


get_load_over_time_by_experiment_id -> {x, y}[]
get_load_over_position_by_experiment_id -> {x, y}[]




Rotina para vizu um material
>>>>>>>>>   

get_materials -> material[]
get_experiments_by_material_id -> Experiment[]
get_body_by_id -> Body

get_load_over_time_by_experiment_id -> {x, y}[]
get_load_over_position_by_experiment_id -> {x, y}[]

"""
