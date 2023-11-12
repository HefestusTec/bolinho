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

import React, { FunctionComponent, useContext } from "react";

import ZoomComponent from "../../../components/zoomComponent/zoomComponent";
import ContainerComponent from "../../../components/containerComponent/containerComponent";
import GlobalConfigContext from "../../../contexts/globalConfigContext";
import CustomListSelector from "../../../components/customSubComponents/customListSelector/customListSelector";
import { FontSizeType, NumOfDataPointsType } from "api/apiTypes";

interface OtherSelectorProps {
    className?: string;
    scaleOrigin: string;
}

const OtherSelector: FunctionComponent<OtherSelectorProps> = ({
    className,
    scaleOrigin,
}) => {
    const [globalConfig, setGlobalConfig] = useContext(GlobalConfigContext);

    const fontSizeCallback = (key: string) => {
        setGlobalConfig({ ...globalConfig, fontSize: key as FontSizeType });
    };

    const setNumOfDataPoints = (key: string) => {
        setGlobalConfig({
            ...globalConfig,
            numOfDataPointsPerExp: key as NumOfDataPointsType,
        });
    };
    return (
        <ZoomComponent className={className} scaleOrigin={scaleOrigin}>
            <ContainerComponent headerText="Outros">
                <CustomListSelector
                    keys={
                        [
                            "50%",
                            "75%",
                            "100%",
                            "125%",
                            "150%",
                            "200%",
                        ] as FontSizeType[]
                    }
                    clickCallBack={fontSizeCallback}
                    selected={globalConfig.fontSize}
                >
                    Texto
                </CustomListSelector>

                <CustomListSelector
                    keys={
                        [
                            "500",
                            "1k",
                            "10k",
                            "25k",
                            "50k",
                        ] as NumOfDataPointsType[]
                    }
                    clickCallBack={setNumOfDataPoints}
                    selected={globalConfig.numOfDataPointsPerExp}
                >
                    Pontos visíveis
                </CustomListSelector>
            </ContainerComponent>
        </ZoomComponent>
    );
};

export default OtherSelector;
