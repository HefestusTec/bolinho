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

import React, { FunctionComponent, useState } from "react";
import styleModule from "./customListSelector.module.css";
import CustomButton from "../customButton/customButton";

interface CustomListSelectorProps {
    children: any;
    className: string;
    clickCallBack: (key: string) => void;
    keys: string[];
    selected: string;
}

const CustomListSelector: FunctionComponent<CustomListSelectorProps> = ({
    children,
    className,
    clickCallBack,
    keys = ["default 1", "default 2"],
    selected = "",
}) => {
    const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

    const getClassName = () => {
        return [className, styleModule.custom_list_selector_div].join(" ");
    };

    const clicked = () => {
        setDropdownIsOpen(!dropdownIsOpen);
    };
    const dropDownButtonClicked = (key: string) => {
        clickCallBack(key);
        setDropdownIsOpen(false);
    };
    const makeDropdownButtons = () => {
        const buttons = keys.map((name: string) => (
            <CustomButton
                clickCallBack={dropDownButtonClicked}
                className={styleModule.dropdown_button}
            >
                {name}
            </CustomButton>
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

    const getExpandMenuIndicatorClassName = () => {
        if (dropdownIsOpen) {
            return [
                styleModule.expand_menu_indicator_open,
                styleModule.expand_menu_indicator,
            ].join(" ");
        }
        return [styleModule.expand_menu_indicator].join(" ");
    };

    return (
        <div className={getClassName()}>
            <button
                className={styleModule.custom_list_selector}
                onClick={clicked}
            >
                <div className={styleModule.button_name}>{children}</div>
                <div className={styleModule.selected_div}>
                    {selected}&nbsp;
                    <div className={getExpandMenuIndicatorClassName()} />
                </div>
            </button>
            {makeDropdown()}
        </div>
    );
};

export default CustomListSelector;
