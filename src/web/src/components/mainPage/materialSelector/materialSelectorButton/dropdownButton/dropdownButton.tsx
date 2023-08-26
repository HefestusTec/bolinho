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
import React, { useContext, FunctionComponent } from "react";
import styleModule from "./dropdownButton.module.css";
import { ExperimentType } from "types/DataBaseTypes";
import { SelectedExperimentsContext } from "contexts/SelectedExperimentsContext";
import EditExperimentPopup from "components/EditExperimentPopup/EditExperimentPopup";
import ConfigButton from "../configButton/configButton";

interface DropdownButtonProps {
    experiment: ExperimentType;
}

const DropdownButton: FunctionComponent<DropdownButtonProps> = ({
    experiment,
}) => {
    const [selectedExperiments, setSelectedExperiments] = useContext(
        SelectedExperimentsContext
    );
    const buttonClicked = () => {
        if (experiment === undefined) return;

        for (let i = 0; i < selectedExperiments.length; i++) {
            if (selectedExperiments[i] === experiment.id) return;
        }

        setSelectedExperiments((oldExperiments) => [
            ...oldExperiments,
            experiment.id,
        ]);
    };

    return (
        <li key={experiment.id} className={styleModule.dropdown_button_li}>
            <button
                className={styleModule.dropdown_button}
                aria-label="Material Selector"
                onClick={buttonClicked}
            >
                <div className={styleModule.dropdown_button_side}>
                    <div className={styleModule.add_sign}></div>
                </div>
                <div className={styleModule.dropdown_button_text}>
                    {experiment.name} [{experiment.date_time}] idx:
                    {experiment.id}
                </div>
            </button>
            <ConfigButton bgColor="var(--content_background_color)">
                <EditExperimentPopup experiment={experiment} />
            </ConfigButton>
        </li>
    );
};

export default DropdownButton;
