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

export default function ExperimentButton({
	triplet,
	materialName,
	activeTriplet,
	setActiveTriplet,
}) {
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		try {
			if (activeTriplet.experiment.id === triplet.experiment.id)
				setIsActive(true);
			else setIsActive(false);
		} catch (error) {}
	}, [activeTriplet, triplet]);

	const removeSelf = () => {
		setActiveTriplet(triplet);
	};

	const getClassName = () => {
		if (isActive)
			return [
				styleModule.experiment_button,
				styleModule.experiment_button_active,
			].join(" ");
		return styleModule.experiment_button;
	};

	return (
		<li>
			<button className={getClassName()} onClick={removeSelf}>
				<div className={styleModule.experiment_text}>
					<div className={styleModule.experiment_material_text}>
						{materialName}
					</div>
					<div className={styleModule.experiment_experiment_text}>
						Exp{triplet.experiment.id} [
						{getFormattedDate(triplet.experiment.date)}]
					</div>
				</div>
			</button>
		</li>
	);
}
