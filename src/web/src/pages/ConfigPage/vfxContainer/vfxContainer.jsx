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

import ZoomComponent from "../../../components/zoomComponent/zoomComponent";
import ContainerComponent from "../../../components/containerComponent/containerComponent";
import GlobalConfigContext from "../../../contexts/globalConfigContext";
import CustomCheckbox from "../../../components/customSubComponents/customCheckbox/customCheckbox";
import CustomListSelector from "../../../components/customSubComponents/customListSelector/customListSelector";

export default function VfxContainer({ className, scaleOrigin }) {
    const [globalConfig, setGlobalConfig] = useContext(GlobalConfigContext);

    // const [backgroundBlur, setBackgroundBlur] = useState(
    //     globalConfig.backgroundBlur
    // );
    const [shadows, setShadows] = useState(globalConfig.shadows);
    const [enableHover, setEnableHover] = useState(globalConfig.enableHover);
    // const toggleBackgroundBlur = () => {
    //     setBackgroundBlur(!backgroundBlur);
    //     setGlobalConfig({ ...globalConfig, backgroundBlur: !backgroundBlur });
    // };

    const animationListCallback = (key) => {
        setGlobalConfig({ ...globalConfig, animationSpeed: key });
    };

    const toggleShadows = () => {
        setShadows(!shadows);
        setGlobalConfig({ ...globalConfig, shadows: !shadows });
    };
    const toggleHover = () => {
        const newHover = enableHover === "enable" ? "disable" : "enable";
        setEnableHover(newHover);
        setGlobalConfig({ ...globalConfig, enableHover: newHover });
    };
    const getHoverCheck = () => {
        if (enableHover === "enable") return true;
        return false;
    };
    return (
        <ZoomComponent className={className} scaleOrigin={scaleOrigin}>
            <ContainerComponent headerText="Efeitos visuais">
                {/* <CustomCheckbox
                        clickCallBack={toggleBackgroundBlur}
                        checked={backgroundBlur}
                    >
                        Desfocar fundo
                    </CustomCheckbox> */}
                <CustomCheckbox clickCallBack={toggleShadows} checked={shadows}>
                    Sombras
                </CustomCheckbox>
                <CustomListSelector
                    keys={["Rápido", "Normal", "Desligado"]}
                    clickCallBack={animationListCallback}
                    selected={globalConfig.animationSpeed}
                >
                    Animações
                </CustomListSelector>
                <CustomCheckbox
                    clickCallBack={toggleHover}
                    checked={getHoverCheck()}
                >
                    Indicador de seleção
                </CustomCheckbox>
            </ContainerComponent>
        </ZoomComponent>
    );
}
