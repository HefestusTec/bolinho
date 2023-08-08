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
    FunctionComponent,
    Dispatch,
    SetStateAction,
} from "react";
import styleModule from "./experimentButton.module.css";
import { SelectedObjectType } from "contexts/selectedObjectListContext";

interface ExperimentButtonProps {
    object: SelectedObjectType;
    activeTriplet: SelectedObjectType | undefined;
    setActiveTriplet: Dispatch<SetStateAction<SelectedObjectType | undefined>>;
}

const ExperimentButton: FunctionComponent<ExperimentButtonProps> = ({
    object,
    activeTriplet,
    setActiveTriplet,
}) => {
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        try {
            if (activeTriplet?.experiment.id === object.experiment.id)
                setIsActive(true);
            else setIsActive(false);
        } catch (error) {}
    }, [activeTriplet, object]);

    const removeSelf = () => {
        setActiveTriplet(object);
    };

    const getClassName = () => {
        if (isActive)
            return [
                styleModule.experiment_button,
                styleModule.experiment_button_active,
            ].join(" ");
        return styleModule.experiment_button;
    };

    const getStyleColor = () => {
        try {
            return object.color;
        } catch (error) {
            return "FFFFFF";
        }
    };

    return (
        <li>
            <button
                className={getClassName()}
                onClick={removeSelf}
                style={{ "--experiment_color": getStyleColor() } as any}
            >
                <div className={styleModule.experiment_text}>
                    <div className={styleModule.experiment_material_text}>
                        {object.material.name}
                    </div>
                    <div className={styleModule.experiment_experiment_text}>
                        Exp{object.experiment.id} [{object.experiment.date_time}
                        ]
                    </div>
                </div>
            </button>
        </li>
    );
};

export default ExperimentButton;
