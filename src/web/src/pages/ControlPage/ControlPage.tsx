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
import CommandsComponent from "./CommandsComponent/CommandsComponent";
import BigButton from "components/customSubComponents/BigButton/BigButton";
import UpDownButtons from "./UpDownButtons/UpDownButtons";

interface ControlPageProps {}

const ControlPage: FunctionComponent<ControlPageProps> = () => {
    const commandsContainerStyle: CSSProperties = {
        gridColumn: "span 6",
        gridRow: "span 7",
        order: 0,
    };
    const upDownContainerStyle: CSSProperties = {
        gridColumn: "span 6",
        gridRow: "span 10",
        order: 1,
        backgroundColor: "red",
    };
    const readingsContainerStyle: CSSProperties = {
        gridColumn: "span 6",
        gridRow: "span 7",
        order: 2,
    };
    const bigButtonContainerStyle: CSSProperties = {
        gridColumn: "span 6",
        gridRow: "span 4",
        order: 3,
    };
    return (
        <React.Fragment>
            <ZoomComponent
                style={commandsContainerStyle}
                scaleOrigin="top left"
            >
                <CommandsComponent />
            </ZoomComponent>

            <UpDownButtons style={upDownContainerStyle} />
            <ReadingsContainer
                style={readingsContainerStyle}
                scaleOrigin="bottom left"
            />
            <div style={bigButtonContainerStyle}>
                <BigButton
                    clickCallBack={() => {}}
                    buttonText="PARAR"
                    bgColor="var(--negative_button_color)"
                    fontSize="var(--font_l)"
                    height="90%"
                />
            </div>
        </React.Fragment>
    );
};

export default ControlPage;
