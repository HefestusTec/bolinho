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
import styleModule from "./graphComponent.module.css";

import "rc-slider/assets/index.css";
import ChartComponent from "./chartComponent/chartComponent";
import SliderComponent from "./sliderComponent/sliderComponent";

class DataPoint {
	constructor(force = 0, pos = 0) {
		this.force = force;
		this.pos = pos;
	}
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

const makeRandomData = () => {
	let randData = [];
	for (let i = 0; i < getRandomInt(5, 30); i++) {
		randData.push(new DataPoint(getRandomInt(5, 30), i * 10));
	}
	return randData;
};

const makeConstData = () => {
	return [
		new DataPoint(40, 0),
		new DataPoint(20, 10),
		new DataPoint(0, 15),
		new DataPoint(100, 20),
		new DataPoint(10, 30),
		new DataPoint(30, 50),
	];
};

function GraphComponent({ initialData = [] }) {
	const [data1] = useState(makeConstData);
	const [data2] = useState(makeRandomData);
	//const [currentData] = useState(initialData);
	const [leftHandlePos, setLeftHandlePos] = useState(0);
	const [rightHandlePos, setRightHandlePos] = useState(100);
	const [dataRightMax, setDataRightMax] = useState(100);
	const [showSideBar, setShowSideBar] = useState(true);

	let largestDataMax = 0;

	const isDataMaxBigger = (dataMax) => {
		if (dataMax > largestDataMax) {
			largestDataMax = dataMax;
			setDataRightMax(dataMax);
		}

		if (dataMax > rightHandlePos) {
			return true;
		}
		return false;
	};

	const getOpenSideBarButtonClassName = () => {
		return showSideBar
			? [
					styleModule.open_side_bar_button,
					styleModule.open_side_bar_button_active,
			  ].join(" ")
			: [
					styleModule.open_side_bar_button,
					styleModule.open_side_bar_button_inactive,
			  ].join(" ");
	};

	const toggleSideBar = () => {
		setShowSideBar(!showSideBar);
	};

	const getGraphAreaClassName = () => {
		return showSideBar
			? [styleModule.graph_area, styleModule.graph_area_mini].join(" ")
			: [styleModule.graph_area].join(" ");
	};

	const getSideBarClassName = () => {
		return showSideBar
			? [styleModule.side_bar].join(" ")
			: [styleModule.side_bar, styleModule.side_bar_hidden].join(" ");
	};
	return (
		<div className={styleModule.graph_component}>
			<div className={getGraphAreaClassName()}>
				<div className={styleModule.chart_component_div}>
					<ChartComponent></ChartComponent>
				</div>
				<div className={styleModule.side_bar_button_div}>
					<button
						className={getOpenSideBarButtonClassName()}
						onClick={toggleSideBar}
						aria-label="Toggle Graph SideBar"
					></button>
				</div>
				<div className={styleModule.bottom_part}>
					<SliderComponent></SliderComponent>
				</div>
			</div>
			<div className={getSideBarClassName()} display={"none"}></div>
		</div>
	);
}
export default GraphComponent;
