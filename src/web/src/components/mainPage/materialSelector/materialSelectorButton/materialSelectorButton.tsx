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
import { FunctionComponent, useEffect, useState } from "react";

import styleModule from "./materialSelectorButton.module.css";
import DropdownButton from "./dropdownButton/dropdownButton";
import { ExperimentType, MaterialType } from "types/DataBaseTypes";
import { getExperimentsByMaterialId } from "api/db-api";
import ConfigButton from "./configButton/configButton";

interface MaterialSelectorButtonProps {
    material: MaterialType;
}

const MaterialSelectorButton: FunctionComponent<
    MaterialSelectorButtonProps
> = ({ material }) => {
    const [isActive, setIsActive] = useState(false);
    const [experiments, setExperiments] = useState<ExperimentType[]>([]);

    const getButtonClassName = () => {
        if (isActive) {
            return [
                styleModule.material_selector_button,
                styleModule.material_selector_button_active,
            ].join(" ");
        }
        return [styleModule.material_selector_button].join(" ");
    };

    const getDropdownClassName = () => {
        if (isActive) {
            return [styleModule.dropdown_ul].join(" ");
        }
        return [styleModule.dropdown_ul, styleModule.dropdown_hidden].join(" ");
    };

    useEffect(() => {
        getExperimentsByMaterialId(material.id).then((experimentsArray) => {
            setExperiments(experimentsArray);
        });
    }, [isActive, material]);

    const toggleDropDown = () => {
        setIsActive(!isActive);
    };

    const createButton = (experimentElem: ExperimentType) => {
        return (
            <DropdownButton
                experiment={experimentElem}
                material={material}
                key={"EX" + experimentElem.id.toString()}
            />
        );
    };

    const makeExperimentButtons = () => {
        return experiments.map((element) => createButton(element));
    };

    return (
        <li
            key={"mat_idx_" + material.id}
            className={styleModule.material_selector_li}
        >
            <span className={styleModule.material_button_span}>
                <button
                    className={getButtonClassName()}
                    aria-label="Material Selector"
                    onClick={toggleDropDown}
                >
                    <div className={styleModule.material_selector_side}>
                        <div className={styleModule.add_sign}>
                            {isActive ? "-" : "+"}
                        </div>
                    </div>
                    <div className={styleModule.material_selector_text}>
                        [{material.id}] {material.name}
                    </div>
                </button>
                <ConfigButton
                    bgColor={
                        isActive
                            ? "var(--button_active_color)"
                            : "var(--button_inactive_color)"
                    }
                />
            </span>

            <ul className={getDropdownClassName()}>
                {makeExperimentButtons()}
            </ul>
        </li>
    );
};

export default MaterialSelectorButton;
