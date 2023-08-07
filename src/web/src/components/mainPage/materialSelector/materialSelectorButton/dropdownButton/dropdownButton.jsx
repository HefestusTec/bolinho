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
import React, { useState, useEffect, useContext } from "react";
import styleModule from "./dropdownButton.module.css";
import SelectedObjectListContext from "contexts/selectedObjectListContext";
import { getFormattedDate } from "../../../../../helpers";
import { toast } from "react-toastify";
import {
    getExperimentDate,
    getExperimentObjectList,
} from "../../../../../api/backend-api";

export default function DropdownButton({ experimentIndex }) {
    const [objectList, setObjectList] = useContext(SelectedObjectListContext);
    const [experiment, setExperiment] = useState(0);

    useEffect(() => {
        getExperimentDate(experimentIndex).then((response) => {
            setExperiment(response);
        });
    }, [experimentIndex]);

    const buttonClicked = () => {
        getExperimentObjectList(experimentIndex)
            .then((response) => {
                console.log(response);
                // Checking if the experiment id already exists in the experiment list
                if (
                    objectList.some(
                        (e) => e.experiment.id === response.experiment.id
                    )
                )
                    return;
                setObjectList((experimentList) => [
                    ...experimentList,
                    response,
                ]);
            })
            .catch((error) => {
                toast.error(error);
            });
    };

    return (
        <li key={experimentIndex}>
            <button
                className={styleModule.dropdown_button}
                aria-label="Material Selector"
                onClick={buttonClicked}
            >
                <div className={styleModule.dropdown_button_side}>
                    <div className={styleModule.add_sign}></div>
                </div>
                <div className={styleModule.dropdown_button_text}>
                    Experimento {experimentIndex} [
                    {getFormattedDate(experiment.date)}]
                </div>
            </button>
        </li>
    );
}
