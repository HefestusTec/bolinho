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

function GraphComponent({ initialData = [] }) {
	const [currentData] = useState(initialData);
	const [leftHandlePos, setLeftHandlePos] = useState(0);
	const [rightHandlePos, setRightHandlePos] = useState(100);
	const [dataRightMax, setDataRightMax] = useState(100);

	function handleChange(event) {
		setLeftHandlePos(event[0]);
		setRightHandlePos(event[1]);
	}

	const isDataMaxBigger = (dataMax) => {
		setDataRightMax(dataMax);
		if (dataMax > rightHandlePos) {
			return true;
		}
		return false;
	};

	return (
		<React.Fragment>
			<ResponsiveContainer width="100%" height="90%">
				<LineChart
					right={50}
					data={currentData}
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
						type="monotone"
						dataKey="force"
						stroke="#19E5A0"
						strokeWidth={4}
					/>
				</LineChart>
			</ResponsiveContainer>
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
							boxShadow: "0px 0px 2px 2px rgba(0, 0, 0, 0.25)",
							marginTop: "-0.9vh",
							borderRadius: 5,
						}}
					></Slider>
				</div>
			</div>
		</React.Fragment>
	);
}
export default GraphComponent;
