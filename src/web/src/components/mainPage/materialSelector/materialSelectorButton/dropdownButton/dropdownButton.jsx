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
import React, { useState, useEffect, useContext } from "react";
import { eel } from "../../../../../App";
import styleModule from "./dropdownButton.module.css";
import ExperimentsContext from "../../../contexts/experimentsContext";

const getExperimentDate = async (index) => {
	try {
		return JSON.parse(await eel.get_experiment_at(index)());
	} catch (error) {
		return 0;
	}
};

export default function DropdownButton({ experimentIndex }) {
	const [experimentList, setExperimentList] = useContext(ExperimentsContext);
	const [experiment, setExperiment] = useState(0);

	useEffect(() => {
		getExperimentDate(experimentIndex).then((response) => {
			setExperiment(response);
		});
	}, [experimentIndex]);

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

	const buttonClicked = () => {
		if (experimentList.includes(experimentIndex)) return;
		setExperimentList((experimentList) => [
			...experimentList,
			experimentIndex,
		]);
	};

	return (
		<li key={experimentIndex}>
			<button
				className={styleModule.dropdown_button}
				aria-label="Material Selector"
				onClick={buttonClicked}
			>
				<div className={styleModule.dropdown_button_side}>
					<div className={styleModule.add_sign}></div>
				</div>
				<div className={styleModule.dropdown_button_text}>
					Experimento {experimentIndex} [{getFormattedDate()}]
				</div>
			</button>
		</li>
	);
}
