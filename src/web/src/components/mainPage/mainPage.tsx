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

import BigButton from "components/customSubComponents/BigButton/BigButton";
import { IsConnectedContext } from "api/contexts/IsConnectedContext";
import NewExperimentPopup from "components/NewExperimentPopup/NewExperimentPopup";
import useConfirm from "hooks/useConfirm";
import { FocusContext } from "api/contexts/FocusContex";
import { ExperimentPageContext } from "api/contexts/ExperimentPageContext";
import { getExperimentById } from "api/db-api";

interface MainPageProps {}

const MainPage: FunctionComponent<MainPageProps> = () => {
    const [isConnected] = useContext(IsConnectedContext);
    const [, setFocus] = useContext(FocusContext);
    const [isCreateExperimentOpen, setIsCreateExperimentOpen] =
        useState<boolean>(false);
    const [ConfirmationDialog, confirm] = useConfirm(
        "A máquina está calibrada?",
        "Confirme que a máquina está calibrada!"
    );
    const [, setExperimentPageContext] = useContext(ExperimentPageContext);

    const experimentWasCreated = (id: number) => {
        startExperimentRoutineJS(id).then(async (res) => {
            if (res === 1) {
                const exp = await getExperimentById(id);
                if (exp === undefined) return;

                setExperimentPageContext((o) => {
                    return {
                        ...o,
                        material: exp.body.material,
                        experiment: exp,
                    };
                });
            }
        });
    };

    const closeExperimentPopup = () => {
        setIsCreateExperimentOpen(false);
    };

    const startExperiment = async () => {
        confirm(
            async () => {
                const canStart = await checkCanStartExperimentJS();
                if (!canStart) return;
                setIsCreateExperimentOpen(true);
            },
            () => {
                setFocus("calib-page");
            }
        );
    };

    return (
        <>
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
        </>
    );
};

export default MainPage;
