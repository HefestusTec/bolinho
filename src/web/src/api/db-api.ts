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

import { toast } from "react-toastify";
import { eel } from "./backend-api";
import { MaterialType, BodyType, ExperimentType } from "types/DataBaseTypes";
import { DataPointType } from "types/DataPointTypes";

/*
get_materials
get_experiments


get_experiments_by_material_id


get_body_by_id
get_experiment_by_id
get_material_by_id


get_load_over_time_by_experiment_id -> {x, y}[]
get_load_over_position_by_experiment_id -> {x, y}[]


*/

export const getMaterialsDB = async (): Promise<MaterialType[]> => {
    try {
        return JSON.parse(await eel.get_materials()()) as MaterialType[];
    } catch (error) {
        toast.error("Não foi possível receber os materiais");
        return [];
    }
};

export const getExperimentsDB = async (): Promise<ExperimentType[]> => {
    try {
        const response = JSON.parse(
            await eel.get_experiments()()
        ) as ExperimentType[];
        return response;
    } catch (error) {
        toast.error("Não foi possível receber os experimentos");
        return [];
    }
};

export const getExperimentsByMaterialId = async (
    id: number
): Promise<ExperimentType[]> => {
    try {
        return JSON.parse(
            await eel.get_experiments_by_material_id(id)()
        ) as ExperimentType[];
    } catch (error) {
        toast.error(
            "Não foi possível receber o experimento com material_id " + id
        );
        return [];
    }
};

export const getBodyById = async (
    id: number
): Promise<BodyType | undefined> => {
    try {
        return JSON.parse(await eel.get_body_by_id(id)()) as BodyType;
    } catch (error) {
        toast.error("Não foi possível receber o corpo de id:  " + id);
        return undefined;
    }
};

export const getExperimentById = async (
    id: number
): Promise<ExperimentType | undefined> => {
    try {
        const response = JSON.parse(
            await eel.get_experiment_by_id(id)()
        ) as ExperimentType;
        console.log(response);

        return response;
    } catch (error) {
        toast.error("Não foi possível receber o corpo de id:  " + id);
        return undefined;
    }
};

export const getMaterialById = async (
    id: number
): Promise<MaterialType | undefined> => {
    try {
        return JSON.parse(await eel.get_material_by_id(id)()) as MaterialType;
    } catch (error) {
        toast.error("Não foi possível receber o material de id:  " + id);
        return undefined;
    }
};

export const getLoadOverTimeByExperimentId = async (
    id: number
): Promise<DataPointType[]> => {
    try {
        return JSON.parse(
            await eel.get_load_over_time_by_experiment_id(id)()
        ) as DataPointType[];
    } catch (error) {
        toast.error(
            "Não foi possível receber a leitura de carga pelo tempo do experimento de id:  " +
                id
        );
        return [];
    }
};

export const getLoadOverPositionByExperimentId = async (
    id: number
): Promise<DataPointType[]> => {
    try {
        return JSON.parse(
            await eel.get_load_over_position_by_experiment_id(id)()
        ) as DataPointType[];
    } catch (error) {
        toast.error(
            "Não foi possível receber a leitura de carga pela posição do experimento de id:  " +
                id
        );
        return [];
    }
};
