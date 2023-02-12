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

## DataPoint
!!! quote ""
    ``` js title=""
    class DataPoint {
        constructor(x=0, y=0) {
            this.x = x; // The label "x" HAS to be a STRING
            this.y = y;
        }
    }
    ```
    > * `x`: Position at the mesure moment
        * type: `String`
        * Unity: `mm`
    * `y`: Force at the mesure moment
        * Type: `float`
        * Unity: `N`

___

## autoStopParams

!!! quote ""
    ``` js title=""
    const autoStopParams = {
        forceLossLimit: 20, // Max force loss to trigger auto-stop
        maxForce: 10000,    // Max force limit
        maxTravel: 100,     // Travel limit
        maxTime: 600        // Experiment time limit
    };
    ```
    > * `forceLossLimit`: Max force loss to trigger auto-stop.
        * Type: `float`
        * Unity: `%`
    * `maxForce`: Max force limit to trigger auto-stop.
        * Type: `float`
        * Unity: `N`
    * `maxTravel`: Max distance the experiment head can travel during the experiment.
        * Type: `float`
        * Unity: `mm`
    * `maxTime`: Experiment time limit.
        * Type: `float`
        * Unity: `s`

___

## experimentSettings

!!! quote ""
    ``` js title=""
    const experimentSettings = {
        compress: true,
        zAxisSpeed: 5
    };
    ```
    > * `compress`: Dictates if the experiment head move up or down. true = compress | false = expand.
        * Type: `bool`
        * Unity: N/A
    * `zAxisSpeed`: Z axis speed during the experiment.
        * Type: `float`
        * Unity: `mm/s`

___

## ExperimentBodyParams

!!! quote ""
    ``` js title=""
    class ExperimentBodyParams {
        constructor(type=0, paramA=0, paramB=0, height=0) {
            this.type = type;       // Body format | 1 = Rectangle | 2 = Cylinder | 3 = Tube
            this.paramA = paramA;   // Param 'a' of the body | Rectangle = length | Cylinder = External diameter | Tube = External diameter
            this.paramB = paramB;   // Parâmetro 'b' do corpo | Rectangle = depth | Cylinder = NULL | Tube = Internal diameter
            this.height = height;   // Height of the test body
        }
    }
    ```
    > * `type`: Body format
        * 1 = Rectangle
        * 2 = Cylinder
        * 3 = Tube
        * Type: `int`
        * Unity: N/A
    * `paramA`: Param 'a' of the body
        * Rectangle = length
        * Cylinder = External diameter
        * Tube = External diameter
        * Type: `float`
        * Unity: `mm`
    * `paramB`: Parâmetro 'b' do corpo
        * Rectangle = depth
        * Cylinder = NULL
        * Tube = Internal diameter
        * Type: `float`
        * Unity: `mm`
    * `height`: Height of the test body
        * Type: `float`
        * Unity: `mm`

___

## MaterialData
!!! quote ""
    The following class is a *template* of the material type an experiment can have.
    ``` js title=""
    class MaterialData {
        constructor(name="Padrão", batch=0, index=0) {
            this.name = name;
            this.batch = batch;
            this.index = index;
        }
    }
    ```
    > * `name`: Material name
        * Type: `String`
        * Unity: N/A
    * `batch`: Material batch
        * Type: `int`
        * Unity: N/A    
    * `index`: Index of the material on the data base
        * Type: `int`
        * Unity: N/A

___

## Experiment
!!! quote ""
    The following class is a *template* of a full experiment.

    ``` js title=""
    class Experiment {
        constructor(material=new MaterialData(), reading=[], index=0) {
            this.material = material;
            this.reading = reading
            this.index = index;
        }
    }
    ```
    > * `material`: Material of the experiment
        * Type: [`MaterialData`](#materialdata)
        * Unity: N/A
    * `reading`: Data points of the experiment reading
        * Type: [`array[DataPoint]`](#datapoint)
        * Unity: N/A    
    * `index`: Index of the experiment on the data base
        * Type: `int`
        * Unity: N/A