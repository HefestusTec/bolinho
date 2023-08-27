<!--
 Copyright (C) 2023 Hefestus
 
 This file is part of Bolinho.
 
 Bolinho is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.
 
 Bolinho is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.
 
 You should have received a copy of the GNU General Public License
 along with Bolinho.  If not, see <http://www.gnu.org/licenses/>.
-->

# Data types

All different data types will be shown in this page

!!! warning "ATTENTION"
    To see a more up to date version of the different data types pleas see `src/bolinho_api/classes.py`!

## DataPoint
!!! quote ""
    ``` python
    class DataPoint:
        def __init__(self, x=0, y=0):
            self.x = x
            self.y = y
    ```
    > * `x`: Position at the mesure moment
        * type: `float`
        * Unity: `mm`
    * `y`: Force at the mesure moment
        * Type: `float`
        * Unity: `N`

___

## Material
!!! quote ""
    ``` python
    class Material:
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
    ```
    > * `id`:
        * type: `int`
        * Unity: N/A
    * `name`: 
        * type: `string`
        * Unity: N/A
    * `batch`:
        * type: `string`
        * Unity: N/A
    * `supplier_name`:
        * type: `string`
        * Unity: N/A
    * `supplier_contact_info`:
        * type: `string`
        * Unity: N/A
    * `extra_info`:
        * type: `string`
        * Unity: N/A
___

## Body
!!! quote ""
    ``` python
    class Body:
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
    ```
    > * `id`:
        * Type: `int`
        * Unity: N/A
    * `type`: Body format
            * 1 = Rectangle
            * 2 = Cylinder
            * 3 = Tube
            * 4 = Other
            * Type: `int`
            * Unity: N/A
    * `material`:
        * Type: [`Material`](#Material)
        * Unity: N/A
    * `param_a`: Param 'a' of the body
        * Rectangle = length
        * Cylinder = External diameter
        * Tube = External diameter
        * Type: `float`
        * Unity: `mm`
    * `param_b`: Param 'b' of the body
        * Rectangle = depth
        * Cylinder = NULL
        * Tube = Internal diameter
        * Type: `float`
        * Unity: `mm`
    * `height`: Height of the test body
        * Type: `float`
        * Unity: `mm`
    * `extra_info`:
        * type: `string`
        * Unity: N/A
___

## Experiment

!!! quote ""
    ``` python
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
    ```
    > * `id`:
        * Type: `int`
        * Unity: N/A
    * `name`: 
        * type: `string`
        * Unity: N/A
    * `body`:
        * Type: [`Body`](#Body)
        * Unity: N/A
    * `date_time`: Date and time formatted as `dd/mm/yyyy`
        * Type: `string`
        * Unity: N/A
    * `load_loss_limit`: Max load loss to trigger auto-stop.
        * Type: `float`
        * Unity: `N/s`
    * `max_load`: Max load limit to trigger auto-stop.
        * Type: `float`
        * Unity: `N`
    * `max_travel`: Max distance the experiment head can travel during the experiment.
        * Type: `float`
        * Unity: `mm`
    * `max_time`: Experiment time limit.
        * Type: `float`
        * Unity: `s`
    * `z_axis_speed`:
        * Type: `float`
        * Unity: `mm/s`
    * `compress`: Is the experiment type of compression? `false` implies expansion.
        * Type: `bool`
        * Unity: N/A
    * `extra_info`:
        * type: `string`
        * Unity: N/A
    * `plot_color`: System parameter
        * type: `string`
        * Unity: N/A
___
