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

import { endExperimentRoutineJS } from "api/backend-api";
import useSaveProgress from "api/hooks/useSaveProgress";
import BackgroundFader from "components/backgroundFader/backgroundFader";
import ContainerComponent from "components/containerComponent/containerComponent";
import CustomButtonArray from "components/customSubComponents/CustomButtonArray/CustomButtonArray";
import CustomText from "components/customSubComponents/CustomText/CustomText";
import CustomButton from "components/customSubComponents/customButton/customButton";
import { Dispatch, FunctionComponent, SetStateAction, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";

interface EndExperimentPromptProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const EndExperimentPrompt: FunctionComponent<EndExperimentPromptProps> = ({
    isOpen,
    setIsOpen,
}) => {
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [savingPercentage] = useSaveProgress();
    const handleClose = () => {
        setIsOpen(false);
    };

    const handleConfirm = async () => {
        await endExperimentRoutineJS();
        setIsSaving(true);
    };

    const handleCancel = () => {
        handleClose();
    };

    if (!isOpen) return <></>;
    return (
        <>
            <BackgroundFader
                callbackFunc={() => {
                    if (!isSaving) handleCancel();
                }}
                faderIndex={2}
            />
            <div
                style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "300px",
                    zIndex: 2,
                }}
            >
                {isSaving ? (
                    <ContainerComponent headerText={"Guardando experimento..."}>
                        <CustomText
                            value={"Gravando dados ao banco de dados aguarde!"}
                        />
                        <CircularProgressbar
                            value={savingPercentage}
                            text={`${savingPercentage}%`}
                        />
                    </ContainerComponent>
                ) : (
                    <ContainerComponent headerText={"Encerrar experimento"}>
                        <CustomText
                            value={"ATENÇÃO essa ação não poderá ser revertida"}
                        />
                        <CustomButtonArray>
                            <CustomButton
                                bgColor="var(--button_inactive_color)"
                                fontColor="var(--font_color)"
                                clickCallBack={handleCancel}
                                width="50%"
                            >
                                Cancelar
                            </CustomButton>
                            <CustomButton
                                bgColor="var(--positive_button_color)"
                                fontColor="var(--font_color_inverted)"
                                clickCallBack={handleConfirm}
                                width="50%"
                            >
                                Confirmar
                            </CustomButton>
                        </CustomButtonArray>
                    </ContainerComponent>
                )}
            </div>
        </>
    );
};

export default EndExperimentPrompt;
