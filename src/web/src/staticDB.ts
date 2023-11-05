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

import { Dispatch, SetStateAction } from "react";
import {
    BodyType,
    ExperimentType,
    MaterialType,
    defaultBodyType,
    defaultExperimentType,
    defaultMaterialType,
} from "types/DataBaseTypes";
import { PageType } from "types/PageType";
let setCurrentPage: Dispatch<SetStateAction<PageType>> | null = null;
export function setCurrentPageCallBack(
    callback: Dispatch<SetStateAction<PageType>>
) {
    setCurrentPage = callback;
}
var _pj: any;

var experiment_data_base: ExperimentType[],
    material_data_base: MaterialType[],
    // data_point_array_data_base: DataPointType[][],
    body_data_base: BodyType[];

function _pj_snippets(container: any) {
    function in_es6(left: any, right: any) {
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

body_data_base = [
    {
        height: 2,
        extra_info: "1",
        id: 0,
        material: defaultMaterialType,
        param_a: 123,
        param_b: 23,
        type: 1,
    },
    {
        height: 2,
        extra_info: "1",
        id: 1,
        material: defaultMaterialType,
        param_a: 123,
        param_b: 23,
        type: 1,
    },
    {
        height: 2,
        extra_info: "1",
        id: 2,
        material: defaultMaterialType,
        param_a: 123,
        param_b: 23,
        type: 1,
    },
];
// data_point_array_data_base = [
//     get_random_data_points(23),
//     get_random_data_points(15),
//     get_random_data_points(46),
//     get_random_data_points(60),
// ];
experiment_data_base = [
    {
        id: 0,
        body: defaultBodyType,
        compress: false,
        date_time: "23/09/2001",
        extra_info: "Feito pelo hermes",
        load_loss_limit: 23,
        max_load: 290,
        max_time: 123,
        max_travel: 9,
        name: "Experimento de compressão 22",
        z_axis_speed: 23,
        plot_color: "#ffffff",
        num_of_data_points: 100,
    },
    {
        id: 1,
        body: defaultBodyType,
        compress: false,
        date_time: "13/01/2023",
        extra_info: "Cilindro em \u00f3leo",
        load_loss_limit: 23,
        max_load: 290,
        max_time: 123,
        max_travel: 9,
        name: "as 22",
        z_axis_speed: 23,
        plot_color: "#ffffff",
        num_of_data_points: 100,
    },
    {
        id: 2,
        body: defaultBodyType,
        compress: true,
        date_time: "23/19/3001",
        extra_info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        load_loss_limit: 23,
        max_load: 90,
        max_time: 13,
        max_travel: 129,
        name: "exp 2",
        z_axis_speed: 3023,
        plot_color: "#ffffff",
        num_of_data_points: 100,
    },
];
material_data_base = [
    {
        id: 0,
        name: "Aço",
        batch: "23k",
        extra_info: "Comprado pela marta",
        supplier_contact_info: "compras@vale.com",
        supplier_name: "VALE",
    },
    {
        id: 1,
        name: "Aço",
        batch: "av",
        extra_info:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse purus nunc",
        supplier_contact_info: "lorem@ipsum.com",
        supplier_name: "lore",
    },
    {
        id: 2,
        name: "ABS",
        batch: "av",
        extra_info:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse purus nunc",
        supplier_contact_info: "lorem@ipsum.com",
        supplier_name: "lore",
    },
];

export class fakeEel {
    get_materials() {
        return function get_materials() {
            return JSON.stringify(material_data_base);
        };
    }
    get_experiments() {
        return function get_experiments() {
            return JSON.stringify(experiment_data_base);
        };
    }
    get_material_by_id(id: number) {
        return function get_material_by_id(id: number) {
            return JSON.stringify(defaultMaterialType);
        };
    }
    get_body_by_id(id: number) {
        return function get_body_by_id(id: number) {
            return JSON.stringify(defaultBodyType);
        };
    }
    get_experiment_by_id(id: number) {
        return function get_experiment_by_id(id: number) {
            return JSON.stringify(defaultExperimentType);
        };
    }

    get_experiments_by_material_id(id: number) {
        return function get_experiments_by_material_id(id: number) {
            let experimentsList: ExperimentType[] = [];
            experiment_data_base.forEach((element) => {
                const myMaterial =
                    material_data_base[
                        body_data_base[element.body.id].material.id
                    ];
                if (id === myMaterial.id) experimentsList.push(element);
            });
            return JSON.stringify(experimentsList);
        };
    }
    isOnExperiment = false;

    pointsArray = [
        { x: 1, y: 2 },
        { x: 2, y: 4 },
        { x: 3, y: 52 },
        { x: 4, y: 1 },
    ];

    get_load_over_time_by_experiment_id() {
        return (id: number) => {
            return JSON.stringify(this.pointsArray);
        };
    }

    get_load_over_position_by_experiment_id() {
        return (id: number) => {
            return JSON.stringify(this.pointsArray);
        };
    }

    start_experiment_routine() {
        return () => {
            if (setCurrentPage == null) return;
            setCurrentPage("experiment");
            this.isOnExperiment = true;
        };
    }
    end_experiment_routine() {
        return () => {
            // Routs to the experiment page, returns 1 if it was successful
            if (setCurrentPage == null) return;
            setCurrentPage("home");
            this.isOnExperiment = false;
        };
    }
    get_granulado_is_connected() {
        return async function get_granulado_is_connected() {
            return true;
        };
    }
    check_can_start_experiment() {
        return async function check_can_start_experiment() {
            return true;
        };
    }
    get_available_ports_list() {
        return function get_available_ports_list() {
            return [];
        };
    }
    save_config_params() {
        return function save_config_params() {
            return 1;
        };
    }
    load_config_params() {
        return function get_available_ports_list() {
            return 1;
        };
    }

    post_experiment() {
        return function post_experiment() {
            return -2;
        };
    }
}
