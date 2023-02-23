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
import GlobalConfigContext from "../../contexts/globalConfigContext";

import BackgroundFader from "../backgroundFader/backgroundFader";

export default function ZoomComponent({
	scaleOrigin = "top",
	className = "",
	children,
}) {
	const [globalConfig] = useContext(GlobalConfigContext);

	const [isActive, setIsActive] = useState(false);
	const [canZoom, setCanZoom] = useState(true);
	const [zIndexVal, setZIndexVal] = useState("inherit");
	const usedZoom = () => {
		if (canZoom) setIsActive(!isActive);
	};

	const resetCanZoom = () => {
		setCanZoom(true);
	};

	const bindLongPress = useLongPress(usedZoom, {
		cancelOnMovement: 1,
		captureEvent: true,
		threshold: globalConfig.zoomDelay,
		onFinish: resetCanZoom,
		onStart: resetCanZoom,
	});

	const fallBackPressed = () => {
		setIsActive(false);
	};

	const getStyle = () => {
		if (isActive) {
			return {
				transformOrigin: scaleOrigin,
				transitionDuration: "var(--animation_slow)",
				transform: "scale(var(--zoom_scale))",
				zIndex: 10,
			};
		}

		return {
			transformOrigin: scaleOrigin,
			transitionDuration: "var(--animation_slow)",
			"z-index": zIndexVal,
		};
	};

	const createFallBack = () => {
		if (isActive) {
			return <BackgroundFader callbackFunc={fallBackPressed} />;
		}
		return;
	};
	const scrolled = (event) => {
		if (event) {
			setCanZoom(false);
		}
	};

	const transitioned = (property) => {
		if (property.propertyName === "transform") {
			if (!isActive) setZIndexVal("inherit");
			else setZIndexVal("10");
		}
	};

	return (
		<React.Fragment>
			<div
				className={className}
				style={getStyle()}
				{...bindLongPress()}
				onScrollCapture={scrolled}
				onTransitionEndCapture={transitioned}
			>
				{children}
			</div>
			{createFallBack()}
		</React.Fragment>
	);
}
