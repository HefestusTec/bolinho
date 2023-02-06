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
import React, { useState } from "react";

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

function ChartComponent({
	sliderValue = { min: 0, max: 100 },
	dataPointsArray = [],
}) {
	const getMaxDataValues = () => {
		if (dataPointsArray.length <= 0) return { x: 0, y: 0 };
		const maxX = dataPointsArray[dataPointsArray.length - 1].x;
		const maxY = Math.max(...dataPointsArray.map((o) => o.y));
		return { x: maxX, y: maxY };
	};
	const [chartData] = useState({
		datasets: [
			{
				label: "Material 1",
				data: dataPointsArray,
				fill: false,
				borderColor: "rgb(75, 192, 192)", // Color of the line
			},
		],
	});
	const [maxDataValues] = useState(getMaxDataValues());
	const getMaxValue = () => {
		console.log(sliderValue.max);
		if (sliderValue.max <= maxDataValues.x) return sliderValue.max;
		return getMaxDataValues().x;
	};
	const chartOptions = {
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
				max: getMaxValue(),
			},
			y: {
				type: "linear",
				min: 0,
				max: maxDataValues.y,
			},
		},
		plugins: {
			legend: {
				position: "top",
			},
		},
	};

	return <Line data={chartData} options={chartOptions} />;
}

export default ChartComponent;
