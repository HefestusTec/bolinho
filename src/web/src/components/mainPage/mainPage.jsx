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

import React, { useContext, useState } from "react";
import GraphComponent from "../graphComponent/graphComponent";
import MaterialSelector from "./materialSelector/materialSelector";
//import { eel } from "../../App";
import styleModule from "./mainPage.module.css";
import MaterialsInspector from "./materialsInspector/materialsInspector";
import ExtraOptions from "./extraOptions/extraOptions";

import GlobalConfigContext from "../../contexts/globalConfigContext";
import ExperimentsContext from "./contexts/experimentsContext";

function MainPage({ materialList }) {
	//const [graphData, setGraphData] = useState(makeConstData());
	const [globalConfig, setGlobalConfig] = useContext(GlobalConfigContext);

	const [experimentList, setExperimentList] = useState([]);

	// THIS IS JUST FOR DEBUG
	const toggleTheme = () => {
		if (globalConfig.theme === "dark") {
			setGlobalConfig({ ...globalConfig, theme: "light" });
			return;
		}
		setGlobalConfig({ ...globalConfig, theme: "dark" });
	};

	return (
		<ExperimentsContext.Provider
			value={[experimentList, setExperimentList]}
		>
			<div className={styleModule.content}>
				<MaterialSelector materialList={materialList} />
				<GraphComponent className={styleModule.graph} />
				<MaterialsInspector />
				<ExtraOptions />
				<button
					className={styleModule.ensaio_button}
					onClick={toggleTheme}
				>
					Ensaio
				</button>
			</div>
		</ExperimentsContext.Provider>
	);
}
export default MainPage;
