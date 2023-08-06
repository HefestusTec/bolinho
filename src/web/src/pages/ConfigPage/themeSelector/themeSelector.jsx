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

import React, { useContext, useState } from "react";

import ZoomComponent from "../../../components/zoomComponent/zoomComponent";
import ContainerComponent from "../../../components/containerComponent/containerComponent";
import GlobalConfigContext from "../../../contexts/globalConfigContext";
import ButtonGroup from "../../../components/customSubComponents/buttonGroup/buttonGroup";

export default function ThemeSelector({ className, scaleOrigin }) {
    const [globalConfig, setGlobalConfig] = useContext(GlobalConfigContext);
    const [currentActive, setCurrentActive] = useState(globalConfig.theme);

    const themes = ["Claro", "Escuro", "Meia Noite"];

    const clickCallBack = (key) => {
        setCurrentActive(key);
        setGlobalConfig({ ...globalConfig, theme: key });
    };

    return (
        <ZoomComponent className={className} scaleOrigin={scaleOrigin}>
            <ContainerComponent headerText="Temas">
                <ButtonGroup
                    currentActive={currentActive}
                    clickCallBack={clickCallBack}
                    options={themes}
                />
            </ContainerComponent>
        </ZoomComponent>
    );
}
