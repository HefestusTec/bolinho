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

export const saveConfigParams = (configParams) => {
    try {
        eel.save_config_params(configParams)();
    } catch (error) {
        toast.error("Não foi possível acessar o backend");
        return 0;
    }
};

export const loadConfigParams = async () => {
    try {
        return await eel.load_config_params()();
    } catch (error) {
        toast.error("Não foi possível acessar o backend");
        return 0;
    }
};

export const getMaterialList = async () => {
    try {
        const materialList = JSON.parse(await eel.get_material_list()());
        return materialList;
    } catch (error) {
        return [];
    }
};

export const getExperimentDate = async (index) => {
    try {
        return JSON.parse(await eel.get_experiment_at(index)());
    } catch (error) {
        toast.error("Não foi possível acessar o backend");
        return 0;
    }
};

export const getExperimentObjectList = async (id) => {
    try {
        const experimentObject = JSON.parse(
            await eel.get_experiment_dict(id)()
        );

        return Object.assign(experimentObject, { color: getRandomColor() });
    } catch (error) {
        toast.error("Não foi possível acessar o backend");
        return {};
    }
};

export const startExperimentRoutineJS = async () => {
    try {
        return await eel.start_experiment_routine()();
    } catch (error) {
        toast.error("Não foi possível acessar o backend");
        return 0;
    }
};
