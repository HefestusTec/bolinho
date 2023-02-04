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

import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	Label,
	ResponsiveContainer,
} from "recharts";

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
	const [currentData] = useState(initialData);
	const [leftHandlePos, setLeftHandlePos] = useState(0);
	const [rightHandlePos, setRightHandlePos] = useState(100);
	const [dataRightMax, setDataRightMax] = useState(100);
	const [showSideBar, setShowSideBar] = useState(true);

	function handleChange(event) {
		setLeftHandlePos(event[0]);
		setRightHandlePos(event[1]);
	}

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

	const getSideBarDisplay = () => {
		return showSideBar ? "block" : "none";
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
				<ResponsiveContainer width="100%" height="90%">
					<LineChart
						right={50}
						margin={{
							top: 15,
							right: 25,
							left: -5,
							bottom: 0,
						}}
					>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis
							allowDataOverflow={true}
							dataKey={"pos"}
							type="number"
							domain={[
								leftHandlePos,
								(dataMax) =>
									isDataMaxBigger(dataMax)
										? rightHandlePos
										: dataMax,
							]}
						>
							<Label
								value="Posição [mm]"
								offset={0}
								position="insideBottom"
							/>
						</XAxis>
						<YAxis>
							<Label
								value="Força [N]"
								angle={-90}
								position="insideLeft"
								offset={20}
							/>
						</YAxis>
						<Tooltip />
						<Legend verticalAlign="top" />
						<Line
							animationDuration={200}
							data={data1}
							type="monotone"
							dataKey="force"
							name="Material 1"
							stroke="#19E5A0"
							strokeWidth={4}
						/>
						<Line
							animationDuration={200}
							data={data2}
							type="monotone"
							dataKey="force"
							name="Material 2"
							stroke="#1797F8"
							strokeWidth={4}
						/>
					</LineChart>
				</ResponsiveContainer>
				<div className={styleModule.side_bar_button_div}>
					<button
						className={getOpenSideBarButtonClassName()}
						onClick={toggleSideBar}
					></button>
				</div>
				<div className={styleModule.bottom_part}>
					<div className={styleModule.slider}>
						<Slider
							range
							draggableTrack
							pushable={3}
							max={dataRightMax}
							defaultValue={[leftHandlePos, rightHandlePos]}
							onChange={handleChange}
							trackStyle={{
								backgroundColor: "#DDDDDD",
								cursor: "e-resize",
								height: "1.5vh",
							}}
							railStyle={{
								height: "1.5vh",
								backgroundColor: "#F4F4F4",
							}}
							handleStyle={{
								border: "none",
								backgroundColor: "#FFFFFF",
								opacity: 1,
								height: "3vh",
								width: "2.5vw",
								boxShadow:
									"0px 0px 2px 2px rgba(0, 0, 0, 0.25)",
								marginTop: "-0.9vh",
								borderRadius: 5,
							}}
						></Slider>
					</div>
				</div>
			</div>
			<div className={getSideBarClassName()} display={"none"}></div>
		</div>
	);
}
export default GraphComponent;
