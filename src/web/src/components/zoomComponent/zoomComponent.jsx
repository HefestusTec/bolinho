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
import React, { useState, useContext } from "react";
import { useLongPress } from "use-long-press";

import styleModule from "./zoomComponent.module.css";

import GlobalConfigContext from "../../contexts/globalConfigContext";

export default function ZoomComponent({
	scaleOrigin = "top",
	className = "",
	children,
}) {
	const [globalConfig] = useContext(GlobalConfigContext);

	const [isActive, setIsActive] = useState(false);
	const usedZoom = () => {
		setIsActive(!isActive);
	};
	const bindLongPress = useLongPress(usedZoom, {
		cancelOnMovement: true,
		captureEvent: true,
		threshold: globalConfig.zoomDelay,
	});

	const fallBackPressed = () => {
		setIsActive(false);
	};

	const getStyle = () => {
		if (isActive) {
			return {
				"transform-origin": scaleOrigin,
				"transition-duration": "var(--animation_slow)",
				transform: "scale(var(--zoom_scale))",
				"z-index": "2",
			};
		}

		return {
			"transform-origin": scaleOrigin,
			"transition-duration": "var(--animation_slow)",
		};
	};
	const getClassName = () => {
		return [styleModule.zoom_component, className].join(" ");
	};

	const createFallBack = () => {
		const removeBlur = {
			"--blur_amount": "0px",
		};
		if (isActive) {
			return (
				<div
					className={styleModule.fall_back}
					onClick={fallBackPressed}
					style={globalConfig.blurOnZoom ? {} : removeBlur}
				></div>
			);
		}
		return;
	};

	return (
		<React.Fragment>
			<div
				className={getClassName()}
				style={getStyle()}
				{...bindLongPress()}
			>
				{children}
			</div>
			{createFallBack()}
		</React.Fragment>
	);
}
