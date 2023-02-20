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
import { getFormattedDate } from "../../../../helpers";
import styleModule from "./experimentButton.module.css";
import { toast } from "react-toastify";
export default function ExperimentButton({
	object,
	materialName,
	activeTriplet,
	setActiveTriplet,
}) {
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		try {
			if (activeTriplet.experiment.id === object.experiment.id)
				setIsActive(true);
			else setIsActive(false);
		} catch (error) {}
	}, [activeTriplet, object]);

	const removeSelf = () => {
		setActiveTriplet(object);
	};

	const getClassName = () => {
		if (isActive)
			return [
				styleModule.experiment_button,
				styleModule.experiment_button_active,
			].join(" ");
		return styleModule.experiment_button;
	};

	const getStyleColor = () => {
		try {
			return object.color;
		} catch (error) {
			return "FFFFFF";
		}
	};

	return (
		<li>
			<button
				className={getClassName()}
				onClick={removeSelf}
				style={{ "--experiment_color": getStyleColor() }}
			>
				<div className={styleModule.experiment_text}>
					<div className={styleModule.experiment_material_text}>
						{materialName}
					</div>
					<div className={styleModule.experiment_experiment_text}>
						Exp{object.experiment.id} [
						{getFormattedDate(object.experiment.date)}]
					</div>
				</div>
			</button>
		</li>
	);
}
