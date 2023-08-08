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
from fake_db import *
import json
from DBHandler import DBHandler
from peewee import model_to_dict


db_handler = DBHandler()

# --- Material --- #


@eel.expose
def get_materials():
    """
    Returns a list of materials in the database
    """
    materials = db_handler.get_materials()
    materials_dict = model_to_dict(materials)
    return json.dumps(materials_dict)


@eel.expose
def get_material_by_id(material_id):
    """
    Returns the material with the given id
    """
    material = db_handler.get_material_by_id(material_id)
    material_dict = model_to_dict(material)
    return json.dumps(material_dict)


# --- Body --- #


@eel.expose
def get_body_by_id(body_id):
    """
    Returns the body with the given id
    """
    body = db_handler.get_body_by_id(body_id)
    body_dict = model_to_dict(body)
    return json.dumps(body_dict)


# --- Experiment --- #


@eel.expose
def get_experiments():
    """
    Returns a list of experiments in the database
    """
    experiments = db_handler.get_experiments()
    experiments_dict = model_to_dict(experiments)
    return json.dumps(experiments_dict)


@eel.expose
def get_experiment_by_id(experiment_id):
    """
    Returns the experiment with the given id
    """
    experiment = db_handler.get_experiment_by_id(experiment_id)
    experiment_dict = model_to_dict(experiment)
    return json.dumps(experiment_dict)


@eel.expose
def get_experiments_by_material_id(material_id):
    """
    Returns a list of experiments that used the material with the given id
    """
    experiments = db_handler.get_experiments_by_material_id(material_id)
    experiments_dict = model_to_dict(experiments)
    return json.dumps(experiments_dict)


# --- Reading --- #


@eel.expose
def get_load_over_time_by_experiment_id(experiment_id):
    """
    Returns a list of load over time data points for the experiment with the given id
    """
    readings = db_handler.get_load_over_time_by_experiment_id(experiment_id)
    readings_dict = model_to_dict(readings)
    # rename the "load" key to "y"
    for reading in readings_dict:
        reading["y"] = reading.pop("load")
    return json.dumps(readings_dict)


@eel.expose
def get_load_over_position_by_experiment_id(experiment_id):
    """
    Returns a list of load over position data points for the experiment with the given id
    """
    readings = db_handler.get_load_over_position_by_experiment_id(experiment_id)
    readings_dict = model_to_dict(readings)
    # rename the "z_pos" key to "x"
    # rename the "load" key to "y"
    for reading in readings_dict:
        reading["x"] = reading.pop("z_pos")
        reading["y"] = reading.pop("load")
    return json.dumps(readings_dict)


@eel.expose
def get_experiment_list():
    return json.dumps(experiment_data_base, default=lambda x: x.__dict__)


@eel.expose
def get_experiment_at(id):
    if len(experiment_data_base) - 1 < id:
        return None
    return json.dumps(experiment_data_base[id], default=lambda x: x.__dict__)


@eel.expose
def get_multiple_experiments(ids):
    experiment_data_array = []
    for experimentId in ids:
        if experimentId < len(experiment_data_base):
            experiment_data_array.append(experiment_data_base[experimentId])
    return json.dumps(experiment_data_array, default=lambda x: x.__dict__)


@eel.expose
def get_material_list():
    return json.dumps(material_data_base, default=lambda x: x.__dict__)


@eel.expose
def get_material_at(id):
    if len(material_data_base) - 1 < id:
        return None
    return json.dumps(material_data_base[id], default=lambda x: x.__dict__)


@eel.expose
def get_material_with_experiment(experiment_id):
    for material in material_data_base:
        if experiment_id in material.experiment_array:
            return material
    return None


@eel.expose
def get_data_point_array_at(id):
    if len(data_point_array_data_base) - 1 < id:
        return []
    return json.dumps(data_point_array_data_base[id], default=lambda x: x.__dict__)
