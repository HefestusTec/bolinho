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

export type MaterialType = {
    id: number;
    name: string;
    batch: string;
    supplier_name: string;
    supplier_contact_info: string;
    extra_info: string;
};
export const defaultMaterialType: MaterialType = {
    id: 0,
    name: "NONE",
    batch: "NONE",
    supplier_name: "NONE",
    supplier_contact_info: "NONE",
    extra_info: "NONE",
};

export type BodyType = {
    id: number;
    type: number;
    material: MaterialType;
    param_a: number;
    param_b: number;
    height: number;
    extra_info: string;
};
export const defaultBodyType: BodyType = {
    id: 0,
    type: 0,
    material: defaultMaterialType,
    param_a: 0,
    param_b: 0,
    height: 0,
    extra_info: "Default Info",
};

export type ExperimentType = {
    id: number;
    name: string;
    body: BodyType;
    date_time: string;
    load_loss_limit: number;
    max_load: number;
    max_travel: number;
    max_time: number;
    num_of_data_points: number;
    z_axis_speed: number;
    compress: boolean;
    extra_info: string;
    plot_color: string;
};
export const defaultExperimentType: ExperimentType = {
    id: 0,
    name: "",
    body: defaultBodyType,
    date_time: "00/00/0000",
    load_loss_limit: 0,
    max_load: 0,
    max_travel: 0,
    max_time: 0,
    num_of_data_points: 1,
    z_axis_speed: 0,
    compress: false,
    extra_info: "NONE",
    plot_color: "#0000FF",
};
