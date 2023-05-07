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
import styleModule from "./customListSelector.module.css";

function CustomListSelector({
    children,
    className,
    clickCallBack,
    keys = ["default 1", "default 2"],
}) {
    const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

    const getClassName = () => {
        return [className, styleModule.custom_list_selector_div].join(" ");
    };

    const clicked = () => {
        setDropdownIsOpen(!dropdownIsOpen);
    };
    const dropDownButtonClicked = (key) => {
        console.log(key);
    };
    const makeDropdownButtons = () => {
        const buttons = keys.map((name) => (
            <button
                key={name}
                className={styleModule.dropdown_button}
                onClick={dropDownButtonClicked}
            >
                {name}
            </button>
        ));
        return buttons;
    };

    const makeDropdown = () => {
        if (dropdownIsOpen) {
            return (
                <div className={styleModule.dropdown_div}>
                    {makeDropdownButtons()}
                </div>
            );
        }
        return;
    };

    return (
        <div className={getClassName()}>
            <button
                className={styleModule.custom_list_selector}
                onClick={clicked}
            >
                <div className={styleModule.button_name}>{children}</div>
                <div className={styleModule.selected_div}>Lento</div>
            </button>
            {makeDropdown()}
        </div>
    );
}

export default CustomListSelector;
