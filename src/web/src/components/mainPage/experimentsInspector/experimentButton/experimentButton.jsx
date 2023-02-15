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
		const newCartData = experimentList.filter(
			(d) => d.experiment.id !== experiment.id
		);

		setExperimentList(newCartData);
	};

	const getFormattedDate = () => {
		try {
			const day =
				experiment.date.day.toString().length === 2
					? experiment.date.day.toString()
					: 0 + experiment.date.day.toString();
			const month =
				experiment.date.month.toString().length === 2
					? experiment.date.month.toString()
					: 0 + experiment.date.month.toString();
			const date = `${day}/${month}/${experiment.date.year}`;
			return date;
		} catch (error) {
			return 0;
		}
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
						Exp{experiment.id} [{getFormattedDate()}]
					</div>
				</div>
			</button>
		</li>
	);
}
