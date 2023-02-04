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

import orm_sqlite
from datetime import date, time
from os.path import exists as file_exists


class Material(orm_sqlite.Model):
    id = orm_sqlite.IntegerField(primary_key=True)
    name = orm_sqlite.StringField()
    batch = orm_sqlite.StringField()


class Body(orm_sqlite.Model):
    id = orm_sqlite.IntegerField(primary_key=True)
    body_type = orm_sqlite.IntegerField()
    material = orm_sqlite.ForeignKeyField(Material)
    param_a = orm_sqlite.FloatField()
    param_b = orm_sqlite.FloatField()
    height = orm_sqlite.FloatField()


class Experiment(orm_sqlite.Model):
    id = orm_sqlite.IntegerField(primary_key=True)
    name = orm_sqlite.StringField()
    body = orm_sqlite.ForeignKeyField(Body)
    date = orm_sqlite.DateField()
    time = orm_sqlite.TimeField()
    load_loss_limit = orm_sqlite.FloatField()
    max_load = orm_sqlite.FloatField()
    max_travel = orm_sqlite.FloatField()
    max_time = orm_sqlite.TimeField()
    compress = orm_sqlite.BooleanField()
    z_axis_speed = orm_sqlite.FloatField()


class Reading(orm_sqlite.Model):
    id = orm_sqlite.IntegerField(primary_key=True)
    index = orm_sqlite.IntegerField()
    experiment = orm_sqlite.ForeignKeyField(Experiment)
    load = orm_sqlite.FloatField()
    z_pos = orm_sqlite.FloatField()
    tension = orm_sqlite.FloatField()


class DBHandler:
    def __init__(self, db_path: str):
        exists = file_exists(db_path)

        self.db = orm_sqlite.Database(db_path)
        Material.object.backend = self.db
        Experiment.object.backend = self.db
        Reading.object.backend = self.db

        if not exists:
            self.populate()

    # --- Material --- #

    def add_material(self, data: dict):
        material = Material(data)
        material.save()

    def get_materials(self):
        return Material.objects.all()

    def get_materials_by_filter(self, filter: dict):
        return Material.objects.filter(**filter).all()

    def delete_material_by_id(self, id: int):
        Reading.objects.filter(experiment__material=id).delete()
        Experiment.objects.filter(material=id).delete()
        Material.objects.get(pk=id).delete()

    # --- Body --- #

    def add_body(self, data: dict):
        body = Body(data)
        body.save()

    def get_bodies(self):
        return Body.objects.all()

    def get_bodies_by_filter(self, filter: dict):
        return Body.objects.filter(**filter).all()

    def delete_body_by_id(self, id: int):
        Experiment.objects.filter(body=id).delete()
        Body.objects.get(pk=id).delete()

    # --- Experiment --- #

    def add_experiment(self, data: dict):
        experiment = Experiment(data)
        experiment.save()

    def get_experiments(self):
        return Experiment.objects.all()

    def get_experiments_by_filter(self, filter: dict):
        return Experiment.objects.filter(**filter).all()

    def delete_experiment_by_id(self, id: int):
        Reading.objects.filter(experiment=id).delete()
        Experiment.objects.get(pk=id).delete()

    # --- Reading --- #

    def add_reading(self, data: dict):
        reading = Reading(data)
        reading.save()

    def get_experiment_readings(self, experiment_id: int):
        return Reading.objects.filter(experiment=experiment_id).all()

    # --- Populate --- #

    def populate(self):
        self.db.create_tables([Material, Experiment, Reading])

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
                    "date": date.today(),
                    "time": time(),
                    "load_loss_limit": 0.1 + i / 10,
                    "max_load": 0.1 + 2 * i / 10,
                    "max_travel": 0.1 + 3 * i / 10,
                    "max_time": time(),
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

        self.db.commit()
