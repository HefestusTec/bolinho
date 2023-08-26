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

## DataPointArray
!!! quote ""
    ``` python
    class DataPointArray:
        def __init__(self, id=0, data_array=[]):
            self.id = id
            self.data_array = data_array 
    ```
    > * `id`: Identification (or key) of this element on the data base.
        * type: `int`
        * Unity: `mm`
    * `data_array`: Array of data points, this is the "reading" of an experiment.
        * Type: [`[DataPoint...]`](#datapoint)
        * Unity: N/A

___

## AutoStopParams

!!! quote ""
    ``` python
    class AutoStopParams:
        def __init__(self, force_loss=20, max_force=1000, max_travel=100, max_time=600):
            self.force_loss = force_loss
            self.max_force = max_force
            self.max_travel = max_travel
            self.max_time = max_time
    ```
    > * `force_loss`: Max force loss to trigger auto-stop.
        * Type: `float`
        * Unity: `%`
    * `max_force`: Max force limit to trigger auto-stop.
        * Type: `float`
        * Unity: `N`
    * `max_travel`: Max distance the experiment head can travel during the experiment.
        * Type: `float`
        * Unity: `mm`
    * `max_time`: Experiment time limit.
        * Type: `float`
        * Unity: `s`

___

## BodyParams

!!! quote ""
    ``` python
    class BodyParams:
        def __init__(self, type=0, param_a=0, param_b=0, height=0):
            # Body format | 1 = Rectangle | 2 = Cylinder | 3 = Tube | 4 = Other
            self.type = type

            # Rectangle = length | Cylinder = External diameter | Tube = External diameter
            self.param_a = param_a

            # Rectangle = depth | Cylinder = NULL | Tube = Internal diameter
            self.param_b = param_b

            # Height of the test body
            self.height = height

    ```
    > * `type`: Body format
        * 1 = Rectangle
        * 2 = Cylinder
        * 3 = Tube
        * 4 = Other
        * Type: `int`
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

___
## ExperimentParams

!!! quote ""
    ``` python
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
    ```
    > * `stop_params`: Auto stop parameters of the experiment.
        * Type: [`AutoStopParams`](#autostopparams)
        * Unity: N/A
    * `body_params`: Body parameters of the experiment.
        * Type: [`BodyParams`](#bodyparams)
        * Unity: N/A
    * `compress`: Dictates if the experiment head move up or down. true = compress | false = expand.
        * Type: `bool`
        * Unity: N/A
    * `z_speed`: Z axis speed during the experiment.
        * Type: `float`
        * Unity: `mm/s`

___

## Date
!!! quote ""
    ``` python
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
    ```
    > * `day`: Day.
        * Type: `int`
        * Unity: N/A
    * `month`: Month.
        * Type: `int`
        * Unity: N/A  
    * `year`: Year.
        * Type: `int`
        * Unity: N/A   

___


## Experiment
!!! quote ""
    ``` python
    class Experiment:
        def __init__(
            self,
            id=0,
            date=Date(),
            experiment_params=ExperimentParams(),
            data_array_id=0,
            extra_info="",
        ):
            self.experiment_params = experiment_params
            self.id = id
            self.data_array_id = data_array_id
            self.extra_info = extra_info
    ```
    > * `id`: id (or key) of the experiment on the data base.
        * Type: `int`
        * Unity: N/A
    * `date`: Date of the experiment.
        * Type: [`Date`](#date)
        * Unity: N/A    
    * `experiment_params`: Parameters of the experiment.
        * Type: [`ExperimentParams`](#experimentparams)
        * Unity: N/A    
    * `data_array_id`: Identification (or key) of this experiment [`DataPointArray`](#datapointarray) or "reading", on the data base
        * Type: `int`
        * Unity: N/A
    * `extra_info`: Extra information about the experiment.
        * Type: `String`
        * Unity: N/A

___

## Supplier
!!! quote ""
    ``` python
    class Supplier:
        def __init__(self, name="NONE", email=""):
            self.name = name
            self.email = email
    ```
    > * `name`: Name of the material supplier.
        * Type: `String`
        * Unity: N/A
    * `email`: E-mail of the supplier.
        * Type: `String`
        * Unity: N/A   

___

## Material
!!! quote ""
    ``` python
    class Material:
        def __init__(
            self, id=0, name="NONE", batch=0, experiment_array=[], supplier=Supplier(), extra_info=""
        ):
            self.id = id
            self.name = name
            self.batch = batch
            # array of the ids of experiments with this material
            self.experiment_array = experiment_array
            self.supplier = supplier
            self.extra_info = extra_info
    ```
    > * `id`: Id (or key) of the material on the data base.
        * Type: `int`
        * Unity: N/A
    * `name`: Name of the material.
        * Type: `String`
        * Unity: N/A    
    * `batch`: Batch of the material.
        * Type: `int`
        * Unity: N/A
    * `experiment_array`: Array with the `ids` or `keys` of the [experiments](#experiment) made with this material.
        * Type: `[int...]`
        * Unity: N/A
    * `supplier`: Supplier of the material.
        * Type: [`Supplier`](#supplier)
        * Unity: N/A 
    * `extra_info`: Extra information about the material.
        * Type: `String`
        * Unity: N/A

___