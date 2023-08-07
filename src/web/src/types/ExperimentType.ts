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

export type AutoStopParamsType = {
    force_loss: number;
    max_force: number;
    max_travel: number;
    max_time: number;
};
export const defaultAutoStopParamsType = {
    force_loss: 0,
    max_force: 0,
    max_travel: 0,
    max_time: 0,
};

export type BodyParamsType = {
    type: number;
    param_a: number;
    param_b: number;
    height: number;
};
export const defaultBodyParamsType = {
    type: 0,
    param_a: 0,
    param_b: 0,
    height: 0,
};

export type ExperimentParamsType = {
    stop_params: AutoStopParamsType;
    body_params: BodyParamsType;
    compress: boolean;
    z_speed: number;
};
export const defaultExperimentParamsType = {
    stop_params: defaultAutoStopParamsType,
    body_params: defaultBodyParamsType,
    compress: true,
    z_speed: 1,
};

export type DateType = {
    day: number;
    month: number;
    year: number;
};
export const defaultDateType = {
    day: 1,
    month: 1,
    year: 2023,
};

export type ExperimentType = {
    experiment_params: ExperimentParamsType;
    id: number;
    date: DateType;
    data_array_id: number;
    material_id: number;
    extra_info: string;
};
export const defaultExperimentType = {
    experiment_params: defaultExperimentParamsType,
    id: 0,
    date: defaultDateType,
    data_array_id: 0,
    material_id: 0,
    extra_info: "extra ",
};
