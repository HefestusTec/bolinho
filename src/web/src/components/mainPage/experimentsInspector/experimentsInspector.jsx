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
import React, { useContext, useState, useEffect } from "react";
import ExperimentButton from "./experimentButton/experimentButton";
import SelectedObjectsContext from "../contexts/selectedObjectsContext";
import { getFormattedDate, getFormattedBodyParams } from "../../../helpers";
import { ReactComponent as ColorIcon } from "./resources/colorSelectorIcon.svg";

import styleModule from "./experimentsInspector.module.css";

export default function ExperimentsInspector() {
	const [objectList, setObjectList] = useContext(SelectedObjectsContext);
	const [activeTriplet, setActiveTriplet] = useState(null);

	const createButton = (object) => {
		return (
			<ExperimentButton
				object={object}
				materialName={object.material.name}
				activeTriplet={activeTriplet}
				setActiveTriplet={setActiveTriplet}
			></ExperimentButton>
		);
	};

	const makeButtons = () => {
		let buttonArray = [];
		try {
			objectList.forEach((element) => {
				buttonArray.push(createButton(element));
			});
		} catch (error) {}
		return buttonArray;
	};

	const makeHeaderText = () => {
		try {
			return activeTriplet.material.name;
		} catch (error) {
			return;
		}
	};
	const makeMaterialIdText = () => {
		try {
			return "[" + activeTriplet.material.batch + "]";
		} catch (error) {
			return;
		}
	};

	const makeMaterialText = () => {
		try {
			const formattedBodyParams = getFormattedBodyParams(
				activeTriplet.experiment.experiment_params.body_params
			);
			return (
				<React.Fragment>
					<h1>Material</h1>
					<b>Lote: </b>
					{activeTriplet.material.batch}
					<br />
					<b>Fornecedor: </b>
					{activeTriplet.material.supplier.name}
					<br />
					<b>• E-mail: </b>
					{activeTriplet.material.supplier.email}
					<br />
					<b>Id: </b>
					{activeTriplet.material.id}
					<br />
					<b>Info extra: </b>
					<p>{activeTriplet.material.extra_info}</p>
					<hr></hr>
					<h1>Experimento</h1>
					<b>Data: </b>
					{getFormattedDate(activeTriplet.experiment.date)}
					<br />
					<b>Parâmetros: </b>
					<br />
					<b>• AutoStop: </b>
					<br />
					<>- • Queda de força: </>
					{
						activeTriplet.experiment.experiment_params.stop_params
							.force_loss
					}
					<br />
					<>- • Força máxima: </>
					{
						activeTriplet.experiment.experiment_params.stop_params
							.max_force
					}
					<br />
					<>- • Distância máxima: </>
					{
						activeTriplet.experiment.experiment_params.stop_params
							.max_travel
					}
					<br />
					<>- • Tempo máximo: </>
					{
						activeTriplet.experiment.experiment_params.stop_params
							.max_time
					}
					<br />
					<b>• Corpo de prova: </b>
					<br />
					<>- • {formattedBodyParams.type}</>
					<br />
					<>- • {formattedBodyParams.paramA}</>
					<br />
					<>- • {formattedBodyParams.paramB}</>
					<br />
					<>- • {formattedBodyParams.height}</>
					<br />
					<b>Id: </b>
					{activeTriplet.experiment.id}
					<br />
					<b>Info extra: </b>
					<p>{activeTriplet.experiment.extra_info}</p>
				</React.Fragment>
			);
		} catch (error) {
			return;
		}
	};

	const activateNextExperiment = () => {
		try {
			objectList.forEach((triplet) => {
				if (triplet !== activeTriplet) {
					setActiveTriplet(triplet);
					return;
				}
			});
		} catch (error) {}
	};

	const removeActiveExperiment = () => {
		try {
			const newCartData = objectList.filter(
				(d) => d.experiment.id !== activeTriplet.experiment.id
			);

			setObjectList(newCartData, activateNextExperiment());
		} catch (error) {}
	};

	useEffect(() => {
		if (objectList.length === 0) {
			setActiveTriplet({});
			return;
		} else if (objectList.length === 1) {
			setActiveTriplet(objectList[0]);
		}
	}, [objectList]);

	const getStyleColor = () => {
		try {
			return activeTriplet.color;
		} catch (error) {
			return "var(--primary_color)";
		}
	};

	return (
		<div className={styleModule.material_inspector}>
			<div className={styleModule.material_inspector_header}>
				<button
					className={styleModule.delete_material_button}
					onClick={removeActiveExperiment}
				></button>
				<div className={styleModule.material_inspector_header_text}>
					{makeMaterialIdText()} {makeHeaderText()}
				</div>
				<div
					className={styleModule.material_inspector_header_color}
					style={{ "--experiment_color": getStyleColor() }}
				>
					<ColorIcon
						className={
							styleModule.material_inspector_header_color_icon
						}
					/>
				</div>
			</div>
			<div className={styleModule.material_inspector_content}>
				<div className={styleModule.material_inspector_search_area}>
					<ul
						className={
							styleModule.material_inspector_search_area_ul
						}
					>
						{makeButtons()}
					</ul>
				</div>
				<div className={styleModule.material_inspector_description}>
					{makeMaterialText()}
				</div>
			</div>
		</div>
	);
}
