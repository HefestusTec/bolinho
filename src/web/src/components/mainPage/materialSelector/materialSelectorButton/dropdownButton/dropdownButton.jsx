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
import { eel } from "../../../../../App";
import styleModule from "./dropdownButton.module.css";
import SelectedObjectsContext from "../../../contexts/selectedObjectsContext";
import { getFormattedDate, getRandomColor } from "../../../../../helpers";
import { toast } from "react-toastify";
const getExperimentDate = async (index) => {
    try {
        return JSON.parse(await eel.get_experiment_at(index)());
    } catch (error) {
        toast.error("Não foi possível acessar o backend");
        return 0;
    }
};

const getExperimentObjectList = async (id) => {
    try {
        const experimentObject = JSON.parse(
            await eel.get_experiment_dict(id)()
        );

        return Object.assign(experimentObject, { color: getRandomColor() });
    } catch (error) {
        toast.error("Não foi possível acessar o backend");
        return {};
    }
};

export default function DropdownButton({ experimentIndex }) {
    const [objectList, setObjectList] = useContext(SelectedObjectsContext);
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
