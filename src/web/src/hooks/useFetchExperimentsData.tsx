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

import { ExperimentPlotData } from "classes";
import { fetchPrunedExperimentPlotDataList } from "helpers/DbHelper";
import { useEffect, useState } from "react";
import { ExperimentType } from "types/DataBaseTypes";
import { PlotTypeType } from "types/PlotTypeType";

const useFetchExperimentsData = (
    experiments: ExperimentType[],
    plotType: PlotTypeType,
    leftHandlePos: number,
    rightHandlePos: number
) => {
    const [experimentPlotDataList, setExperimentPlotDataList] = useState<
        ExperimentPlotData[]
    >([]);

    useEffect(() => {
        const updatePlotData = async () => {
            const newExperimentPlotDataList =
                await fetchPrunedExperimentPlotDataList(
                    experiments,
                    plotType,
                    leftHandlePos,
                    rightHandlePos
                );

            setExperimentPlotDataList(newExperimentPlotDataList);
        };

        updatePlotData();
    }, [experiments, leftHandlePos, rightHandlePos, plotType]);
    return [experimentPlotDataList] as const;
};

export default useFetchExperimentsData;
