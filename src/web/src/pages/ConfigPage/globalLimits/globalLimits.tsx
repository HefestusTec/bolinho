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

import React, {
    FunctionComponent,
    useContext,
    useEffect,
    useState,
} from "react";

import ZoomComponent from "../../../components/zoomComponent/zoomComponent";
import ContainerComponent from "../../../components/containerComponent/containerComponent";
import CustomTextInput from "components/customSubComponents/CustomTextInput/CustomTextInput";
import GlobalConfigContext from "contexts/globalConfigContext";
import CustomButtonArray from "components/customSubComponents/CustomButtonArray/CustomButtonArray";
import CustomButton from "components/customSubComponents/customButton/customButton";

interface GlobalLimitsProps {
    className?: string;
    scaleOrigin: string;
}

const GlobalLimits: FunctionComponent<GlobalLimitsProps> = ({
    className,
    scaleOrigin,
}) => {
    const [globalConfig, setGlobalConfig] = useContext(GlobalConfigContext);
    const [maxForce, setMaxForce] = useState<number>(
        globalConfig.absoluteMaximumForce
    );
    const [maxTime, setMaxTime] = useState<number>(
        globalConfig.absoluteMaximumTime
    );
    const [maxTravel, setMaxTravel] = useState<number>(
        globalConfig.absoluteMaximumTravel
    );

    const [maxForceAlert, setMaxForceAlert] = useState<boolean>(false);
    const [maxTimeAlert, setMaxTimeAlert] = useState<boolean>(false);
    const [maxTravelAlert, setMaxTravelAlert] = useState<boolean>(false);

    const refreshValues = () => {
        setMaxForce(globalConfig.absoluteMaximumForce);
        setMaxTime(globalConfig.absoluteMaximumTime);
        setMaxTravel(globalConfig.absoluteMaximumTravel);
    };
    const saveValues = () => {
        setGlobalConfig({
            ...globalConfig,
            absoluteMaximumForce: maxForce,
            absoluteMaximumTime: maxTime,
            absoluteMaximumTravel: maxTravel,
        });
    };

    useEffect(() => {
        setMaxForceAlert(maxForce !== globalConfig.absoluteMaximumForce);
        setMaxTimeAlert(maxTime !== globalConfig.absoluteMaximumTime);
        setMaxTravelAlert(maxTravel !== globalConfig.absoluteMaximumTravel);
    }, [globalConfig, maxForce, maxTime, maxTravel]);

    return (
        <ZoomComponent className={className} scaleOrigin={scaleOrigin}>
            <ContainerComponent headerText="Limites globais">
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
                    title="Força máxima"
                    setValue={setMaxForce}
                    value={maxForce}
                    inputType="number"
                    suffix="N"
                    alert={maxForceAlert}
                    alertColor="var(--positive_button_color)"
                />
                <CustomTextInput
                    title="Tempo máxima"
                    setValue={setMaxTime}
                    value={maxTime}
                    inputType="number"
                    suffix="s"
                    alert={maxTimeAlert}
                    alertColor="var(--positive_button_color)"
                />
                <CustomTextInput
                    title="Desloc. máximo"
                    setValue={setMaxTravel}
                    value={maxTravel}
                    inputType="number"
                    suffix="mm"
                    alert={maxTravelAlert}
                    alertColor="var(--positive_button_color)"
                />
            </ContainerComponent>
        </ZoomComponent>
    );
};

export default GlobalLimits;
