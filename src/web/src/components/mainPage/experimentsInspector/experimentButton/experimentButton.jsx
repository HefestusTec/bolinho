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

import React, { useContext } from "react";
import ExperimentsContext from "../../contexts/experimentsContext";
import styleModule from "./experimentButton.module.css";

export default function ExperimentButton({ experiment, materialName }) {
	const [experimentList, setExperimentList] = useContext(ExperimentsContext);

	const removeSelf = () => {
		setExperimentList((experimentList) =>
			experimentList.filter((element) => element == experiment.id)
		);
	};
	return (
		<li>
			<button
				className={styleModule.experiment_button}
				onClick={removeSelf}
			>
				<div className={styleModule.experiment_text}>
					<div className={styleModule.experiment_material_text}>
						{materialName}
					</div>
					<div className={styleModule.experiment_experiment_text}>
						Exp{experiment.id} [01/01/2022]
					</div>
				</div>
			</button>
		</li>
	);
}
