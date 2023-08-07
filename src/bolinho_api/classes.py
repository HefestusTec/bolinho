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

"""
All the classes in this file are formatted such when parsing to JSON all names are compatible with the front end
"""


class Readings:
    """
    This class gathers the machine readings such as position and load.
    """

    def __init__(self, z_axis_pos=0, current_load=0, max_load=0, status=""):
        self.z_axis_pos = z_axis_pos
        self.current_load = current_load
        self.max_load = max_load
        self.status = status


class DataPoint:
    """
    Point in graph
    x: time
    y: load
    """

    def __init__(self, x=0, y=0):
        self.x = x
        self.y = y


class DataPointArray:
    """
    An array of data points make an experiment reading
    """

    def __init__(self, id=0, experiment_id=0, data_array=[]):
        self.id = id
        self.experiment_id = experiment_id
        self.data_array = data_array


class AutoStopParams:
    """
    Parameters to trigger the auto stop

    Unity
    - force_loss:   Newtons
    - max_force:    Newtons
    - max_travel:   Millimeters
    - max_time:     Seconds
    """

    def __init__(self, force_loss=20, max_force=1000, max_travel=100, max_time=600):
        self.force_loss = force_loss
        self.max_force = max_force
        self.max_travel = max_travel
        self.max_time = max_time


class BodyParams:
    """
    Parameters of the test body

    type:       Body format | 1 = Rectangle | 2 = Cylinder | 3 = Tube
    param_a:    Rectangle = length | Cylinder = External diameter | Tube = External diameter
    param_b:    Rectangle = depth | Cylinder = NULL | Tube = Internal diameter
    height:     Height of the test body
    """

    def __init__(self, type=1, param_a=0, param_b=0, height=0):
        self.type = type
        self.param_a = param_a
        self.param_b = param_b
        self.height = height


class ExperimentParams:
    """
    Parameters of an experiment
    """

    def __init__(
        self,
        stop_params=AutoStopParams(),
        body_params=BodyParams(),
        compress=True,
        z_speed=5,
    ):
        self.stop_params: AutoStopParams = stop_params
        self.body_params: BodyParams = body_params
        self.compress: bool = compress
        self.z_speed: float = z_speed


class Date:
    def __init__(
        self,
        day=1,
        month=1,
        year=2023,
    ):
        self.day = day
        self.month = month
        self.year = year


class Experiment:
    def __init__(
        self,
        id=0,
        date=Date(),
        experiment_params=ExperimentParams(),
        data_array_id=0,
        material_id=0,
        extra_info="",
    ):
        self.experiment_params = experiment_params
        self.id = id
        self.date = date
        self.data_array_id = data_array_id
        self.material_id = material_id
        self.extra_info = extra_info


class Supplier:
    def __init__(self, name="NONE", email=""):
        self.name = name
        self.email = email


class Material:
    """
    Class that gathers a material information
    """

    def __init__(
        self,
        id=0,
        name="NONE",
        batch=0,
        experiment_array=[],
        supplier=Supplier(),
        extra_info="",
    ):
        self.id = id
        self.name = name
        self.batch = batch
        # array of the ids of experiments with this material
        self.experiment_array = experiment_array
        self.supplier = supplier
        self.extra_info = extra_info
