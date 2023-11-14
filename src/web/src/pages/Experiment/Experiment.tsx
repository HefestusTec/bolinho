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

import { FunctionComponent, useContext, useState } from "react";
import ExperimentSideBar from "./ExperimentSideBar/ExperimentSideBar";
import styleModule from "./Experiment.module.css";
import ZoomComponent from "components/zoomComponent/zoomComponent";
import ContainerComponent from "components/containerComponent/containerComponent";
import MainMonitor from "./MainMonitor/MainMonitor";
import { ExperimentPageContext } from "api/contexts/ExperimentPageContext";
import { ReadingsContext } from "api/contexts/ReadingsContext";
import ReadingsContainer from "components/ReadingsContainer/ReadingsContainer";
import GenerateDebugPoints from "components/GenerateDebugPoints/GenerateDebugPoints";
import MaterialTable from "components/InfoTables/MaterialTable";
import tableStyleModule from "components/InfoTables/MaterialTable.module.css";
import BodyTable from "components/InfoTables/BodyTable";
import ExperimentTable from "components/InfoTables/ExperimentTable";
import RealTimeGraph from "components/RealTimeGraph/RealTimeGraph";
import EndExperimentPrompt from "./EndExperimentPrompt/EndExperimentPrompt";

interface ExperimentProps {}

const Experiment: FunctionComponent<ExperimentProps> = () => {
    const [experimentPageContext] = useContext(ExperimentPageContext);
    const [readingsContext] = useContext(ReadingsContext);
    const [endPromptIsActive, setEndPromptIsActive] = useState<boolean>(false);

    if (
        experimentPageContext.experiment === null ||
        experimentPageContext.material === null
    )
        return <>Carregando...</>;

    return (
        <div className={styleModule.experiment_div}>
            <GenerateDebugPoints />
            <ExperimentSideBar
                experiment={experimentPageContext.experiment}
                readings={readingsContext}
            />
            <div className={styleModule.experiment_content}>
                <MainMonitor
                    className={styleModule.main_monitor}
                    scaleOrigin="top left"
                    currentLoad={readingsContext.current_load}
                    setEndPromptIsActive={setEndPromptIsActive}
                />
                <ZoomComponent
                    className={styleModule.graph_component}
                    scaleOrigin="top right"
                >
                    <RealTimeGraph
                        experiment={experimentPageContext.experiment}
                    />
                </ZoomComponent>
                <ZoomComponent
                    className={styleModule.parameters_component}
                    scaleOrigin="bottom left"
                >
                    <ContainerComponent headerText="Parâmetros do ensaio">
                        <div
                            className={tableStyleModule.content}
                            style={{ marginLeft: 10, marginBottom: 10 }}
                        >
                            <ExperimentTable
                                experiment={experimentPageContext.experiment}
                                hideTitle
                            />
                        </div>
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
                    <ContainerComponent headerText="Corpo de prova">
                        <div
                            className={tableStyleModule.content}
                            style={{ marginLeft: 10, marginBottom: 10 }}
                        >
                            <BodyTable
                                experiment={experimentPageContext.experiment}
                                hideTitle
                            />
                        </div>
                    </ContainerComponent>
                </ZoomComponent>
                <ZoomComponent
                    className={styleModule.material_component}
                    scaleOrigin="bottom right"
                >
                    <ContainerComponent headerText="Material">
                        <div
                            className={tableStyleModule.content}
                            style={{ marginLeft: 10, marginBottom: 10 }}
                        >
                            <MaterialTable
                                material={experimentPageContext.material}
                                hideTitle
                            />
                        </div>
                    </ContainerComponent>
                </ZoomComponent>
            </div>
            <EndExperimentPrompt
                isOpen={endPromptIsActive}
                setIsOpen={setEndPromptIsActive}
            />
        </div>
    );
};

export default Experiment;
