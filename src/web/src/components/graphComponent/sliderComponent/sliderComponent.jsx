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
import Slider from "rc-slider";
import styleModule from "./sliderComponent.module.css";

function SliderComponent({ setChartMinMax, dataRightMax = 100 }) {
	function handleChange(event) {
		setChartMinMax(event[0], event[1]);
	}
	return (
		<Slider
			className={styleModule.slider}
			ariaLabelForHandle={"zoom-in-out"}
			range
			draggableTrack
			pushable={3}
			max={dataRightMax}
			defaultValue={[0, 100]}
			onChange={handleChange}
			trackStyle={{
				backgroundColor: "#6d6d6d",
				cursor: "e-resize",
				height: "1.5vh",
				opacity: "40%",
			}}
			railStyle={{
				height: "1.5vh",
				backgroundColor: "#bdbdbd",
				opacity: "20%",
			}}
			handleStyle={{
				border: "none",
				backgroundColor: "#FFFFFF",
				opacity: 1,
				height: "3vh",
				width: "2.5vw",
				boxShadow: "0px 0px 2px 2px rgba(0, 0, 0, 0.25)",
				marginTop: "-0.9vh",
				borderRadius: 5,
			}}
		></Slider>
	);
}

export default SliderComponent;
