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
function FpsMeter() {
	const [fps, setFps] = useState(0);

	const fpsMeterStyle = {
		position: "fixed",
		left: "0",
		top: "0",
		color: "white",
	};
	var startTime = Date.now();
	var frame = 0;

	function tick() {
		var time = Date.now();
		frame++;
		if (time - startTime > 1000) {
			setFps((frame / ((time - startTime) / 1000)).toFixed(1));
			startTime = time;
			frame = 0;
		}
		window.requestAnimationFrame(tick);
	}
	tick();

	return <div style={fpsMeterStyle}>fps: {fps}</div>;
}

export default FpsMeter;
