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

from peewee import *
import datetime
from os.path import exists as path_exists
from os import makedirs
import random


db_path = "persist/bolinho.db"


class BaseModel(Model):
    class Meta:
        database = SqliteDatabase(db_path)


class Material(BaseModel):
    """
    Material class
    Attributes:
        name: Name of the material
        batch: Batch of the material
        supplier_name: Name of the supplier
        supplier_contact_info: Contact information of the supplier
        extra_info: Extra information about the material
    """

    id = AutoField()
    name = CharField()
    batch = CharField()
    supplier_name = CharField()
    supplier_contact_info = CharField()
    extra_info = CharField()


class Body(BaseModel):
    """
    Body class
    Attributes:
        type: Body format (1 = Rectangle; 2 = Cylinder; 3 = Tube)
        material_id: ID of the material used in the body
        param_a: (Rectangle = length; Cylinder = External diameter; Tube = External diameter)
        param_b: (Rectangle = depth; Cylinder = NULL; Tube = Internal diameter)
        height: Height of the body
        extra_info: Extra information about the body
    """

    id = AutoField()
    type = IntegerField()
    material = ForeignKeyField(Material, backref="bodies")
    param_a = FloatField()
    param_b = FloatField()
    height = FloatField()
    extra_info = CharField()


class Experiment(BaseModel):
    """
    Experiment class
    Attributes:
        name: Name of the experiment
        body_id: ID of the body used in the experiment
        datetime: Date and time of the experiment
        load_loss_limit: Load loss limit (Newton/sec)
        max_load: Maximum load (Newton)
        max_travel: Maximum travel (millimeters)
        max_time: Maximum time (seconds)
        compress: True if the experiment is compressive, False if it is tensile
        z_speed: Speed of the z axis (millimeters/second)
        extra_info: Extra information about the experiment
    """

    id = AutoField()
    name = CharField()
    body = ForeignKeyField(Body, backref="experiments")
    date_time = DateTimeField(default=datetime.datetime.now())
    load_loss_limit = FloatField()
    max_load = FloatField()
    max_travel = FloatField()
    max_time = FloatField()
    compress = BooleanField()
    z_axis_speed = FloatField()
    extra_info = CharField()
    plot_color = CharField()


class Reading(BaseModel):
    """
    Readings class
    Attributes:
        experiment_id: ID of the experiment
        x: X position of the reading
        load: Load of the reading
        z_pos: Z position of the reading
    """

    id = AutoField()
    experiment = ForeignKeyField(Experiment, backref="readings")
    x = IntegerField()
    load = FloatField()
    z_pos = FloatField()


class DBHandler:
    def __init__(self):
        if not path_exists(db_path):
            makedirs("persist", exist_ok=True)
            self.db = SqliteDatabase(db_path)
            print(f"Connecting to database at {db_path}")
            self.db.connect()
            try:
                self.db.create_tables([Material, Body, Experiment, Reading])
                self.__populate()
            except OperationalError as e:
                raise e
        else:
            self.db = SqliteDatabase(db_path)
            print(f"Connecting to database at {db_path}")
            self.db.connect()

    def __del__(self):
        print(f"Closing database connection at {db_path}")
        self.db.close()

    # --- Material --- #

    def post_material(self, data: dict):
        material = Material.create(**data)
        return material.id

    def get_materials(self):
        return Material.select()

    def get_material_by_id(self, id: int):
        return Material.get(Material.id == id)

    def patch_material_by_id(self, id: int, data: dict):
        Material.update(**data).where(Material.id == id).execute()

    def delete_material_by_id(self, id: int):
        Material.delete().where(Material.id == id).execute()

    # --- Body --- #

    def post_body(self, data: dict):
        new_body = Body.create(**data)
        return new_body.id

    def get_body_by_id(self, id: int):
        return Body.get(Body.id == id)

    # --- Experiment --- #

    def post_experiment(self, data: dict) -> int:
        new_experiment = Experiment.create(**data)
        return new_experiment.id

    def get_experiments(self) -> list:
        return Experiment.select()

    def get_experiment_by_id(self, id: int) -> Experiment:
        return Experiment.get(Experiment.id == id)

    def get_experiment_by_id_list(self, ids: list) -> list:
        return Experiment.select().where(Experiment.id.in_(ids))

    def get_experiments_by_material_id(self, material_id: int) -> list:
        return Experiment.select().join(Body).where(Body.material == material_id)

    def patch_experiment_by_id(self, id: int, data: dict) -> None:
        Experiment.update(**data).where(Experiment.id == id).execute()

    def delete_experiment_by_id(self, id: int) -> None:
        body = Experiment.get(Experiment.id == id).body
        Experiment.delete().where(Experiment.id == id).execute()
        Body.delete().where(Body.id == body.id).execute()

    # --- Reading --- #

    def post_reading(self, data: dict):
        reading = Reading.create(**data)
        return reading.id

    def get_load_over_time_by_experiment_id(self, experiment_id: int):
        # return x and load
        return Reading.select(Reading.x, Reading.load).where(
            Reading.experiment == experiment_id
        )

    def get_load_over_position_by_experiment_id(self, experiment_id: int):
        # return z_pos and load
        return Reading.select(Reading.z_pos, Reading.load).where(
            Reading.experiment == experiment_id
        )

    # --- Populate --- #

    def __populate(self):
        self.post_material(
            {
                "name": "Steel",
                "batch": "S1",
                "supplier_name": "Supplier 1",
                "supplier_contact_info": "Contact info 1",
                "extra_info": "Extra info 1",
            }
        )
        self.post_material(
            {
                "name": "Iron",
                "batch": "I1",
                "supplier_name": "Supplier 2",
                "supplier_contact_info": "Contact info 2",
                "extra_info": "Extra info 2",
            }
        )

        for i in range(10):
            self.post_body(
                {
                    "type": i % 3 + 1,
                    "material_id": i % 2 + 1,
                    "param_a": 0.1 + i / 10,
                    "param_b": 0.1 + 2 * i / 10,
                    "height": 0.1 + 3 * i / 10,
                    "extra_info": "Extra info " + str(i),
                }
            )

        for i in range(10):
            self.post_experiment(
                {
                    "name": "Exp " + str(i),
                    "body_id": i % 10 + 1,
                    "date_time": datetime.datetime.now(),
                    "load_loss_limit": 0.1 + i / 10,
                    "max_load": 0.1 + 2 * i / 10,
                    "max_travel": 0.1 + 3 * i / 10,
                    "max_time": 0.1 + 4 * i / 10,
                    "compress": i % 2 == 0,
                    "z_axis_speed": 0.1 + 4 * i / 10,
                    "extra_info": "Extra info " + str(i),
                    "plot_color": "#" + str(random.randint(0, 999999)),
                }
            )

        for i in range(10):
            for j in range(50):
                self.post_reading(
                    {
                        "x": j,
                        "experiment_id": i % 10 + 1,
                        "load": random.randint(0, 200),
                        "z_pos": (j * 2) - 50,
                    }
                )

        # test all queries
        print("Testing get_materials")
        materials = self.get_materials()
        for material in materials:
            print(material.name)

        print("Testing get_material_by_id")
        material = self.get_material_by_id(1)
        print(material.name)

        print("Testing get_body_by_id")
        body = self.get_body_by_id(1)
        print(body.type)

        print("Testing get_experiments")
        experiments = self.get_experiments()
        for experiment in experiments:
            print(experiment.name)

        print("Testing get_experiment_by_id")
        experiment = self.get_experiment_by_id(1)
        print(experiment.name)

        print("Testing get_experiments_by_material_id")
        experiments = self.get_experiments_by_material_id(1)
        for experiment in experiments:
            print(experiment.name)

        print("Testing get_load_over_time_by_experiment_id")
        readings = self.get_load_over_time_by_experiment_id(1)
        for reading in readings:
            print(reading.load, reading.x)

        print("Testing get_load_over_position_by_experiment_id")
        readings = self.get_load_over_position_by_experiment_id(1)
        for reading in readings:
            print(reading.load, reading.z_pos)

        # self.__clear_data()

    def __clear_data(self):
        Reading.delete().execute()
        Experiment.delete().execute()
        Body.delete().execute()
        Material.delete().execute()


db_handler = DBHandler()

if __name__ == "__main__":
    DBHandler()
