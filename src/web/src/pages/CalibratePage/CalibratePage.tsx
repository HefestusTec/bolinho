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

import ReadingsContainer from "components/ReadingsContainer/ReadingsContainer";
import ZoomComponent from "components/zoomComponent/zoomComponent";
import React, { CSSProperties } from "react";
import { FunctionComponent } from "react";
import BigButton from "components/customSubComponents/BigButton/BigButton";
import {
    calibrateKnownWeightJS,
    calibrateZAxisJS,
    stopZAxisJS,
    tareLoadJs,
} from "api/backend-api";
import { MovementDistanceProvider } from "contexts/MovementDistanceContext";
import ContainerComponent from "components/containerComponent/containerComponent";
import CustomButtonArray from "components/customSubComponents/CustomButtonArray/CustomButtonArray";
import CustomButton from "components/customSubComponents/customButton/customButton";
import CalibrationParams from "./CalibrationParams/CalibrationParams";

interface CalibratePageProps {}

const CalibratePage: FunctionComponent<CalibratePageProps> = () => {
    const calibrateCommandsStyle: CSSProperties = {
        gridColumn: "span 6",
        gridRow: "span 7",
        order: 0,
    };
    const readingsContainerStyle: CSSProperties = {
        gridColumn: "span 6",
        gridRow: "span 7",
        order: 1,
    };
    const calibrationParamsStyle: CSSProperties = {
        gridColumn: "span 6",
        gridRow: "span 7",
        order: 2,
    };
    const bigButtonContainerStyle: CSSProperties = {
        gridColumn: "span 6",
        gridRow: "span 7",
        order: 3,
    };
    return (
        <MovementDistanceProvider>
            <ZoomComponent
                style={calibrateCommandsStyle}
                scaleOrigin="top left"
            >
                <ContainerComponent headerText="Comandos">
                    <CustomButtonArray>
                        <CustomButton
                            bgColor="var(--content_background_color)"
                            fontColor="var(--font_color)"
                            clickCallBack={() => {
                                tareLoadJs();
                            }}
                            width="90%"
                        >
                            Tarar carga
                        </CustomButton>
                    </CustomButtonArray>
                    <CustomButtonArray>
                        <CustomButton
                            bgColor="var(--content_background_color)"
                            fontColor="var(--font_color)"
                            clickCallBack={() => {
                                calibrateKnownWeightJS();
                            }}
                            width="90%"
                        >
                            Calibrar peso padrão
                        </CustomButton>
                    </CustomButtonArray>
                    <CustomButtonArray>
                        <CustomButton
                            bgColor="var(--content_background_color)"
                            fontColor="var(--font_color)"
                            clickCallBack={() => {
                                calibrateZAxisJS();
                            }}
                            width="90%"
                        >
                            Calibrar Eixo-z
                        </CustomButton>
                    </CustomButtonArray>
                </ContainerComponent>
            </ZoomComponent>
            <ReadingsContainer
                style={readingsContainerStyle}
                scaleOrigin="top right"
            />
            <ZoomComponent
                style={calibrationParamsStyle}
                scaleOrigin="bottom left"
            >
                <CalibrationParams />
            </ZoomComponent>
            <div style={bigButtonContainerStyle}>
                <BigButton
                    clickCallBack={stopZAxisJS}
                    buttonText="PARAR"
                    bgColor="var(--negative_button_color)"
                    fontSize="var(--font_l)"
                    height="50%"
                />
            </div>
        </MovementDistanceProvider>
    );
};

export default CalibratePage;
