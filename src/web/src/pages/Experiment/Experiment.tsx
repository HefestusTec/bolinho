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

import { FunctionComponent, useContext } from "react";
import ExperimentSideBar from "./ExperimentSideBar/ExperimentSideBar";
import styleModule from "./Experiment.module.css";
import ZoomComponent from "components/zoomComponent/zoomComponent";
import GraphComponent from "components/graphComponent/graphComponent";
import ContainerComponent from "components/containerComponent/containerComponent";
import MainMonitor from "./MainMonitor/MainMonitor";
import CustomText from "components/customSubComponents/CustomText/CustomText";
import { ExperimentPageContext } from "api/contexts/ExperimentPageContext";
import { ReadingsContext } from "api/contexts/ReadingsContext";
import ReadingsContainer from "components/ReadingsContainer/ReadingsContainer";

interface ExperimentProps {}

const Experiment: FunctionComponent<ExperimentProps> = () => {
    const [experimentPageContext] = useContext(ExperimentPageContext);
    const [readingsContext] = useContext(ReadingsContext);
    return (
        <div className={styleModule.experiment_div}>
            <ExperimentSideBar />
            <div className={styleModule.experiment_content}>
                <MainMonitor
                    className={styleModule.main_monitor}
                    scaleOrigin="top left"
                    currentLoad={readingsContext.current_load}
                />
                <ZoomComponent
                    className={styleModule.graph_component}
                    scaleOrigin="top right"
                >
                    <GraphComponent experimentList={[]} />
                </ZoomComponent>
                <ZoomComponent
                    className={styleModule.parameters_component}
                    scaleOrigin="bottom left"
                >
                    <ContainerComponent headerText="Parâmetros do ensaio">
                        <p>{experimentPageContext.experimentParameters} </p>
                    </ContainerComponent>
                </ZoomComponent>
                <ReadingsContainer
                    className={styleModule.readings_component}
                    scaleOrigin="bottom left"
                />
                <ZoomComponent
                    className={styleModule.experiment_component}
                    scaleOrigin="bottom right"
                >
                    <ContainerComponent headerText="Descrição">
                        <p>{experimentPageContext.description} </p>
                    </ContainerComponent>
                </ZoomComponent>
                <ZoomComponent
                    className={styleModule.material_component}
                    scaleOrigin="bottom right"
                >
                    <ContainerComponent headerText="Material">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Nullam malesuada.
                        </p>
                    </ContainerComponent>
                </ZoomComponent>
            </div>
        </div>
    );
};

export default Experiment;
