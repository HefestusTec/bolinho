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
