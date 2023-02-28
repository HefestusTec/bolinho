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

import { useContext, useState } from "react";
import styleModule from "./configPage.module.css";

import ZoomComponent from "../zoomComponent/zoomComponent";
import ContainerComponent from "../containerComponent/containerComponent";
import GlobalConfigContext from "../../contexts/globalConfigContext";
import ButtonGroup from "../customSubComponents/buttonGroup/buttonGroup";
import CustomButton from "../customSubComponents/customButton/customButton";

export default function ConfigPage() {
    const [globalConfig, setGlobalConfig] = useContext(GlobalConfigContext);
    const [currentActive, setCurrentActive] = useState(globalConfig.theme);

    const clickCallBack = (key) => {
        setCurrentActive(key);
        setGlobalConfig({ ...globalConfig, theme: key });
    };

    return (
        <ZoomComponent
            className={styleModule.theme_selector}
            scaleOrigin="top left"
        >
            <ContainerComponent headerText="Temas">
                <ButtonGroup
                    currentActive={currentActive}
                    clickCallBack={clickCallBack}
                >
                    <CustomButton
                        key={"Claro"}
                        buttonKey={"Claro"}
                        color={"white"}
                        iconSize="var(--font_s)"
                        className=""
                    >
                        Claro
                    </CustomButton>
                    <CustomButton
                        key={"Escuro"}
                        buttonKey={"Escuro"}
                        color={"white"}
                        iconSize="var(--font_s)"
                        className=""
                    >
                        Escuro
                    </CustomButton>
                    <CustomButton
                        key={"PlaceHolder"}
                        buttonKey={"PlaceHolder"}
                        color={"white"}
                        iconSize="var(--font_s)"
                        className=""
                    >
                        PlaceHolder
                    </CustomButton>

                    <CustomButton
                        key={"PlaceHolder2"}
                        buttonKey={"PlaceHolder2"}
                        color={"white"}
                        iconSize="var(--font_s)"
                        className=""
                    >
                        PlaceHolder2
                    </CustomButton>
                </ButtonGroup>
            </ContainerComponent>
        </ZoomComponent>
    );
}
