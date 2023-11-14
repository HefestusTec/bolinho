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

import {
    getLoadOverPositionByExperimentId,
    getLoadOverTimeByExperimentId,
} from "api/db-api";
import { ExperimentPlotData } from "classes";
import { useState } from "react";
import { toast } from "react-toastify";
import { ExperimentType } from "types/DataBaseTypes";
import { DataPointType } from "types/DataPointTypes";
import { PlotTypeType } from "types/PlotTypeType";

interface useRealTimeGraphProps {
    canUpdate: boolean;
    plotType: PlotTypeType;
    experiment: ExperimentType;
}

const useRealTimeGraph = ({
    canUpdate,
    plotType,
    experiment,
}: useRealTimeGraphProps) => {
    const [experimentPlotData, setExperimentPlotData] =
        useState<ExperimentPlotData>(new ExperimentPlotData());

    async function updateRealTimeGraphJS() {
        if (!canUpdate) return;
        const experimentColor = experiment.plot_color;
        const data: DataPointType[] = await fetchPlotData(experiment.id).catch(
            (err) => {
                toast.error(err);
                return [];
            }
        );

        setExperimentPlotData(
            new ExperimentPlotData(experiment.name, data, experimentColor)
        );
    }
    try {
        window.eel.expose(updateRealTimeGraphJS, "updateRealTimeGraphJS");
    } catch (error) {}

    const fetchPlotData = async (id: number) => {
        switch (plotType) {
            case "loadOverTime":
                return getLoadOverTimeByExperimentId(id, -1, -1);
            case "loadOverPosition":
                return getLoadOverPositionByExperimentId(id, -1, -1);
            default:
                return getLoadOverTimeByExperimentId(id, -1, -1);
        }
    };

    return [experimentPlotData] as const;
};

export default useRealTimeGraph;
