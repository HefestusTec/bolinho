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

import { FunctionComponent, useContext, useEffect, useState } from "react";
import CustomButtonArray from "components/customSubComponents/CustomButtonArray/CustomButtonArray";
import CustomButton from "components/customSubComponents/customButton/customButton";
import { deleteExperimentByIdJS, patchExperimentByIdJS } from "api/backend-api";
import { ExperimentType } from "types/DataBaseTypes";
import ContainerComponent from "components/containerComponent/containerComponent";
import { toast } from "react-toastify";
import { RefreshDataContext } from "api/contexts/RefreshContext";
import useRefresh from "hooks/useRefresh";
import useConfirm from "hooks/useConfirm";
import CustomTextArea from "components/customSubComponents/CustomTextArea/CustomTextArea";
import CustomTextAreaInput from "components/customSubComponents/CustomTextAreaInput/CustomTextAreaInput";

interface EditExperimentPopupProps {
    experiment: ExperimentType;
    closeTooltip?: () => void;
}

const EditExperimentPopup: FunctionComponent<EditExperimentPopupProps> = ({
    experiment,
    closeTooltip,
}) => {
    const [name, setName] = useState<string>(experiment.name);
    const [extraInfo, setExtraInfo] = useState<string>(experiment.extra_info);

    const [refreshData] = useContext(RefreshDataContext);
    const refresh = useRefresh();

    const [nameAlert, setNameAlert] = useState<boolean>(false);
    const [extraInfoAlert, setExtraInfoAlert] = useState<boolean>(false);
    const [ConfirmationDialog, confirm] = useConfirm();

    useEffect(() => {
        setNameAlert(name !== experiment.name);
        setExtraInfoAlert(extraInfo !== experiment.extra_info);
    }, [name, extraInfo, experiment, refreshData]);

    const saveExperiment = () => {
        patchExperimentByIdJS({
            id: experiment.id,
            name: name,
            extra_info: extraInfo,
        }).then((response) => {
            if (response) {
                toast.success("Experimento atualizado com sucesso");
                refresh();
                if (closeTooltip) closeTooltip();
                return;
            }
            toast.error("Não foi possível atualizar esse experimento");
        });
    };
    const deleteExperiment = () => {
        deleteExperimentByIdJS(experiment.id).then((response) => {
            if (response) {
                toast.success("Experimento deletado com sucesso");
                refresh();
                if (closeTooltip) closeTooltip();
                return;
            }
            toast.error("Não foi possível deletar esse experimento");
        });
    };

    return (
        <ContainerComponent
            headerText={"Editar experimento"}
            headerButton={
                <CustomButton
                    fontSize="var(--font_s)"
                    fontColor="var(--font_color_inverted)"
                    bgColor="var(--negative_button_color)"
                    clickCallBack={() => {
                        confirm(deleteExperiment);
                    }}
                    padding="5px"
                >
                    EXCLUIR
                </CustomButton>
            }
        >
            <CustomTextArea>
                <table>
                    <th>
                        <b>Dados do experimento:</b>
                    </th>
                    <th>
                        <br /> <br />
                    </th>
                    <tr>
                        <th>ID</th>
                        <th>{experiment.id}</th>
                    </tr>
                    <tr>
                        <th>Data</th>
                        <th>{experiment.date_time}</th>
                    </tr>
                    <tr>
                        <th>Tipo de exp.</th>
                        <th>
                            {experiment.compress ? "compressão" : "expansão"}
                        </th>
                    </tr>
                    <tr>
                        <th>Limite de perda de carga</th>
                        <th>{experiment.load_loss_limit.toFixed(2)} N</th>
                    </tr>
                    <tr>
                        <th>Carga máxima</th>
                        <th>{experiment.max_load.toFixed(2)} N</th>
                    </tr>
                    <tr>
                        <th>Distância máxima</th>
                        <th>{experiment.max_travel.toFixed(2)} mm</th>
                    </tr>
                    <tr>
                        <th>Velocidade do eixo-z</th>
                        <th>{experiment.z_axis_speed.toFixed(2)} mm/s</th>
                    </tr>
                    <tr>
                        <th>
                            <hr />
                        </th>
                        <th>
                            <br />
                        </th>
                    </tr>

                    <th>
                        <b>Dados do corpo:</b>
                    </th>
                    <th>
                        <br /> <br />
                    </th>
                    <tr>
                        <th>ID</th>
                        <th>{experiment.body.id}</th>
                    </tr>
                    <tr>
                        <th>Altura</th>
                        <th>{experiment.body.height.toFixed(2)} mm</th>
                    </tr>
                    <tr>
                        <th>Parâmetro A</th>
                        <th>{experiment.body.param_a} </th>
                    </tr>
                    <tr>
                        <th>Parâmetro B</th>
                        <th>{experiment.body.param_b}</th>
                    </tr>
                    <tr>
                        <th>Tipo</th>
                        <th>{experiment.body.type}</th>
                    </tr>
                </table>
            </CustomTextArea>
            <CustomTextAreaInput
                title="Nome"
                setValue={setName}
                value={name}
                inputType="text"
                suffix=""
                alert={nameAlert}
                alertColor="var(--positive_button_color)"
            />
            <CustomTextAreaInput
                title="Extra"
                setValue={setExtraInfo}
                value={extraInfo}
                inputType="text"
                suffix=""
                alert={extraInfoAlert}
                alertColor="var(--positive_button_color)"
            />
            <CustomButtonArray>
                <CustomButton
                    bgColor="var(--button_inactive_color)"
                    fontColor="var(--font_color)"
                    clickCallBack={() => {
                        if (closeTooltip) closeTooltip();
                    }}
                    width="50%"
                >
                    Cancelar
                </CustomButton>
                <CustomButton
                    bgColor="var(--positive_button_color)"
                    fontColor="var(--font_color_inverted)"
                    clickCallBack={() => {
                        confirm(saveExperiment);
                    }}
                    width="50%"
                >
                    Salvar
                </CustomButton>
            </CustomButtonArray>
            <ConfirmationDialog />
        </ContainerComponent>
    );
};

export default EditExperimentPopup;
