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

import random
from bolinho_api.jsClasses import *


def get_random_data_points(dataSize):
    return_array = []
    for i in range(dataSize):
        return_array.append(DataPoint(x=i, y=random.randint(0, 100)))
    return return_array


data_point_array_data_base = [
    DataPointArray(id=0, experiment_id=0, data_array=get_random_data_points(23)),
    DataPointArray(id=1, experiment_id=1, data_array=get_random_data_points(15)),
    DataPointArray(id=2, experiment_id=2, data_array=get_random_data_points(46)),
    DataPointArray(id=3, experiment_id=3, data_array=get_random_data_points(60)),
]

experiment_data_base = [
    Experiment(
        id=0,
        data_array_id=0,
        material_id=0,
        extra_info="Feito pelo hermes",
    ),
    Experiment(id=1, data_array_id=1, material_id=1),
    Experiment(id=2, date=Date(3, 11, 2011), data_array_id=2, material_id=0),
    Experiment(
        id=3,
        date=Date(22, 11, 2011),
        data_array_id=3,
        material_id=2,
        extra_info="Cilindro em óleo",
    ),
]

material_data_base = [
    Material(
        id=0,
        name="Aço",
        batch=23,
        experiment_array=[0, 2],
        supplier=Supplier("VALE", "compras@vale.com"),
        extra_info="Comprado pela marta",
    ),
    Material(
        id=1,
        name="PLA",
        batch=2,
        experiment_array=[1],
        supplier=Supplier("Próprio", "N/A"),
    ),
    Material(
        id=2,
        name="ABS",
        batch=0,
        experiment_array=[3],
        supplier=Supplier("Minas LTDA", "minas@hotmail.com"),
        extra_info="Cilindro molhado em óleo",
    ),
]
