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

    def __init__(self, z_axis_pos=0, current_load=0, current_delta_load=0, status="Desconectado"):
        self.z_axis_pos = z_axis_pos
        self.current_load = current_load
        self.current_delta_load = current_delta_load
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


class Material:
    """
    Class that gathers a material information
    """

    def __init__(
        self,
        id=0,
        name="NONE",
        batch="",
        supplier_name="",
        supplier_contact_info="",
        extra_info="",
    ):
        self.id = id
        self.name = name
        self.batch = batch
        self.supplier_name = supplier_name
        self.supplier_contact_info = supplier_contact_info
        self.extra_info = extra_info


class Body:
    """
    Parameters of the test body

    type:       Body format | 1 = Rectangle | 2 = Cylinder | 3 = Tube | 4 = Other
    param_a:    Rectangle = length | Cylinder = External diameter | Tube = External diameter
    param_b:    Rectangle = depth | Cylinder = NULL | Tube = Internal diameter
    height:     Height of the test body
    """

    def __init__(
        self,
        id=0,
        type=1,
        material=Material(
            id=0,
            name="Base Material",
            batch="",
            supplier_name="",
            supplier_contact_info="",
            extra_info="",
        ),
        param_a=0,
        param_b=0,
        height=0,
        extra_info="",
    ):
        self.id = id
        self.type = type
        self.material = material
        self.param_a = param_a
        self.param_b = param_b
        self.height = height
        self.extra_info = extra_info


class Experiment:
    def __init__(
        self,
        id=0,
        name="None",
        body: Body = Body(
            id=0,
            type=1,
            material=Material(
                name="Material",
                batch="Batch",
                supplier_name="",
                supplier_contact_info="",
                extra_info="",
            ),
            param_a=0,
            param_b=0,
            height=0,
            extra_info="",
        ),
        date_time=0,
        load_loss_limit=0,
        max_load=0,
        max_travel=0,
        max_time=0,
        z_axis_speed=0,
        compress=False,
        extra_info="",
        plot_color="#ffffff",
    ):
        self.id = id
        self.name = name
        self.body = body
        self.date_time = date_time
        self.load_loss_limit = load_loss_limit
        self.max_load = max_load
        self.max_travel = max_travel
        self.max_time = max_time
        self.z_axis_speed = z_axis_speed
        self.compress = compress
        self.extra_info = extra_info
        self.plot_color = plot_color
