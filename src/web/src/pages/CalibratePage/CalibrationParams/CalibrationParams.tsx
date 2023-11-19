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

import ContainerComponent from "components/containerComponent/containerComponent";
import CustomButtonArray from "components/customSubComponents/CustomButtonArray/CustomButtonArray";
import CustomTextInput from "components/customSubComponents/CustomTextInput/CustomTextInput";
import CustomButton from "components/customSubComponents/customButton/customButton";
import GlobalConfigContext from "contexts/globalConfigContext";
import { FunctionComponent, useContext, useEffect, useState } from "react";

interface CalibrationParamsProps {}

const CalibrationParams: FunctionComponent<CalibrationParamsProps> = () => {
    const [globalConfig, setGlobalConfig] = useContext(GlobalConfigContext);
    const [zAxisLength, setZAxisLength] = useState<number>(
        globalConfig.zAxisLength
    );
    const [knownWeight, setKnownWeight] = useState<number>(
        globalConfig.knownWeight
    );
    const [mmPerRevolution, setMmPerRevolution] = useState<number>(
        globalConfig.mmPerRevolution
    );

    const [zAxisLengthAlert, setZAxisLengthAlert] = useState<boolean>(false);
    const [knownWeightAlert, setKnownWeightAlert] = useState<boolean>(false);
    const [mmPerRevolutionAlert, setMmPerRevolutionAlert] =
        useState<boolean>(false);

    const refreshValues = () => {
        setZAxisLength(globalConfig.zAxisLength);
        setKnownWeight(globalConfig.knownWeight);
        setMmPerRevolution(globalConfig.mmPerRevolution);
    };
    const saveValues = () => {
        setGlobalConfig({
            ...globalConfig,
            zAxisLength: zAxisLength,
            knownWeight: knownWeight,
            mmPerRevolution: mmPerRevolution,
        });
    };

    useEffect(() => {
        setZAxisLengthAlert(zAxisLength !== globalConfig.zAxisLength);
        setKnownWeightAlert(knownWeight !== globalConfig.knownWeight);
        setMmPerRevolutionAlert(
            mmPerRevolution !== globalConfig.mmPerRevolution
        );
    }, [globalConfig, zAxisLength, knownWeight, mmPerRevolution]);

    return (
        <ContainerComponent headerText="Parâmetros de calibração">
            <CustomButtonArray>
                <CustomButton
                    bgColor="var(--positive_button_color)"
                    fontColor="var(--font_color_inverted)"
                    clickCallBack={saveValues}
                    width="45%"
                >
                    Salvar
                </CustomButton>
                <CustomButton
                    bgColor="var(--warning_button_color)"
                    fontColor="var(--font_color)"
                    clickCallBack={refreshValues}
                    width="45%"
                >
                    Carregar
                </CustomButton>
            </CustomButtonArray>
            <CustomTextInput
                title="Peso padrão"
                setValue={setKnownWeight}
                value={knownWeight}
                inputType="number"
                suffix="g"
                alert={knownWeightAlert}
                alertColor="var(--positive_button_color)"
            />
            <CustomTextInput
                title="Tamanho do eixo Z"
                setValue={setZAxisLength}
                value={zAxisLength}
                inputType="number"
                suffix="mm"
                alert={zAxisLengthAlert}
                alertColor="var(--positive_button_color)"
            />

            <CustomTextInput
                title="mm por revolução"
                setValue={setMmPerRevolution}
                value={mmPerRevolution}
                inputType="number"
                alert={mmPerRevolutionAlert}
                alertColor="var(--positive_button_color)"
            />
        </ContainerComponent>
    );
};

export default CalibrationParams;
