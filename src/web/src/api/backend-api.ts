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
import { GlobalConfigContextProps } from "./apiTypes";

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

export const setCustomMovementDistanceJS = async (
    newDistance: number
): Promise<number> => {
    try {
        return await eel.set_custom_movement_distance(newDistance)();
    } catch (error) {
        toast.error(
            "Não foi possível setar a nova distância de movimento para " +
                newDistance
        );
        return 0;
    }
};

export const returnZAxisJS = async (): Promise<number> => {
    try {
        return await eel.return_z_axis()();
    } catch (error) {
        toast.error("Não foi possível retornar o eixo Z à origem");
        return 0;
    }
};

export const stopZAxisJS = async (): Promise<number> => {
    try {
        return await eel.stop_z_axis()();
    } catch (error) {
        toast.error("Não foi possível parar o eixo Z.");
        return 0;
    }
};
