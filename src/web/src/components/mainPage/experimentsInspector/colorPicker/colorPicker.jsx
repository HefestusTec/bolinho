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
import { HexColorPicker } from "react-colorful";
import ClickAwayListener from "react-click-away-listener";
import { useDebouncedCallback } from "use-debounce";

import styleModule from "./colorPicker.module.css";

export default function ColorPicker({
	activeTriplet,
	setActiveTriplet,
	colorPickerIsActive,
	setColorPickerIsActive,
	deactivateColorPicker,
	updateDataColor,
}) {
	const [currentColor, setCurrentColor] = useState("#FFFFFF");
	const [changing, setChanging] = useState(false);

	// Debouncer allows to dynamically update the data color without having to update every frame
	const debounced = useDebouncedCallback(
		// function
		() => {
			setChanging(false);
			updateDataColor();
		},
		// delay in ms
		300
	);

	const colorChanged = (newColor) => {
		debounced(newColor);
		setChanging(true);
		setCurrentColor(newColor);
		try {
			let activeTripletCopy = { ...activeTriplet };
			activeTripletCopy.color = newColor;
			setActiveTriplet(activeTripletCopy);
		} catch (error) {}
	};

	const clickedOut = () => {
		if (!changing) deactivateColorPicker();
	};

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

	return (
		<React.Fragment>
			<div className={makeClassName()}>
				<ClickAwayListener onClickAway={clickedOut}>
					<HexColorPicker
						color={currentColor}
						onChange={colorChanged}
					>
						{makeBackDrop()}
					</HexColorPicker>
				</ClickAwayListener>
			</div>
		</React.Fragment>
	);
}
