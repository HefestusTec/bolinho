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

# DBHandler

## [DBHandler.py](https://github.com/HefestusTec/bolinho/blob/main/src/DBHandler.py)
Defines database models using orm_sqlite

## Models
- Material
  - id : Integer Primary Key
  - name: String
  - batch: String

- Experiment
  - id : Integer Primary Key
  - name: String
  - material: Integer Foreign Key
  - date: Date
  - time: Time
  - load_loss_limit: Float
  - max_load: Float
  - max_travel: Float
  - max_time: Float
  - compress: Boolean
  - z_axis_speed: Float

- Body
  - id : Integer Primary Key
  - body_type: String
  - material: Integer Foreign Key
  - param_a: Float
  - param_b: Float
  - height: Float

- Reading
  - id: Integer Primary Key
  - experiment: Integer Foreign Key
  - load: Float
  - z_pos: Float
  - time: Float

## Classes
### DBHandler
Handles database connection and CRUD operations

#### Methods
- __init__(self, db_path)
  - Creates database connection, binds models to database, creates and populates the database if it doesn't exist
  - db_path: Path to database file

- add_material(self, name, batch)
  - name: Name of the material
  - batch: Batch number of the material

- add_experiment(self, name, material, date, time, load_loss_limit, max_load, max_travel, max_time, compress, z_axis_speed)
  - name: Name of the experiment
  - material: Name of the material
  - date: Date of the experiment
  - time: Time of the experiment
  - load_loss_limit: Load loss limit of the experiment
  - max_load: Maximum load of the experiment
  - max_travel: Maximum travel of the experiment
  - max_time: Maximum time of the experiment
  - compress: Whether the experiment is compressive or not
  - z_axis_speed: Speed of the z axis

- add_reading(self, experiment, load, z_pos, time)
  - experiment: Name of the experiment
  - load: Load of the reading
  - z_pos: Z position of the reading
  - time: Time of the reading

- get_materials(self)
  - Returns all materials in the database

- get_material_by_id(self, id)
  - id: Id of the material
  - Returns the material with the given id

- get_bodies(self)
  - Returns all bodies in the database

- get_body_by_id(self, id)
  - id: Id of the body
  - Returns the body with the given id

- get_bodies_by_material(self, material)
  - material: Name of the material
  - Returns all bodies with the given material

- get_bodies_by_type(self, body_type)
  - body_type: Type of the body
  - Returns all bodies with the given type

- get_bodies_by_material_and_type(self, material, body_type)
  - material: Name of the material
  - body_type: Type of the body
  - Returns all bodies with the given material and type

- get_experiments(self)
  - Returns all experiments in the database ordered by date and time descending

- get_experiment_by_id(self, id)
  - id: Id of the experiment
  - Returns the experiment with the given id

- get_experiments_by_material(self, material)
  - material: Name of the material
  - Returns all experiments with the given material

- get_experiments_by_date(self, date)
  - date: Date of the experiment
  - Returns all experiments with the given date

- get_experiments_by_date_and_material(self, date, material)
  - date: Date of the experiment
  - material: Name of the material
  - Returns all experiments with the given date and material

- get_experiment_readings(self, experiment)
  - experiment: Name of the experiment
  - Returns all readings of the given experiment

- delete_experiment_by_id(self, id)
  - id: Id of the experiment
  - Deletes the experiment with the given id and all its readings

- delete_material_by_id(self, id)
  - id: Id of the material
  - Deletes the material with the given id and all its experiments and readings

- populate(self)
  - Populates the database with some dummy data
