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
import MaterialSelector from "./materialSelector/materialSelector";
//import { eel } from "../../App";
import styleModule from "./mainPage.module.css";
import ExperimentsInspector from "./experimentsInspector/experimentsInspector";
import ExtraOptions from "./extraOptions/extraOptions";
import ZoomComponent from "../zoomComponent/zoomComponent";

//import GlobalConfigContext from "../../contexts/globalConfigContext";
import ExperimentsContext from "./contexts/selectedTripletsContext";

export default function MainPage({ materialList }) {
	//const [graphData, setGraphData] = useState(makeConstData());
	//const [globalConfig, setGlobalConfig] = useContext(GlobalConfigContext);

	const [experimentList, setExperimentList] = useState([]);

	return (
		<ExperimentsContext.Provider
			value={[experimentList, setExperimentList]}
		>
			<div className={styleModule.content}>
				<GraphComponent
					className={styleModule.graph}
					experimentList={experimentList}
				/>
				<ZoomComponent
					className={styleModule.material_selector}
					scaleOrigin="top left"
				>
					<MaterialSelector materialList={materialList} />
				</ZoomComponent>
				<ZoomComponent
					className={styleModule.experiments_inspector}
					scaleOrigin="bottom left"
				>
					<ExperimentsInspector />
				</ZoomComponent>
				<ExtraOptions />
				<button className={styleModule.ensaio_button}>ENSAIO</button>
			</div>
		</ExperimentsContext.Provider>
	);
}
