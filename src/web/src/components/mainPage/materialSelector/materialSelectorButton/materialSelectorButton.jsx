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

import styleModule from "./materialSelectorButton.module.css";
import DropdownButton from "./dropdownButton/dropdownButton";

export default function MaterialSelectorButton({ material }) {
    const [dropdown, setDropdown] = useState(false);

    const getButtonClassName = () => {
        if (dropdown) {
            return [
                styleModule.material_selector_button,
                styleModule.material_selector_button_active,
            ].join(" ");
        }
        return [styleModule.material_selector_button].join(" ");
    };

    const getDropdownClassName = () => {
        if (dropdown) {
            return [styleModule.dropdown_ul].join(" ");
        }
        return [styleModule.dropdown_ul, styleModule.dropdown_hidden].join(" ");
    };

    const getAddSign = () => {
        if (dropdown) return "-";

        return "+";
    };

    const toggleDropDown = () => {
        setDropdown(!dropdown);
    };

    const createButton = (experimentIdx) => {
        return (
            <DropdownButton
                experimentIndex={experimentIdx}
                key={"EX" + experimentIdx.toString()}
            ></DropdownButton>
        );
    };

    const makeExperimentButtons = () => {
        let buttonArray = [];
        const experiment_array = material.experiment_array;
        experiment_array.forEach((element) => {
            buttonArray.push(createButton(element));
        });
        return buttonArray;
    };

    return (
        <li key={material.index} className={styleModule.material_selector_li}>
            <button
                className={getButtonClassName()}
                aria-label="Material Selector"
                onClick={toggleDropDown}
            >
                <div className={styleModule.material_selector_side}>
                    <div className={styleModule.add_sign}>{getAddSign()}</div>
                </div>
                <div className={styleModule.material_selector_text}>
                    [{material.batch}] {material.name}
                </div>
            </button>
            <ul className={getDropdownClassName()}>
                {makeExperimentButtons()}
            </ul>
        </li>
    );
}
