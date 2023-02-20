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
import { HexColorPicker } from "react-colorful";
import SelectedObjectsContext from "../../contexts/selectedObjectsContext";
import styleModule from "./colorPicker.module.css";

export default function ColorPicker({
	activeTriplet,
	setActiveTriplet,
	colorPickerIsActive,
	setColorPickerIsActive,
}) {
	const [currentColor, setCurrentColor] = useState("#FFFFFF");
	const [objectList, setObjectList] = useContext(SelectedObjectsContext);

	useEffect(() => {
		try {
			let activeTripletCopy = { ...activeTriplet };
			activeTripletCopy.color = currentColor;
			setActiveTriplet(activeTripletCopy);
		} catch (error) {}
	}, [currentColor]);

	useEffect(() => {
		if (colorPickerIsActive === false) {
			try {
				let objectListCopy = [...objectList];
				const idx = objectListCopy.findIndex(
					(element) =>
						element.experiment.id === activeTriplet.experiment.id
				);
				objectListCopy.at(idx).color = currentColor;
				setObjectList(objectListCopy);
			} catch (error) {}
		}
	}, [colorPickerIsActive]);

	const makeClassName = () => {
		if (colorPickerIsActive)
			return [
				styleModule.color_picker_div,
				styleModule.color_picker_div_active,
			].join(" ");
		return styleModule.color_picker_div;
	};

	const closeColorPicker = () => {
		setColorPickerIsActive(false);
	};

	const makeBackDrop = () => {
		if (colorPickerIsActive)
			return (
				<div
					className={styleModule.color_picker_back_drop}
					onClick={closeColorPicker}
				></div>
			);
		return;
	};

	// TODO detect click outside component and close
	return (
		<React.Fragment>
			<div className={makeClassName()}>
				<HexColorPicker color={currentColor} onChange={setCurrentColor}>
					{makeBackDrop()}
				</HexColorPicker>
				<button>Aplicar</button>
			</div>
		</React.Fragment>
	);
}
