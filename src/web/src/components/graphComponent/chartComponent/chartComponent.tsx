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
import React, { useState, useEffect, FunctionComponent } from "react";

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
    experimentPlotDataArray: ExperimentPlotData[];
    allMaxDataValues: DataPointType;
}

const ChartComponent: FunctionComponent<ChartComponentProps> = ({
    sliderValue = { min: 0, max: 100 },
    experimentPlotDataArray = [],
    allMaxDataValues = { x: 50, y: 1 },
}) => {
    const [maxData, setMaxData] = useState<DataPointType>({ x: 50, y: 1 });

    const getDataSets = () => {
        return experimentPlotDataArray.map((object) => object.dataset);
    };

    const getXMaxValue = () => {
        if (sliderValue.max <= allMaxDataValues.x) return sliderValue.max;
        return allMaxDataValues.x;
    };

    useEffect(() => {
        setMaxData(allMaxDataValues);
    }, [allMaxDataValues]);

    return (
        <Line
            data={{
                datasets: getDataSets(),
            }}
            options={{
                responsive: true,
                maintainAspectRatio: false,
                normalized: true,
                animation: false,
                parsing: false,
                /*
				parsing: {
					xAxisKey: "x",
					yAxisKey: "y",
				},*/
                scales: {
                    x: {
                        type: "linear",
                        min: sliderValue.min,
                        max: getXMaxValue(),
                    },
                    y: {
                        type: "linear",
                        min: 0,
                        max: maxData.y,
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
