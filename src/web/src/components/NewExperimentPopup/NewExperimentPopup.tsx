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
import { postExperimentJS } from "api/backend-api";

import ContainerComponent from "components/containerComponent/containerComponent";
import useRefresh from "hooks/useRefresh";
import useConfirm from "hooks/useConfirm";
import CustomTextAreaInput from "components/customSubComponents/CustomTextAreaInput/CustomTextAreaInput";
import React from "react";
import BackgroundFader from "components/backgroundFader/backgroundFader";
import CustomTextArea from "components/customSubComponents/CustomTextArea/CustomTextArea";
import CustomListSelector from "components/customSubComponents/customListSelector/customListSelector";
import CustomTextInput from "components/customSubComponents/CustomTextInput/CustomTextInput";
import { ValidBodyTypeType, validBodyTypeArray } from "types/ValidBodyTypeType";
import CustomFilteredListSelector, {
    CustomFilteredListKeyType,
} from "components/customSubComponents/CustomFilteredListSelector/CustomFilteredListSelector";
import { MaterialType } from "types/DataBaseTypes";
import { getMaterialsDB } from "api/db-api";
import { RefreshDataContext } from "api/contexts/RefreshContext";
import { toast } from "react-toastify";

type validExperimentType = "Compressão" | "Expansão";

interface NewExperimentPopupProps {
    handleExperimentCreated: (id: number) => void;
    closePopup: () => void;
}

const NewExperimentPopup: FunctionComponent<NewExperimentPopupProps> = ({
    handleExperimentCreated,
    closePopup,
}) => {
    const [bodyType, setBodyType] = useState<ValidBodyTypeType>("Retangular");
    const [selectedMaterialId, setSelectedMaterialID] = useState<number>(-1);
    const [bodyParamA, setBodyParamA] = useState<number>(0);
    const [bodyParamB, setBodyParamB] = useState<number>(0);
    const [bodyHeight, setBodyHeight] = useState<number>(0);
    const [bodyExtraInfo, setBodyExtraInfo] = useState<string>(
        "Sem informações extras"
    );

    const [experimentName, setExperimentName] =
        useState<string>("Meu experimento");
    const [experimentLoadLossLimit, setExperimentLoadLossLimit] =
        useState<number>(1);
    const [experimentMaxLoad, setExperimentMaxLoad] = useState<number>(1);
    const [experimentMaxTravel, setExperimentMaxTravel] = useState<number>(1);
    const [experimentMaxTime, setExperimentMaxTime] = useState<number>(1);
    const [experimentZAxisSpeed, setExperimentZAxisSpeed] = useState<number>(1);
    const [experimentType, setExperimentType] =
        useState<validExperimentType>("Compressão");
    const [experimentExtraInfo, setExperimentExtraInfo] = useState<string>(
        "Sem informações extras"
    );
    const [refreshData] = useContext(RefreshDataContext);
    const [materialList, setMaterialList] = useState<MaterialType[]>([]);

    useEffect(() => {
        getMaterialsDB().then((response) => {
            setMaterialList(response);
        });
    }, [refreshData]);

    const [ConfirmationDialog, confirm] = useConfirm();
    const refresh = useRefresh();

    const postExperiment = () => {
        const bodyTypeAsNumber = (() => {
            switch (bodyType) {
                case "Retangular":
                    return 1;
                case "Cilíndrico":
                    return 2;
                case "Tubo":
                    return 3;
                case "Outro":
                    return 4;
                default:
                    return 1;
            }
        })();
        if (!materialList.some((el) => el.id === selectedMaterialId)) {
            toast.error("Material inválido");
            return;
        }
        const isCompressionExperiment = experimentType === "Compressão";
        postExperimentJS({
            body: {
                type: bodyTypeAsNumber,
                material_id: selectedMaterialId,
                param_a: bodyParamA,
                param_b: bodyParamB,
                height: bodyHeight,
                extra_info: bodyExtraInfo,
            },
            experiment: {
                name: experimentName,
                load_loss_limit: experimentLoadLossLimit,
                max_load: experimentMaxLoad,
                max_travel: experimentMaxTravel,
                max_time: experimentMaxTime,
                compress: isCompressionExperiment,
                z_axis_speed: experimentZAxisSpeed,
                extra_info: experimentExtraInfo,
                plot_color: "#0072FF",
            },
        }).then((id) => {
            refresh();
            handleExperimentCreated(id);
        });
    };

    const makeKeys = (): CustomFilteredListKeyType[] => {
        return materialList.map((element) => ({
            title: `[${element.id}] ${element.name}`,
            key: element.id,
        }));
    };

    const paramALabel: string = (() => {
        switch (bodyType) {
            case "Retangular":
                return "Comprimento";
            case "Cilíndrico":
                return "Diam. Externo";
            case "Tubo":
                return "Diam. Externo";
            case "Outro":
                return "Parâmetro A";
            default:
                return "Parâmetro A";
        }
    })();

    const paramBLabel: string = (() => {
        switch (bodyType) {
            case "Retangular":
                return "Profundidade";
            case "Cilíndrico":
                return "N/A";
            case "Tubo":
                return "Diam. Interno";
            case "Outro":
                return "Parâmetro B";
            default:
                return "Parâmetro B";
        }
    })();

    return (
        <React.Fragment>
            <BackgroundFader
                callbackFunc={() => {
                    closePopup();
                }}
                faderIndex={2}
            />
            <div
                style={{
                    position: "absolute",
                    right: "10px",
                    top: "10px",
                    bottom: "10px",
                    width: "65%",
                    zIndex: 2,
                }}
            >
                <ContainerComponent
                    headerText={"Novo experimento"}
                    containerContentStyle={{
                        paddingRight: 0,
                        maxHeight: "100%",
                    }}
                >
                    <span style={{ display: "flex" }}>
                        <CustomTextArea
                            defaultIsOpen={true}
                            title="Experimento"
                        >
                            <CustomTextAreaInput
                                title="Nome"
                                setValue={setExperimentName}
                                value={experimentName}
                                inputType="text"
                                suffix=""
                                alert={false}
                                alertColor="var(--positive_button_color)"
                            />
                            <CustomTextInput
                                title="Limite de perca de carga"
                                setValue={setExperimentLoadLossLimit}
                                value={experimentLoadLossLimit}
                                inputType="number"
                                suffix="N/s"
                                alert={false}
                                alertColor="var(--positive_button_color)"
                            />
                            <CustomTextInput
                                title="Limite de carga"
                                setValue={setExperimentMaxLoad}
                                value={experimentMaxLoad}
                                inputType="number"
                                suffix="N"
                                alert={false}
                                alertColor="var(--positive_button_color)"
                            />
                            <CustomTextInput
                                title="Limite de distância"
                                setValue={setExperimentMaxTravel}
                                value={experimentMaxTravel}
                                inputType="number"
                                suffix="mm"
                                alert={false}
                                alertColor="var(--positive_button_color)"
                            />
                            <CustomTextInput
                                title="Limite de tempo"
                                setValue={setExperimentMaxTime}
                                value={experimentMaxTime}
                                inputType="number"
                                suffix="s"
                                alert={false}
                                alertColor="var(--positive_button_color)"
                            />
                            <CustomTextInput
                                title="Velocidade do eixo-Z"
                                setValue={setExperimentZAxisSpeed}
                                value={experimentZAxisSpeed}
                                inputType="number"
                                suffix="RPM"
                                alert={false}
                                alertColor="var(--positive_button_color)"
                            />

                            <CustomListSelector
                                keys={
                                    [
                                        "Compressão",
                                        "Expansão",
                                    ] as validExperimentType[]
                                }
                                clickCallBack={(key) => {
                                    setExperimentType(
                                        key as validExperimentType
                                    );
                                }}
                                selected={experimentType}
                            >
                                Tipo de experimento
                            </CustomListSelector>
                            <CustomTextAreaInput
                                title="Extra"
                                setValue={setExperimentExtraInfo}
                                value={experimentExtraInfo}
                                inputType="text"
                                suffix=""
                                alert={false}
                                alertColor="var(--positive_button_color)"
                            />
                        </CustomTextArea>
                        <CustomTextArea
                            defaultIsOpen={true}
                            title="Corpo de prova"
                        >
                            <CustomListSelector
                                keys={validBodyTypeArray}
                                clickCallBack={(key) => {
                                    setBodyType(key as ValidBodyTypeType);
                                }}
                                selected={bodyType}
                            >
                                Tipo
                            </CustomListSelector>
                            <CustomFilteredListSelector
                                setSelectedKey={setSelectedMaterialID}
                                keys={makeKeys()}
                                alertColor="var(--positive_button_color)"
                            >
                                Material
                            </CustomFilteredListSelector>
                            <CustomTextInput
                                title={paramALabel}
                                setValue={setBodyParamA}
                                value={bodyParamA}
                                inputType="number"
                                suffix="mm"
                                alert={false}
                                alertColor="var(--positive_button_color)"
                            />
                            <CustomTextInput
                                title={paramBLabel}
                                setValue={setBodyParamB}
                                value={bodyParamB}
                                inputType="number"
                                suffix="mm"
                                alert={false}
                                alertColor="var(--positive_button_color)"
                            />
                            <CustomTextInput
                                title="Altura"
                                setValue={setBodyHeight}
                                value={bodyHeight}
                                inputType="number"
                                suffix="mm"
                                alert={false}
                                alertColor="var(--positive_button_color)"
                            />
                            <CustomTextAreaInput
                                title="Extra"
                                setValue={setBodyExtraInfo}
                                value={bodyExtraInfo}
                                inputType="text"
                                suffix=""
                                alert={false}
                                alertColor="var(--positive_button_color)"
                            />
                        </CustomTextArea>
                    </span>

                    <CustomButtonArray>
                        <CustomButton
                            bgColor="var(--button_inactive_color)"
                            fontColor="var(--font_color)"
                            clickCallBack={() => {
                                if (closePopup) closePopup();
                            }}
                            width="50%"
                        >
                            Cancelar
                        </CustomButton>
                        <CustomButton
                            bgColor="var(--positive_button_color)"
                            fontColor="var(--font_color_inverted)"
                            clickCallBack={() => {
                                confirm(postExperiment);
                            }}
                            width="50%"
                        >
                            Criar e iniciar
                        </CustomButton>
                    </CustomButtonArray>
                    <ConfirmationDialog />
                </ContainerComponent>
            </div>
        </React.Fragment>
    );
};

export default NewExperimentPopup;
