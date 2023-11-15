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
import React, { FunctionComponent } from "react";

import { Line } from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    scales,
} from "chart.js";

import { ExperimentPlotData } from "../../../classes";
import { DataPointType } from "types/DataPointTypes";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    scales
);

interface ChartComponentProps {
    sliderValue: { min: number; max: number };
    experimentPlotDataList: ExperimentPlotData[];
    maxData: DataPointType;
    minData: DataPointType;
}

const ChartComponent: FunctionComponent<ChartComponentProps> = ({
    sliderValue,
    experimentPlotDataList,
    maxData,
    minData,
}) => {
    return (
        <Line
            data={{
                datasets: experimentPlotDataList.map((e) => e.dataset),
            }}
            options={{
                responsive: true,
                maintainAspectRatio: false,
                normalized: true,
                animation: false,
                parsing: false,
                spanGaps: false,

                datasets: {
                    line: {
                        pointRadius: 0, // disable for all `'line'` datasets
                    },
                },

                scales: {
                    x: {
                        type: "linear",
                        min:
                            sliderValue.min >= minData.x
                                ? sliderValue.min
                                : minData.x,
                        max:
                            sliderValue.max <= maxData.x
                                ? sliderValue.max
                                : maxData.x,
                    },
                    y: {
                        type: "linear",
                        min: Math.ceil(minData.y * 100) / 100,
                        // round up maxData.y to 2 decimal places
                        max: Math.ceil(maxData.y * 100) / 100,
                    },
                },
                plugins: {
                    legend: {
                        position: "top",
                    },
                },
            }}
        />
    );
};

export default ChartComponent;
