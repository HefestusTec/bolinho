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
import React, {
    useState,
    useEffect,
    useContext,
    FunctionComponent,
} from "react";
import styleModule from "./dropdownButton.module.css";
import SelectedObjectListContext, {
    SelectedObjectType,
} from "contexts/selectedObjectListContext";
import { getFormattedDate, getRandomColor } from "../../../../../helpers";
import { toast } from "react-toastify";
import {
    getDataPointArrayAt,
    getExperimentAt,
    getMaterialAt,
} from "../../../../../api/backend-api";
import { ExperimentType } from "types/ExperimentType";

interface DropdownButtonProps {
    experimentIndex: number;
}

const DropdownButton: FunctionComponent<DropdownButtonProps> = ({
    experimentIndex,
}) => {
    const [objectList, setObjectList] = useContext(SelectedObjectListContext);
    const [experiment, setExperiment] = useState<ExperimentType | undefined>(
        undefined
    );

    useEffect(() => {
        getExperimentAt(experimentIndex).then((response) => {
            setExperiment(response);
        });
    }, [experimentIndex]);

    const buttonClicked = () => {
        if (experiment === undefined) return;

        for (let i = 0; i < objectList.length; i++) {
            if (objectList[i].experiment.id === experiment.id) return;
        }

        getMaterialAt(experiment.material_id)
            .then((materialResponse) => {
                if (materialResponse === undefined) return;
                getDataPointArrayAt(experiment.data_array_id)
                    .then((dataPointArrayResponse) => {
                        if (dataPointArrayResponse === undefined) return;

                        const newSelectedObj: SelectedObjectType = {
                            material: materialResponse,
                            experiment: experiment,
                            data_array: dataPointArrayResponse,
                            color: getRandomColor(),
                        };
                        console.log(materialResponse);
                        setObjectList((experimentList) => [
                            ...experimentList,
                            newSelectedObj,
                        ]);
                    })
                    .catch((error) => {
                        toast.error(error);
                    });
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
                    {getFormattedDate(experiment?.date)}]
                </div>
            </button>
        </li>
    );
};

export default DropdownButton;
