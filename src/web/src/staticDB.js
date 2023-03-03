// Copyright (C) 2023 Hefestus
//
// This file is part of Bolinho.
//
// Bolinho is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Bolinho is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Bolinho.  If not, see <http://www.gnu.org/licenses/>.
var _pj;

var data_point_array_data_base, experiment_data_base, material_data_base;

function _pj_snippets(container) {
    function in_es6(left, right) {
        if (right instanceof Array || typeof right === "string") {
            return right.indexOf(left) > -1;
        } else {
            if (
                right instanceof Map ||
                right instanceof Set ||
                right instanceof WeakMap ||
                right instanceof WeakSet
            ) {
                return right.has(left);
            } else {
                return left in right;
            }
        }
    }

    container["in_es6"] = in_es6;
    return container;
}

_pj = {};

_pj_snippets(_pj);

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function get_random_data_points(dataSize) {
    var return_array;
    return_array = [];

    for (var i = 0, _pj_a = dataSize; i < _pj_a; i += 1) {
        return_array.push(new DataPoint(i, randInt(0, 100)));
    }

    return return_array;
}

class DataPoint {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}

class DataPointArray {
    constructor(id = 0, experiment_id = 0, data_array = []) {
        this.id = id;
        this.experiment_id = experiment_id;
        this.data_array = data_array;
    }
}

class AutoStopParams {
    constructor(
        force_loss = 20,
        max_force = 1000,
        max_travel = 100,
        max_time = 600
    ) {
        this.force_loss = force_loss;
        this.max_force = max_force;
        this.max_travel = max_travel;
        this.max_time = max_time;
    }
}

class BodyParams {
    constructor(type = 1, param_a = 0, param_b = 0, height = 0) {
        this.type = type;
        this.param_a = param_a;
        this.param_b = param_b;
        this.height = height;
    }
}

class ExperimentParams {
    constructor(
        stop_params = new AutoStopParams(),
        body_params = new BodyParams(),
        compress = true,
        z_speed = 5
    ) {
        this.stop_params = stop_params;
        this.body_params = body_params;
        this.compress = compress;
        this.z_speed = z_speed;
    }
}

class Date {
    constructor(day = 1, month = 1, year = 2023) {
        this.day = day;
        this.month = month;
        this.year = year;
    }
}

class Experiment {
    constructor(
        id = 0,
        date = new Date(),
        experiment_params = new ExperimentParams(),
        data_array_id = 0,
        material_id = 0,
        extra_info = ""
    ) {
        this.experiment_params = experiment_params;
        this.id = id;
        this.date = date;
        this.data_array_id = data_array_id;
        this.material_id = material_id;
        this.extra_info = extra_info;
    }
}

class Supplier {
    constructor(name = "NONE", email = "") {
        this.name = name;
        this.email = email;
    }
}

class Material {
    constructor(
        id = 0,
        name = "NONE",
        batch = 0,
        experiment_array = [],
        supplier = new Supplier(),
        extra_info = ""
    ) {
        this.id = id;
        this.name = name;
        this.batch = batch;
        this.experiment_array = experiment_array;
        this.supplier = supplier;
        this.extra_info = extra_info;
    }
}

data_point_array_data_base = [
    new DataPointArray(0, 0, get_random_data_points(23)),
    new DataPointArray(1, 1, get_random_data_points(15)),
    new DataPointArray(2, 2, get_random_data_points(46)),
    new DataPointArray(3, 3, get_random_data_points(60)),
];
experiment_data_base = [
    new Experiment(
        0,
        new Date(23, 9, 1998),
        new ExperimentParams(),
        0,
        0,
        "Feito pelo hermes"
    ),
    new Experiment(
        1,
        new Date(1, 1, 2023),
        new ExperimentParams(),
        1,
        1,
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
    ),
    new Experiment(
        2,
        new Date(3, 11, 2012),
        new ExperimentParams(),
        2,
        0,
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
    ),
    new Experiment(
        3,
        new Date(22, 11, 2011),
        new ExperimentParams(),
        3,
        2,
        "Cilindro em \u00f3leo"
    ),
];
material_data_base = [
    new Material(
        0,
        "Aço",
        23,
        [0, 2],
        new Supplier("VALE", "compras@vale.com"),
        "Comprado pela marta"
    ),
    new Material(
        1,
        "Aço",
        44,
        [1],
        new Supplier("lore", "lorem@ipsum.com"),
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse purus nunc"
    ),
    new Material(
        2,
        "ABS",
        0,
        [3],
        new Supplier("Minas LTDA", "minas@hotmail.com"),
        "Cilindro molhado em \u00f3leo"
    ),
];

export class fakeEel {
    get_experiment_list() {
        return function get_experiment_list() {
            return JSON.stringify(experiment_data_base);
        };
    }
    get_experiment_at(id) {
        return function get_experiment_at() {
            if (experiment_data_base.length - 1 < id) {
                return null;
            }
            return JSON.stringify(experiment_data_base[id]);
        };
    }
    get_multiple_experiments(ids) {
        return function get_multiple_experiments() {
            var experiment_data_array;
            experiment_data_array = [];

            for (
                var experimentId, _pj_c = 0, _pj_a = ids, _pj_b = _pj_a.length;
                _pj_c < _pj_b;
                _pj_c += 1
            ) {
                experimentId = _pj_a[_pj_c];

                if (experimentId < experiment_data_base.length) {
                    experiment_data_array.push(
                        experiment_data_base[experimentId]
                    );
                }
            }

            return JSON.stringify(experiment_data_array);
        };
    }
    get_material_list() {
        return function get_material_list() {
            return JSON.stringify(material_data_base);
        };
    }
    get_material_at(id) {
        return function get_material_at() {
            if (material_data_base.length - 1 < id) {
                return null;
            }
            return JSON.stringify(material_data_base[id]);
        };
    }
    get_material_with_experiment(experiment_id) {
        return function get_material_with_experiment() {
            for (
                var material,
                    _pj_c = 0,
                    _pj_a = material_data_base,
                    _pj_b = _pj_a.length;
                _pj_c < _pj_b;
                _pj_c += 1
            ) {
                material = _pj_a[_pj_c];

                if (_pj.in_es6(experiment_id, material.experiment_array)) {
                    return material;
                }
            }

            return null;
        };
    }
    get_experiment_dict(id) {
        return function get_experiment_dict() {
            var data_array_fragment,
                experiment_fragment,
                material_fragment,
                pair;
            material_fragment = get_material_with_experiment(id)();

            experiment_fragment = experiment_data_base[id];
            data_array_fragment =
                data_point_array_data_base[experiment_fragment.data_array_id]
                    .data_array;
            pair = {
                material: material_fragment,
                experiment: experiment_fragment,
                data_array: data_array_fragment,
            };

            return JSON.stringify(pair);
        };
    }
}

function get_material_with_experiment(experiment_id) {
    return function get_material_with_experiment() {
        for (
            var material,
                _pj_c = 0,
                _pj_a = material_data_base,
                _pj_b = _pj_a.length;
            _pj_c < _pj_b;
            _pj_c += 1
        ) {
            material = _pj_a[_pj_c];

            if (_pj.in_es6(experiment_id, material.experiment_array)) {
                return material;
            }
        }

        return null;
    };
}
