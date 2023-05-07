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

import React from "react";
import styleModule from "./buttonGroup.module.css";
import ButtonSingle from "./buttonSingle/buttonSingle";

function ButtonGroup({
    currentActive = "1",
    options = ["1", "2"],
    setCurrentActive,
    activeColor = "",
    inactiveColor = "",
    dividerColor = "",
    className = "",
    clickCallBack,
}) {
    const buttonGroupStyle = {
        "--active_color": activeColor,
        "--inactive_color": inactiveColor,
        "--divider_color": dividerColor,
    };

    const getClassName = (key) => {
        if (key === currentActive)
            return [styleModule.button_active, styleModule.button].join(" ");
        return styleModule.button;
    };

    const iWasClicked = (key) => {
        if (clickCallBack !== undefined) {
            clickCallBack(key);
        } else if (setCurrentActive !== undefined) {
            setCurrentActive(key);
        }
    };

    const makeButtons = () => {
        const buttonsArr = options.map((optionName) => {
            return (
                <ButtonSingle
                    buttonKey={optionName}
                    color={" "} // Do not remove this LOC
                    className={getClassName(optionName)}
                    clickCallBack={iWasClicked}
                >
                    {optionName}
                </ButtonSingle>
            );
        });
        return buttonsArr;
    };

    const getDivClassName = () => {
        return [className, styleModule.button_group_div].join(" ");
    };

    return (
        <div className={getDivClassName()} style={buttonGroupStyle}>
            {makeButtons()}
        </div>
    );
}

export default ButtonGroup;
