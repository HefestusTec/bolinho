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

import { FunctionComponent, useContext } from "react";
import styleModule from "./ExperimentSideBar.module.css";
import ProgressWidget from "./ProgressWidget/ProgressWidget";
import { ExperimentPageContext } from "api/contexts/ExperimentPageContext";
import { ExperimentType } from "types/DataBaseTypes";
import { calculatePercentage, oneDecimal } from "helpers";
import { ReadingsType } from "types/ReadingsType";

interface ExperimentSideBarProps {
    experiment: ExperimentType;
    readings: ReadingsType;
}

const ExperimentSideBar: FunctionComponent<ExperimentSideBarProps> = ({
    experiment,
    readings,
}) => {
    const [experimentPageContext] = useContext(ExperimentPageContext);

    return (
        <div className={styleModule.experiment_side_bar_div}>
            <span className={styleModule.widgets_span}>
                <div className={styleModule.bolinho_logo} />
                <ProgressWidget
                    percentage={calculatePercentage(
                        readings.current_load,
                        experiment.max_load
                    )}
                    value={`${oneDecimal(readings.current_load)} N`}
                    title="Carga"
                />
                <ProgressWidget
                    percentage={calculatePercentage(
                        experimentPageContext.time,
                        experiment.max_time
                    )}
                    value={`${oneDecimal(experimentPageContext.time)} s`}
                    title="Tempo"
                />
                <ProgressWidget
                    percentage={calculatePercentage(
                        readings.z_axis_pos,
                        experiment.max_travel
                    )}
                    value={`${oneDecimal(readings.z_axis_pos)} mm`}
                    title="Distância"
                />
                <ProgressWidget
                    percentage={calculatePercentage(
                        readings.current_delta_load,
                        experiment.load_loss_limit
                    )}
                    value={`${oneDecimal(readings.current_delta_load)} N/s`}
                    title="Δ Carga"
                />
                <footer className={styleModule.side_bar_footer} />
            </span>
        </div>
    );
};

export default ExperimentSideBar;
