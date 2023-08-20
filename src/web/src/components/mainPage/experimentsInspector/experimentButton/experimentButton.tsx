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
import { SelectedExperimentType } from "contexts/SelectedExperimentsContext";

interface ExperimentButtonProps {
    experiment: SelectedExperimentType;
    myId: number;
    activeExperimentId: number;
    setActiveExperimentId: Dispatch<SetStateAction<number>>;
}

const ExperimentButton: FunctionComponent<ExperimentButtonProps> = ({
    experiment,
    activeExperimentId,
    myId,
    setActiveExperimentId,
}) => {
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (activeExperimentId === myId) setIsActive(true);
        else setIsActive(false);
    }, [activeExperimentId, myId]);

    const handleClick = () => {
        setActiveExperimentId(myId);
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
            return experiment.color;
        } catch (error) {
            return "FFFFFF";
        }
    };

    return (
        <li>
            <button
                className={getClassName()}
                onClick={handleClick}
                style={{ "--experiment_color": getStyleColor() } as any}
            >
                <div className={styleModule.experiment_text}>
                    <div className={styleModule.experiment_material_text}>
                        {experiment.experiment.name}
                    </div>
                    <div className={styleModule.experiment_experiment_text}>
                        Idx:{experiment.experiment.id} [
                        {experiment.experiment.date_time}]
                    </div>
                </div>
            </button>
        </li>
    );
};

export default ExperimentButton;
