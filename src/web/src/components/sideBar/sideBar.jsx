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
import { eel } from "../../App";
import styleModule from "./sideBar.module.css";

import Header from "../header/header";

import InicioIcon from "./resources/InicioIcon.svg";
import CalibrarIcon from "./resources/CalibrarIcon.svg";
import ControlarIcon from "./resources/ControlarIcon.svg";
import ConfigIcon from "./resources/ConfigIcon.svg";
import SobreIcon from "./resources/SobreIcon.svg";

async function printOne() {
	let returnValue = await eel.get_one()();
	returnValue += 20;
	alert(returnValue);
}

function SideBar({ initialPage = "Início" }) {
	const [currentPage, setCurrentPage] = useState(initialPage);
	const buttonNames = ["Início", "Calibrar", "Controlar", "Config.", "Sobre"];

	printOne();

	const changePage = (event) => {
		const buttonId = event.currentTarget.id;
		if (buttonId === currentPage) return;
		setCurrentPage(buttonId);
	};
	const getButtonAttrib = (buttonName) => {
		const buttonStyle =
			currentPage === buttonName
				? [
						styleModule.side_bar_button,
						styleModule.side_bar_button_active,
				  ]
				: [
						styleModule.side_bar_button,
						styleModule.side_bar_button_inactive,
				  ];

		return buttonStyle.join(" ");
	};
	const createButton = (buttonName) => {
		let imgPath;
		switch (buttonName) {
			case "Início":
				imgPath = InicioIcon;
				break;
			case "Calibrar":
				imgPath = CalibrarIcon;
				break;
			case "Controlar":
				imgPath = ControlarIcon;
				break;
			case "Config.":
				imgPath = ConfigIcon;
				break;
			case "Sobre":
				imgPath = SobreIcon;
				break;
			default:
				imgPath = InicioIcon;
		}

		return (
			<button
				className={getButtonAttrib(buttonName)}
				id={buttonName}
				onClick={changePage}
			>
				<img
					className={styleModule.side_bar_button_icon}
					src={imgPath}
					alt={buttonName}
				/>
				{buttonName}
			</button>
		);
	};

	return (
		<div className={styleModule.side_bar}>
			<Header />
			<ul className={styleModule.side_bar_button_ul}>
				{buttonNames.map((bName) => (
					<li key={bName} className={styleModule.side_bar_button_li}>
						{createButton(bName)}
					</li>
				))}
			</ul>
			<div className={styleModule.side_bar_footer}></div>
		</div>
	);
}

export default SideBar;
