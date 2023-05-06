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

import React from "react";
//import styleModule from "./configPage.module.css";

import ZoomComponent from "../../zoomComponent/zoomComponent";
import ContainerComponent from "../../containerComponent/containerComponent";
//import GlobalConfigContext from "../../../contexts/globalConfigContext";
import ButtonGroup from "../../customSubComponents/buttonGroup/buttonGroup";
import CustomButton from "../../customSubComponents/customButton/customButton";
import CustomCheckbox from "../../customSubComponents/customCheckbox/customCheckbox";

export default function AnimationSelector({ className, scaleOrigin }) {
    //const [globalConfig, setGlobalConfig] = useContext(GlobalConfigContext);

    const clickCallBackUseAnimation = () => {
        console.log(123);
        //setCurrentActive(key);
        //setGlobalConfig({ ...globalConfig, theme: key });
    };

    return (
        <ZoomComponent className={className} scaleOrigin={scaleOrigin}>
            <ContainerComponent headerText="Animações">
                <CustomCheckbox clickCallBack={clickCallBackUseAnimation}>
                    Usar animações
                </CustomCheckbox>
                <CustomCheckbox>Animar gráfico</CustomCheckbox>
                <CustomCheckbox>Velocidade</CustomCheckbox>
                <CustomCheckbox>Velocidade</CustomCheckbox>
                <CustomCheckbox>Velocidade</CustomCheckbox>
            </ContainerComponent>
        </ZoomComponent>
    );
}
