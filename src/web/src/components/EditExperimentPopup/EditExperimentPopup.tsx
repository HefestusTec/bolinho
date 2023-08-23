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
import CustomTextInput from "components/customSubComponents/CustomTextInput/CustomTextInput";
import CustomButton from "components/customSubComponents/customButton/customButton";
import { deleteExperimentByIdJS, patchExperimentByIdJS } from "api/backend-api";
import { ExperimentType } from "types/DataBaseTypes";
import ContainerComponent from "components/containerComponent/containerComponent";
import { toast } from "react-toastify";
import { RefreshDataContext } from "api/contexts/RefreshContext";
import useRefresh from "hooks/useRefresh";

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
                    clickCallBack={deleteExperiment}
                    padding="5px"
                >
                    EXCLUIR
                </CustomButton>
            }
        >
            <CustomTextInput
                title="Nome"
                setValue={setName}
                value={name}
                inputType="text"
                suffix=""
                alert={nameAlert}
                alertColor="var(--positive_button_color)"
            />
            <CustomTextInput
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
                    clickCallBack={saveExperiment}
                    width="50%"
                >
                    Salvar
                </CustomButton>
            </CustomButtonArray>
        </ContainerComponent>
    );
};

export default EditExperimentPopup;
