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

# Load and Save Data

This page gathers all the API calls related to loading and saving data. 


## Pre-experiment params

### get_auto_stop_params()

!!! quote ""
    Returns the [`autoStopParams`](./dataTypes.md#autostopparams) from the machine.

    ``` js
    let myStopParams = eel.get_auto_stop_params();
    ```

### set_auto_stop_params()

!!! quote ""
    Sets the equipments [`autoStopParams`](./dataTypes.md#autostopparams).

    ``` js
    const autoStopParams = {
        forceLossLimit: 20, // If theres a loss of force greater than 20% the experiment will be halted
        maxForce: 10000,    // Maximum force limit in Newtons
        maxTravel: 100,     // Maximum travel in mm
        maxTime: 600        // Maximum experiment time in seconds
    };

    eel.set_auto_stop_params(autoStopParams);
    ```

### set_experiment_settings( settings )

!!! quote ""
    Sets the [`experimentSettings`](./dataTypes.md#experimentsettings).

    ``` js
    const experimentSettings = {
        compress: true, // (Should the experiment head move up or down?) true = compressing | false = expanding
        zAxisSpeed: 5,  // Z axis speed during the experiment in mm/s 
    };

    eel.set_experiment_settings(experimentSettings);
    ```

### set_experiment_body_params( experiment_body_params )

!!! quote ""
    Sets the [`ExperimentBodyParams`](./dataTypes.md#experimentbodyparams);
    
    ``` js
    const experimentBodyParams = new ExperimentBodyParams();

    eel.set_experiment_body_params(experimentBodyParams);
    ```
___

## Experiment Data

### get_experiment_data( experiment_index )

!!! quote ""
    Returns an `array` of [`DataPoint`](./dataTypes.md#datapoint) from an experiment.

    ``` js
    experimentData = await eel.get_experiment_data(2);
    ```
    
### get_new_experiment_data( experiment_index, data_index )

!!! quote ""
    Returns an `array` of [`DataPoint`](./dataTypes.md#datapoint) from an experiment from an `data_index` onwards.

    This method is used to fetch new data points, without needing to update the already received data.

    ``` js
    newData = await eel.get_new_experiment_data(2, 354);
    ```

___

## Equipment Params

### get_calibration_params()

!!! quote ""
    Get the calibration params.
    ``` js
    calibrationParams = await eel.get_calibration_params();
    ```

### get_equipment_params()

!!! quote ""
    Get the equipment params.
    ``` js
    calibrationParams = await eel.get_calibration_params();
    ```

### set_equipment_params()

!!! quote ""
    Set the equipment params.
    ``` js
    eel.set_equipment_params( myEquipmentParams );
    ```
___

## Manipulating the data base

### get_material_data( material_index )

!!! quote ""
    Gets the [`MaterialData`](./dataTypes.md#materialdata) of a material, returns `NULL` if the index doesn't exists.
    
    ``` js
    materialDataAtIndex = await eel.get_material_data(2);
    ```

### set_material_data( material, material_index )

!!! quote ""
    Sets the [`MaterialData`](./dataTypes.md#materialdata) of a material is a specific index.

    ``` js
    materialData = new MaterialData()

    eel.set_material_data(materialData);
    ```

### get_material_list( filter )

!!! quote ""
    Finds and returns a `list` of [`MaterialData`](./dataTypes.md#materialdata) that can be filtered.

    You can pass a `filter` to make a filtered search.

    Returns `NULL` if theres no material that matches the filter.

    ``` js
    materialsList = await eel.get_material_list(name="Madeira");
    ```

