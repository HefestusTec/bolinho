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

# Back End

## [DBHandler.py](https://github.com/HefestusTec/bolinho/blob/main/src/DBHandler.py)
Defines database models using orm_sqlite

## [Models](DBHandler.md#models)
- Material
- Experiment
- Body
- Reading

## [Classes](DBHandler.md#classes)
### [DBHandler](DBHandler.md#dbhandler)
Handles database connection and CRUD operations

#### [Methods](DBHandler.md#methods)
- __init__(self, db_path)
- add_material(self, name, batch)
- add_experiment(self, name, material, date, time, load_loss_limit, max_load, max_travel, max_time, compress, z_axis_speed)
- add_reading(self, experiment, load, z_pos, time)
- get_materials(self)
- get_material_by_id(self, id)
- get_bodies(self)
- get_body_by_id(self, id)
- get_bodies_by_material(self, material)
- get_bodies_by_type(self, body_type)
- get_bodies_by_material_and_type(self, material, body_type)
- get_experiments(self)
- get_experiment_by_id(self, id)
- get_experiments_by_material(self, material)
- get_experiments_by_date(self, date)
- get_experiments_by_date_and_material(self, date, material)
- get_experiment_readings(self, experiment)
- delete_experiment_by_id(self, id)
- delete_material_by_id(self, id)
- populate(self)

# [DataHandler.py](https://github.com/HefestusTec/bolinho/blob/main/src/DataHandler.py)
Handles Raspberry Pi GPIO and data acquisition

## [Classes](DataHandler.md#classes)
###  [DataHandler](DataHandler.md#datahandler)
Abstract class for data acquisition

### [LoadCell](DataHandler.md#loadcell)
Handles load cell data acquisition

### [StepMotor](DataHandler.md#stepmotor)
Handles step motor data acquisition
