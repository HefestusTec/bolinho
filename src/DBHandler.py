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


db_path = "bolinho.db"


class BaseModel(Model):
    class Meta:
        database = SqliteDatabase(db_path)


class Material(BaseModel):
    name = CharField()
    batch = CharField()


class Body(BaseModel):
    body_type = IntegerField()
    material = ForeignKeyField(Material, backref="bodies")
    param_a = FloatField()
    param_b = FloatField()
    height = FloatField()


class Experiment(BaseModel):
    name = CharField()
    body = ForeignKeyField(Body, backref="experiments")
    date = DateTimeField(default=datetime.datetime.now)
    time = DateTimeField(default=datetime.datetime.now)
    load_loss_limit = FloatField()
    max_load = FloatField()
    max_travel = FloatField()
    max_time = DateTimeField(default=datetime.datetime.now)
    compress = BooleanField()
    z_axis_speed = FloatField()


class Reading(BaseModel):
    index = IntegerField()
    experiment = ForeignKeyField(Experiment, backref="readings")
    load = FloatField()
    z_pos = FloatField()
    tension = FloatField()


class DBHandler:
    def __init__(self):
        if not path_exists(db_path):
            self.db = SqliteDatabase(db_path)
            print(f"Connecting to database at {db_path}")
            self.db.connect()
            try:
                self.db.create_tables([Material, Body, Experiment, Reading])
                self.populate()
            except peewee.OperationalError as e:
                raise e
        else:
            self.db = SqliteDatabase(db_path)
            print(f"Connecting to database at {db_path}")
            self.db.connect()
    

    def __del__(self):
        print(f"Closing database connection at {db_path}")
        self.db.close()


    # --- Material --- #

    def add_material(self, data: dict):
        Material.create(**data)

    def get_materials(self):
        return Material.select()

    def get_materials_by_filter(self, filter: dict):
        return Material.select().where(Material.name == filter["name"])

    def delete_material_by_id(self, id: int):
        for reading in (
            Reading.select().join(Experiment).join(Material).where(Material.id == id)
        ):
            reading.delete_instance()
        for experiment in Experiment.select().join(Material).where(Material.id == id):
            experiment.delete_instance()
        for material in Material.select().where(Material.id == id):
            material.delete_instance()

    # --- Body --- #

    def add_body(self, data: dict):
        Body.create(**data)

    def get_bodies(self):
        return Body.select()

    def get_bodies_by_filter(self, filter: dict):
        return Body.select().where(Body.body_type == filter["body_type"])

    def delete_body_by_id(self, id: int):
        for experiment in Experiment.select().join(Body).where(Body.id == id):
            experiment.delete_instance()
        for body in Body.select().where(Body.id == id):
            body.delete_instance()

    # --- Experiment --- #

    def add_experiment(self, data: dict):
        Experiment.create(**data)

    def get_experiments(self):
        return Experiment.select()

    def get_experiments_by_filter(self, filter: dict):
        return Experiment.select().where(Experiment.name == filter["name"])

    def delete_experiment_by_id(self, id: int):
        for reading in Reading.select().join(Experiment).where(Experiment.id == id):
            reading.delete_instance()
        for experiment in Experiment.select().where(Experiment.id == id):
            experiment.delete_instance()

    # --- Reading --- #

    def add_reading(self, data: dict):
        Reading.create(**data)

    def get_experiment_readings(self, experiment_id: int):
        return Reading.select().where(Reading.experiment == experiment_id)

    # --- Populate --- #

    def populate(self):
        self.add_material({"name": "Steel", "batch": "S1"})
        self.add_material({"name": "Iron", "batch": "I1"})

        for i in range(10):
            self.add_body(
                {
                    "body_type": 0,
                    "material": i % 2 + 1,
                    "param_a": 0.1 + i / 10,
                    "param_b": 0.1 + 2 * i / 10,
                    "height": 0.1 + 3 * i / 10,
                }
            )

        for i in range(10):
            self.add_experiment(
                {
                    "name": "Exp " + str(i),
                    "body": i % 10 + 1,
                    "date": datetime.datetime.now(),
                    "time": datetime.datetime.now(),
                    "load_loss_limit": 0.1 + i / 10,
                    "max_load": 0.1 + 2 * i / 10,
                    "max_travel": 0.1 + 3 * i / 10,
                    "max_time": datetime.datetime.now(),
                    "compress": i % 2 == 0,
                    "z_axis_speed": 0.1 + 4 * i / 10,
                }
            )

        for i in range(10):
            for j in range(10):
                self.add_reading(
                    {
                        "index": j,
                        "experiment": i % 10 + 1,
                        "load": 0.1 + j / 10,
                        "z_pos": 0.1 + 2 * j / 10,
                        "tension": 0.1 + 3 * j / 10,
                    }
                )
        
        self.__print_data()
        self.__clear_data()
        self.__print_data()
    

    def __print_data(self):
        print("Materials:")
        for material in self.get_materials():
            print(material.name)
        print("Bodies:")
        for body in self.get_bodies():
            print(body.body_type)
        print("Experiments:")
        for experiment in self.get_experiments():
            print(experiment.name)
        print("Readings:")
        for reading in self.get_experiment_readings(1):
            print(reading.load)
    

    def __clear_data(self):
        Reading.delete().execute()
        Experiment.delete().execute()
        Body.delete().execute()
        Material.delete().execute()


if __name__ == "__main__":
    db = DBHandler()