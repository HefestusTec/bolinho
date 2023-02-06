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
} from "chart.js";
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);
class DataPoint {
	constructor(force = 0, pos = 0) {
		this.force = force;
		this.pos = pos;
	}
}
const makeConstData = () => {
	return [1, 22, 33, 3, 2, 20];
};
const options = {
	responsive: true,
	maintainAspectRatio: false,

	plugins: {
		legend: {
			position: "top",
		},
		title: {
			display: true,
			text: "Chart.js Line Chart",
		},
	},
};
const data = {
	labels: "as",
	datasets: [
		{
			label: "My First Dataset",
			data: [65, 59, 80, 81, 56, 55, 90],
			fill: false,
			borderColor: "rgb(75, 192, 192)",
			tension: 0.1,
		},
	],
};
function ChartComponent() {
	return <Line data={data} options={options} />;
}

export default ChartComponent;
