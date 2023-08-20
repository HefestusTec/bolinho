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

import { FunctionComponent, ReactNode, RefObject, useRef } from "react";
import CustomButton from "components/customSubComponents/customButton/customButton";
import styleModule from "./configButton.module.css";
import React from "react";
import Popup from "reactjs-popup";
import BackgroundFader from "components/backgroundFader/backgroundFader";
import { PopupActions } from "reactjs-popup/dist/types";
import "./configButtonStyle.css"; // Tell webpack that Button.js uses these styles

interface ConfigButtonProps {
    bgColor?: string;
    children: ReactNode;
}

const ConfigButton: FunctionComponent<ConfigButtonProps> = ({
    bgColor = "var(--button_inactive_color)",
    children,
}) => {
    const ref = useRef<PopupActions>(null) as RefObject<PopupActions>;
    const closeTooltip = () => {
        ref?.current?.close();
    };

    return (
        <React.Fragment>
            <CustomButton
                className={styleModule.edit_material_button}
                bgColor={bgColor}
            >
                <Popup
                    trigger={() => (
                        <div className={styleModule.popup_trigger_div}>
                            <span className={styleModule.edit_icon} />
                        </div>
                    )}
                    ref={ref}
                    position={"right center"}
                    closeOnDocumentClick
                    className={styleModule.popup_trigger}
                    keepTooltipInside=".App"
                >
                    <React.Fragment>
                        {children}
                        <BackgroundFader
                            faderIndex={-2}
                            callbackFunc={() => {
                                closeTooltip();
                            }}
                        />
                    </React.Fragment>
                </Popup>
            </CustomButton>
        </React.Fragment>
    );
};

export default ConfigButton;
