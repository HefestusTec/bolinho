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

import CustomButton from "components/customSubComponents/customButton/customButton";
import { Dispatch, FunctionComponent, SetStateAction } from "react";
import { PlotTypeType } from "types/PlotTypeType";
import styleModule from "./graphSideBar.module.css";

interface GraphSideBarProps {
    setPlotType: Dispatch<SetStateAction<PlotTypeType>>;
    plotType: PlotTypeType;

    setAutoZoom: Dispatch<SetStateAction<boolean>>;
    autoZoom: boolean;
}

const GraphSideBar: FunctionComponent<GraphSideBarProps> = ({
    setPlotType,
    plotType,
    setAutoZoom,
    autoZoom,
}) => {
    return (
        <div className={styleModule.side_bar_span}>
            <header className={styleModule.side_bar_header}>Opções</header>
            <div className={styleModule.side_bar_content}>
                <CustomButton
                    padding="5px"
                    clickCallBack={() => {
                        setPlotType("loadOverTime");
                    }}
                    width="100%"
                    outlined={plotType === "loadOverTime"}
                >
                    Carga x Tempo
                </CustomButton>
                <CustomButton
                    padding="5px"
                    clickCallBack={() => {
                        setPlotType("loadOverPosition");
                    }}
                    width="100%"
                    outlined={plotType === "loadOverPosition"}
                >
                    Carga x Posição
                </CustomButton>
                <CustomButton
                    padding="5px"
                    clickCallBack={() => {
                        setAutoZoom(true);
                    }}
                    width="100%"
                    outlined={autoZoom}
                >
                    Zoom automático
                </CustomButton>
            </div>
        </div>
    );
};

export default GraphSideBar;
