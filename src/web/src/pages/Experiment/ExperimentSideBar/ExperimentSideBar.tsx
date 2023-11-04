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
import { calculatePercentage } from "helpers";
import { ReadingsType } from "types/ReadingsType";

interface ExperimentSideBarProps {
    experiment: ExperimentType | undefined;
    readings: ReadingsType;
}

const ExperimentSideBar: FunctionComponent<ExperimentSideBarProps> = ({
    experiment,
    readings,
}) => {
    const [experimentPageContext] = useContext(ExperimentPageContext);

    if (experiment === undefined) return <></>;

    return (
        <div className={styleModule.experiment_side_bar_div}>
            <span className={styleModule.widgets_span}>
                <div className={styleModule.bolinho_logo} />
                <ProgressWidget
                    value={calculatePercentage(
                        readings.current_load,
                        experiment.max_load
                    )}
                    title="Carga"
                />
                <ProgressWidget
                    value={calculatePercentage(
                        experimentPageContext.time,
                        experiment.max_time
                    )}
                    title="Tempo"
                />
                <ProgressWidget
                    value={calculatePercentage(
                        readings.z_axis_pos,
                        experiment.max_travel
                    )}
                    title="Distância"
                />
                <ProgressWidget
                    value={calculatePercentage(
                        experimentPageContext.deltaLoad,
                        experiment.load_loss_limit
                    )}
                    title="Δ Carga"
                />
                <footer className={styleModule.side_bar_footer} />
            </span>
        </div>
    );
};

export default ExperimentSideBar;
