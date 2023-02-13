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
import random
import json


def get_random_data_points(dataSize):
    return_array = []
    for i in range(dataSize):
        return_array.append(DataPoint(x=random.randint(0, 100), y=i))
    return return_array


class DataPoint:
    def __init__(self, x=0, y=0):
        self.x = x
        self.y = y


class AutoStopParams:
    def __init__(self, force_loss=20, max_force=1000, max_travel=100, max_time=600):
        self.force_loss = force_loss
        self.max_force = max_force
        self.max_travel = max_travel
        self.max_time = max_time


class BodyParams:
    def __init__(self, type=0, param_a=0, param_b=0, height=0):
        # Body format | 1 = Rectangle | 2 = Cylinder | 3 = Tube
        self.type = type

        # Rectangle = length | Cylinder = External diameter | Tube = External diameter
        self.param_a = param_a

        # Rectangle = depth | Cylinder = NULL | Tube = Internal diameter
        self.param_b = param_b

        # Height of the test body
        self.height = height


class ExperimentParams:
    def __init__(
        self,
        stop_params=AutoStopParams(),
        body_params=BodyParams(),
        compress=True,
        z_speed=5,
    ):
        self.stop_params = stop_params
        self.body_params = body_params
        self.compress = compress
        self.z_speed = z_speed


class Experiment:
    def __init__(
        self,
        index=0,
        experiment_params=ExperimentParams(),
        data_array=[],
        extra_info="",
    ):
        self.experiment_params = experiment_params
        self.index = index
        self.data_array = data_array
        self.extra_info = extra_info

class Supplier:
    def __init__(self, name="NONE", email=""):
        self.name = name
        self.email = email
        

class Material:
    def __init__(
        self, index=0, name="NONE", batch=0, experiment_array=[], supplier=Supplier(), extra_info=""
    ):
        self.index = index
        self.name = name
        self.batch = batch
        # array of the indexes of experiments with this material
        self.experiment_array = experiment_array
        self.supplier = supplier
        self.extra_info = extra_info


experiment_data_base = [
    Experiment(
        index=0,
        data_array=get_random_data_points(23),
        extra_info="Feito pelo hermes",
    ),
    Experiment(index=1, data_array=get_random_data_points(15)),
    Experiment(index=2, data_array=get_random_data_points(60)),
    Experiment(
        index=3,
        data_array=get_random_data_points(46),
        extra_info="Cilindro em óleo",
    ),
]

material_data_base = [
    Material(index=0, name="Aço", batch=23, experiment_array=[0, 2]),
    Material(index=1, name="PLA", batch=2, experiment_array=[1]),
    Material(index=2, name="ABS", batch=0, experiment_array=[3]),
]


@eel.expose
def get_experiment_list():
    return json.dumps(experiment_data_base, default=lambda x: x.__dict__)


@eel.expose
def get_experiment_at(index):
    print(len(experiment_data_base))
    if len(experiment_data_base) - 1 < index:
        return None
    return json.dumps(experiment_data_base[index].__dict__)


@eel.expose
def get_material_list():
    return json.dumps(material_data_base, default=lambda x: x.__dict__)


@eel.expose
def get_material_at(index):
    if len(material_data_base) - 1 < index:
        return None
    return json.dumps(material_data_base[index], default=lambda x: x.__dict__)
