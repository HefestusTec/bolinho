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
import SelectedObjectListContext, {
    SelectedObjectType,
} from "contexts/selectedObjectListContext";
import { getRandomColor } from "../../../../../helpers";
import { toast } from "react-toastify";
import { getLoadOverTimeByExperimentId } from "api/db-api";
import { ExperimentType, MaterialType } from "types/DataBaseTypes";

interface DropdownButtonProps {
    experiment: ExperimentType;
    material: MaterialType;
}

const DropdownButton: FunctionComponent<DropdownButtonProps> = ({
    experiment,
    material,
}) => {
    const [objectList, setObjectList] = useContext(SelectedObjectListContext);

    const buttonClicked = () => {
        if (experiment === undefined) return;

        for (let i = 0; i < objectList.length; i++) {
            if (objectList[i].experiment.id === experiment.id) return;
        }

        getLoadOverTimeByExperimentId(experiment.id)
            .then((dataPointArrayResponse) => {
                if (dataPointArrayResponse === undefined) return;

                const newSelectedObj: SelectedObjectType = {
                    material: material,
                    experiment: experiment,
                    data_array: dataPointArrayResponse,
                    color: getRandomColor(),
                };
                setObjectList((experimentList) => [
                    ...experimentList,
                    newSelectedObj,
                ]);
            })
            .catch((error) => {
                toast.error(error);
            });
    };

    return (
        <li key={experiment.id}>
            <button
                className={styleModule.dropdown_button}
                aria-label="Material Selector"
                onClick={buttonClicked}
            >
                <div className={styleModule.dropdown_button_side}>
                    <div className={styleModule.add_sign}></div>
                </div>
                <div className={styleModule.dropdown_button_text}>
                    Experimento {experiment.id} [{experiment.date_time}]
                </div>
            </button>
        </li>
    );
};

export default DropdownButton;
