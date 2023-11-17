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
import { ExperimentType } from "types/DataBaseTypes";
import { PlotTypeType } from "types/PlotTypeType";

export const fetchPlotData = async (
    id: number,
    plotType: PlotTypeType,
    leftHandlePos: number,
    rightHandlePos: number
) => {
    switch (plotType) {
        case "loadOverTime":
            return getLoadOverTimeByExperimentId(
                id,
                leftHandlePos,
                rightHandlePos
            );
        case "loadOverPosition":
            return getLoadOverPositionByExperimentId(
                id,
                leftHandlePos,
                rightHandlePos
            );
        default:
            return getLoadOverPositionByExperimentId(
                id,
                leftHandlePos,
                rightHandlePos
            );
    }
};

export async function fetchPrunedExperimentPlotDataList(
    experiments: ExperimentType[],
    plotType: PlotTypeType,
    leftHandlePos: number,
    rightHandlePos: number
) {
    let newDataList: ExperimentPlotData[] = [];
    for (let i = 0; i < experiments.length; i++) {
        const currentExp = experiments[i];
        const data = await fetchPlotData(
            currentExp.id,
            plotType,
            leftHandlePos,
            rightHandlePos
        );
        newDataList.push(
            new ExperimentPlotData(currentExp.name, data, currentExp.plot_color)
        );
    }
    return newDataList;
}
