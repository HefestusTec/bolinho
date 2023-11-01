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

import React, { FunctionComponent, useContext, useState } from "react";
import GraphComponent from "../graphComponent/graphComponent";
import MaterialSelector from "./materialSelector/materialSelector";
import styleModule from "./mainPage.module.css";
import ExperimentsInspector from "./experimentsInspector/experimentsInspector";
import ConnectionComponent from "./ConnectionComponent/ConnectionComponent";
import ZoomComponent from "../zoomComponent/zoomComponent";

import {
    checkCanStartExperimentJS,
    startExperimentRoutineJS,
} from "../../api/backend-api";

//import GlobalConfigContext from "../../contexts/globalConfigContext";
import BigButton from "components/customSubComponents/BigButton/BigButton";
import { SelectedExperimentsContext } from "contexts/SelectedExperimentsContext";
import { IsConnectedContext } from "api/contexts/IsConnectedContext";
import { CurrentPageContext } from "api/contexts/CurrentPageContext";
import NewExperimentPopup from "components/NewExperimentPopup/NewExperimentPopup";
import useConfirm from "hooks/useConfirm";
import { FocusContext } from "api/contexts/FocusContex";

interface MainPageProps {}

const MainPage: FunctionComponent<MainPageProps> = () => {
    const [selectedExperiments, setSelectedExperiments] = useState<number[]>(
        []
    );
    const [isConnected] = useContext(IsConnectedContext);
    const [, setCurrentPage] = useContext(CurrentPageContext);
    const [, setFocus] = useContext(FocusContext);
    const [isCreateExperimentOpen, setIsCreateExperimentOpen] =
        useState<boolean>(false);
    const [ConfirmationDialog, confirm] = useConfirm("A máquina está calibrada?", "Por favor confirme que a máquina está calibrada para continuar!");
    
    const experimentWasCreated = (id: number) => {
        startExperimentRoutineJS(id).then((res) => {
            if (res === 1) setCurrentPage("experiment");
        });
    };

    const closeExperimentPopup = () => {
        setIsCreateExperimentOpen(false);
    };

    const startExperiment = async () => {
        confirm(async() =>{
            const canStart = await checkCanStartExperimentJS();
            if (!canStart) return;
            setIsCreateExperimentOpen(true);
        }, ()=>{
            setFocus("calib-page")
        } );
    };

    return (
        <SelectedExperimentsContext.Provider
            value={[selectedExperiments, setSelectedExperiments]}
        >
            <div className={styleModule.content}>
                <ZoomComponent
                    className={styleModule.graph_component}
                    scaleOrigin="top right"
                >
                    <GraphComponent />
                </ZoomComponent>
                <ZoomComponent
                    className={styleModule.material_selector}
                    scaleOrigin="top left"
                >
                    <MaterialSelector />
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
                    focusKey="connection-component"
                >
                    <ConnectionComponent />
                </ZoomComponent>
                <div className={styleModule.ensaio_button_div}>
                    <BigButton
                        clickCallBack={() => {
                            startExperiment();
                        }}
                        buttonText="ENSAIO"
                        bgColor="var(--positive_button_color)"
                        height="50%"
                        disabled={!isConnected}
                    />
                </div>
            </div>
            {isCreateExperimentOpen ? (
                <NewExperimentPopup
                    closePopup={closeExperimentPopup}
                    handleExperimentCreated={experimentWasCreated}
                />
            ) : (
                <></>
            )}
            <ConfirmationDialog />

        </SelectedExperimentsContext.Provider>
    );
};

export default MainPage;
