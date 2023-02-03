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
import GraphComponent from "../graphComponent/graphComponent";
//import { eel } from "../../App";
import styleModule from "./mainPage.module.css";

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

function MainPage() {
	const [graphData, setGraphData] = useState(makeConstData());

	return (
		<div className={styleModule.Content}>
			<div className={styleModule.main_page_graph}>
				<GraphComponent initialData={graphData}></GraphComponent>
			</div>
		</div>
	);
}
export default MainPage;
