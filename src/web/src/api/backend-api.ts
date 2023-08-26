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
import { PortType } from "types/PortType";

// Setting up eel and fakeEel
export let eel = window.eel;
try {
    eel.set_host("ws://localhost:8080");
    toast.success("Conexão estabelecida");
} catch (error) {
    console.error(error);
    toast.error("Não foi possível conectar com o backend");
    eel = new fakeEel(); // Loading a fake db
    toast.info("Iniciando base de dados de testes");
}

export const saveConfigParams = (configParams: GlobalConfigContextProps) => {
    try {
        eel.save_config_params(configParams)();
    } catch (error) {
        console.error(error);
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
        console.error(error);
        toast.error("Não foi possível carregar o arquivo de configuração");
        return undefined;
    }
};

export const returnPromptResult = (result: string) => {
    try {
        eel.prompt_return(result)();
    } catch (error) {
        console.error(error);
        toast.error("Não foi possível retornar " + result);
    }
};

export const checkCanStartExperimentJS = async (): Promise<number> => {
    try {
        return await eel.check_can_start_experiment()();
    } catch (error) {
        console.error(error);
        toast.error("Algo deu errado ");
        return 0;
    }
};

export const startExperimentRoutineJS = async (
    experimentId: number
): Promise<number> => {
    try {
        return await eel.start_experiment_routine(experimentId)();
    } catch (error) {
        console.error(error);
        toast.error(
            "Não foi possível iniciar a rotina de ensaio para o experimento de ID: " +
                experimentId
        );
        return 0;
    }
};

export const endExperimentRoutineJS = async (): Promise<number> => {
    try {
        return await eel.end_experiment_routine()();
    } catch (error) {
        console.error(error);
        toast.error("Não foi possível encerrar a rotina de ensaio");
        return 0;
    }
};

/*
export const setCustomMovementDistanceJS = async (
    newDistance: number
): Promise<number> => {
    // DEPRECATED
    try {
        return await eel.set_custom_movement_distance(newDistance)();
    } catch (error) {
        console.error(error);toast.error(
            "Não foi possível setar a nova distância de movimento para " +
                newDistance
        );
        return 0;
    }
};
*/

export const returnZAxisJS = async (): Promise<number> => {
    try {
        return await eel.return_z_axis()();
    } catch (error) {
        console.error(error);
        toast.error("Não foi possível retornar o eixo Z à origem");
        return 0;
    }
};

export const stopZAxisJS = async (): Promise<number> => {
    try {
        return await eel.stop_z_axis()();
    } catch (error) {
        console.error(error);
        toast.error("Não foi possível parar o eixo Z.");
        return 0;
    }
};

export const moveZAxisMillimetersJS = async (
    distance: number
): Promise<number> => {
    try {
        return await eel.move_z_axis_millimeters(distance)();
    } catch (error) {
        console.error(error);
        toast.error("Não foi possível mover o eixo Z.");
        return 0;
    }
};

export const getAvailablePortsListJS = async (): Promise<
    PortType[] | undefined
> => {
    try {
        return await eel.get_available_ports_list()();
    } catch (error) {
        console.error(error);
        toast.error("Não foi possível atualizar a lista de portas.");
        return undefined;
    }
};

export const connectToPortJS = async (port: string): Promise<number> => {
    try {
        return await eel.connect_to_port(port)();
    } catch (error) {
        console.error(error);
        toast.error("Não foi possível conectar a porta: " + port);
        return 0;
    }
};

export const tareLoadJs = async (): Promise<number> => {
    try {
        return await eel.tare_load()();
    } catch (error) {
        console.error(error);
        toast.error("Não foi possível tarar a célula de carga.");
        return 0;
    }
};

export const calibrateKnownWeightJS = async (): Promise<number> => {
    try {
        return await eel.calibrate_known_weight()();
    } catch (error) {
        console.error(error);
        toast.error("Não foi possível calibrar o peso padrão.");
        return 0;
    }
};

export const calibrateZAxisJS = async (): Promise<number> => {
    try {
        return await eel.calibrate_z_axis()();
    } catch (error) {
        console.error(error);
        toast.error("Não foi possível calibrar o eixo-z.");
        return 0;
    }
};

export type PostMaterialType = {
    name: string;
    batch: string;
    supplier_name: string;
    supplier_contact_info: string;
    extra_info: string;
};

export const postMaterialJS = async (
    material: PostMaterialType
): Promise<number> => {
    try {
        return await eel.post_material(material)();
    } catch (error) {
        console.error(error);
        toast.error("Não foi possível criar esse novo material.");
        return 0;
    }
};

export type PostExperimentType = {
    body: {
        type: number;
        material_id: number;
        param_a: number;
        param_b: number;
        height: number;
        extra_info: string;
    };
    experiment: {
        name: string;
        load_loss_limit: number;
        max_load: number;
        max_travel: number;
        max_time: number;
        compress: boolean;
        z_axis_speed: number;
        extra_info: string;
    };
};

export const postExperimentJS = async (
    experiment: PostExperimentType
): Promise<number> => {
    // Returns the id of the new experiment
    try {
        return await eel.post_experiment(experiment)();
    } catch (error) {
        console.error(error);
        toast.error("Não foi possível criar esse novo experimento.");
        return 0;
    }
};

export type PatchMaterialType = {
    name: string;
    id: number;
    supplier_name: string;
    supplier_contact_info: string;
    extra_info: string;
};

export const patchMaterialByIdJS = async (
    patchMaterial: PatchMaterialType
): Promise<number> => {
    try {
        return await eel.patch_material_by_id(patchMaterial)();
    } catch (error) {
        console.error(error);
        toast.error("Não foi possível criar esse novo material.");
        return 0;
    }
};

export type PatchExperimentType = {
    id: number;
    name: string;
    extra_info: string;
    plot_color: string;
};

export const patchExperimentByIdJS = async (
    patchExperiment: PatchExperimentType
): Promise<number> => {
    try {
        return await eel.patch_experiment_by_id(patchExperiment)();
    } catch (error) {
        console.error(error);
        toast.error("Não foi possível criar esse novo material.");
        return 0;
    }
};

export const deleteMaterialByIdJS = async (id: number): Promise<number> => {
    try {
        return await eel.delete_material_by_id(id)();
    } catch (error) {
        console.error(error);
        console.error(error);
        toast.error("Não foi possível deletar o Material de ID: " + id);
        return 0;
    }
};

export const deleteExperimentByIdJS = async (id: number): Promise<number> => {
    try {
        return await eel.delete_experiment_by_id(id)();
    } catch (error) {
        console.error(error);
        toast.error("Não foi possível deletar o Experimento de ID: " + id);
        return 0;
    }
};
