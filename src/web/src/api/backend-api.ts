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
// Fake database for static pages

import { fakeEel } from "../staticDB";
import { toast } from "react-toastify";
import { getRandomColor } from "../helpers";
import { GlobalConfigContextProps } from "./apiTypes";
import { MaterialType } from "types/MaterialType";
import { ExperimentType } from "types/ExperimentType";

// Setting up eel and fakeEel
export let eel = window.eel;
try {
    eel.set_host("ws://localhost:8080");
    toast.success("Conexão estabelecida");
} catch {
    toast.error("Não foi possível conectar com o backend");
    eel = new fakeEel(); // Loading a fake db
    toast.info("Iniciando base de dados de testes");
}

export const saveConfigParams = (configParams: GlobalConfigContextProps) => {
    try {
        eel.save_config_params(configParams)();
    } catch (error) {
        toast.error("Não foi possível salvar as mudanças");
        return 0;
    }
};

export const loadConfigParams = async (): Promise<
    GlobalConfigContextProps | undefined
> => {
    try {
        return await eel.load_config_params()();
    } catch (error) {
        toast.error("Não foi possível carregar o arquivo de configuração");
        return undefined;
    }
};

export const getMaterialList = async (): Promise<MaterialType[]> => {
    try {
        const materialList: MaterialType[] = JSON.parse(
            await eel.get_material_list()()
        );
        return materialList;
    } catch (error) {
        return [];
    }
};

export const getExperimentDate = async (
    index: number
): Promise<ExperimentType | undefined> => {
    try {
        return JSON.parse(
            await eel.get_experiment_at(index)()
        ) as ExperimentType;
    } catch (error) {
        toast.error(
            "Não foi possível encontrar a data do experimento de índice " +
                index
        );
        return undefined;
    }
};

export const getExperimentObjectList = async (
    id: number
): Promise<ExperimentType[]> => {
    try {
        const experimentObject: ExperimentType[] = JSON.parse(
            await eel.get_experiment_dict(id)()
        );

        return Object.assign(experimentObject, { color: getRandomColor() });
    } catch (error) {
        toast.error(
            "Não foi possível encontrar a lista de experimentos de índice " + id
        );
        return [];
    }
};

export const returnPromptResult = (result: string) => {
    try {
        eel.prompt_return(result)();
    } catch (error) {
        toast.error("Não foi possível retornar " + result);
    }
};

export const startExperimentRoutineJS = async (): Promise<number> => {
    try {
        return await eel.start_experiment_routine()();
    } catch (error) {
        toast.error("Não foi possível iniciar a rotina de ensaio");
        return 0;
    }
};

export const endExperimentRoutineJS = async (): Promise<number> => {
    try {
        return await eel.end_experiment_routine()();
    } catch (error) {
        toast.error("Não foi possível encerrar a rotina de ensaio");
        return 0;
    }
};
