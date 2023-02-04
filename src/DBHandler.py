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
    body_type = orm_sqlite.StringField()
    material = orm_sqlite.ForeignKeyField(Material)
    param_a = orm_sqlite.FloatField()
    param_b = orm_sqlite.FloatField()
    height = orm_sqlite.FloatField()


class Experiment(orm_sqlite.Model):
    id = orm_sqlite.IntegerField(primary_key=True)
    name = orm_sqlite.StringField()
    material = orm_sqlite.ForeignKeyField(Material)
    date = orm_sqlite.DateField()
    time = orm_sqlite.TimeField()
    load_loss_limit = orm_sqlite.FloatField()
    maxLoad = orm_sqlite.FloatField()
    maxTravel = orm_sqlite.FloatField()
    maxTime = orm_sqlite.TimeField()
    compress = orm_sqlite.BooleanField()
    z_axis_speed = orm_sqlite.FloatField()


class Reading(orm_sqlite.Model):
    id = orm_sqlite.IntegerField(primary_key=True)
    experiment = orm_sqlite.ForeignKeyField(Experiment)
    load = orm_sqlite.FloatField()
    z_pos = orm_sqlite.FloatField()
    time = orm_sqlite.TimeField()


class DBHandler:
    def __init__(self, db_path: str):
        exists = file_exists(db_path)

        self.db = orm_sqlite.Database(db_path)
        Material.object.backend = self.db
        Experiment.object.backend = self.db
        Reading.object.backend = self.db

        if not exists:
            self.populate()

    def add_material(self, data: dict):
        material = Material(data)
        material.save()

    def add_body(self, data: dict):
        body = Body(data)
        body.save()

    def add_experiment(self, data: dict):
        experiment = Experiment(data)
        experiment.save()

    def add_reading(self, data: dict):
        reading = Reading(data)
        reading.save()

    def get_materials(self):
        return Material.objects.all()

    def get_material_by_id(self, id: int):
        return Material.objects.get(pk=id)

    def get_bodies(self):
        return Body.objects.all()

    def get_bodies_by_id(self, id: int):
        return Body.objects.get(pk=id)

    def get_bodies_by_material(self, material: Material):
        return Body.objects.filter(material=material).all()

    def get_bodies_by_type(self, body_type: str):
        return Body.objects.filter(body_type=body_type).all()

    def get_bodies_by_material_and_type(self, material: Material, body_type: str):
        return Body.objects.filter(material=material, body_type=body_type).all()

    def get_experiments(self):
        return Experiment.objects.order_by(Experiment.date.desc()).all()

    def get_experiment_by_id(self, id: int):
        return Experiment.objects.get(pk=id)

    def get_experiments_by_material(self, material: Material):
        return (
            Experiment.objects.filter(material=material)
            .order_by(Experiment.date.desc())
            .all()
        )

    def get_experiments_by_date(self, date: str):
        return (
            Experiment.objects.filter(date=date).order_by(Experiment.date.desc()).all()
        )

    def get_experiments_by_date_and_material(self, date: str, material: Material):
        return (
            Experiment.objects.filter(date=date, material=material)
            .order_by(Experiment.date.desc())
            .all()
        )

    def get_experiment_readings(self, experiment: Experiment):
        return (
            Reading.objects.filter(experiment=experiment)
            .order_by(Reading.time.asc())
            .all()
        )

    def delete_experiment_by_id(self, id: int):
        Reading.objects.filter(experiment=id).delete()
        Experiment.objects.get(pk=id).delete()

    def delete_material_by_id(self, id: int):
        Reading.objects.filter(experiment__material=id).delete()
        Experiment.objects.filter(material=id).delete()
        Material.objects.get(pk=id).delete()

    def populate(self):
        self.db.create_tables([Material, Experiment, Reading])

        self.add_material({"name": "Steel", "batch": "S1"})
        self.add_material({"name": "Iron", "batch": "I1"})

        for i in range(10):
            self.add_experiment(
                {
                    "name": "Test {}".format(i),
                    "material": 1,
                    "date": date.today(),
                    "time": time(),
                    "load_loss_limit": 0.1,
                    "maxLoad": 100,
                    "maxTravel": 100,
                    "maxTime": time(),
                    "compress": True,
                    "z_axis_speed": 100,
                }
            )
            for j in range(10):
                self.add_reading(
                    {"experiment": i + 1, "load": j, "z_pos": j, "time": time()}
                )

        for i in range(10):
            self.add_experiment(
                {
                    "name": "Test {}".format(i),
                    "material": 2,
                    "date": date.today(),
                    "time": time(),
                    "load_loss_limit": 0.1,
                    "maxLoad": 100,
                    "maxTravel": 100,
                    "maxTime": time(),
                    "compress": True,
                    "z_axis_speed": 100,
                }
            )
            for j in range(10):
                self.add_reading(
                    {"experiment": i + 11, "load": j, "z_pos": j, "time": time()}
                )

        self.db.commit()
