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

import React, { useState } from "react";
import GraphComponent from "../graphComponent/graphComponent";
import MaterialSelector from "./materialSelector/materialSelector";
import styleModule from "./mainPage.module.css";
import ExperimentsInspector from "./experimentsInspector/experimentsInspector";
import ExtraOptions from "./extraOptions/extraOptions";
import ZoomComponent from "../zoomComponent/zoomComponent";

import { startExperimentRoutineJS } from "../../api/backend-api";

//import GlobalConfigContext from "../../contexts/globalConfigContext";
import SelectedObjectsContext from "./contexts/selectedObjectsContext";
import BigButton from "components/customSubComponents/BigButton/BigButton";

export default function MainPage({ materialList }) {
    //const [graphData, setGraphData] = useState(makeConstData());
    //const [globalConfig, setGlobalConfig] = useContext(GlobalConfigContext);

    const [selectedObjectList, setSelectedObjectList] = useState([]);

    return (
        <SelectedObjectsContext.Provider
            value={[selectedObjectList, setSelectedObjectList]}
        >
            <div className={styleModule.content}>
                <ZoomComponent
                    className={styleModule.graph_component}
                    scaleOrigin="top right"
                >
                    <GraphComponent experimentList={selectedObjectList} />
                </ZoomComponent>
                <ZoomComponent
                    className={styleModule.material_selector}
                    scaleOrigin="top left"
                >
                    <MaterialSelector materialList={materialList} />
                </ZoomComponent>
                <ZoomComponent
                    className={styleModule.experiments_inspector}
                    scaleOrigin="bottom left"
                >
                    <ExperimentsInspector />
                </ZoomComponent>
                <ZoomComponent
                    className={styleModule.extra_options}
                    scaleOrigin="bottom"
                >
                    <ExtraOptions />
                </ZoomComponent>
                <div className={styleModule.ensaio_button_div}>
                    <BigButton
                        clickCallBack={startExperimentRoutineJS}
                        buttonText="ENSAIO"
                        bgColor="var(--positive_button_color)"
                        height="50%"
                    />
                </div>
            </div>
        </SelectedObjectsContext.Provider>
    );
}
