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
import React, { useState, useEffect } from "react";
import { eel } from "../../../../../App";
import styleModule from "./dropdownButton.module.css";

const getExperimentDate = async (index) => {
	try {
		const date = JSON.parse(await eel.get_experiment_date_at(index)());
		return date;
	} catch (error) {
		return 0;
	}
};

export default function DropdownButton({ experimentIndex }) {
	const [experimentDate, setExperimentDate] = useState(0);

	useEffect(() => {
		getExperimentDate(experimentIndex).then((response) => {
			setExperimentDate(response);
		});
	}, [experimentIndex]);

	const getFormattedDate = () => {
		try {
			const day =
				experimentDate.day.toString().length === 2
					? experimentDate.day.toString()
					: 0 + experimentDate.day.toString();
			const month =
				experimentDate.month.toString().length === 2
					? experimentDate.month.toString()
					: 0 + experimentDate.month.toString();
			const date = `${day}/${month}/${experimentDate.year}`;
			return date;
		} catch (error) {
			return 0;
		}
	};

	return (
		<li key={experimentIndex}>
			<button
				className={styleModule.dropdown_button}
				aria-label="Material Selector"
			>
				<div className={styleModule.dropdown_button_side}>
					<div className={styleModule.add_sign}>+</div>
				</div>
				<div className={styleModule.dropdown_button_text}>
					Experimento {experimentIndex} [{getFormattedDate()}]
				</div>
			</button>
		</li>
	);
}
