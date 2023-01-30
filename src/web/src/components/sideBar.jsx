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

import React, { Component } from "react";
import { eel } from "../App";
import "./sideBar.css";

import InicioIcon from "./resources/InicioIcon.svg";
import CalibrarIcon from "./resources/CalibrarIcon.svg";
import ControlarIcon from "./resources/ControlarIcon.svg";
import ConfigIcon from "./resources/ConfigIcon.svg";
import SobreIcon from "./resources/SobreIcon.svg";

import LogoBolinho512 from "./resources/LogoBolinho512.png";

async function printOne() {
	let returnValue = await eel.get_one()();
	returnValue += 20;
	alert(returnValue);
}

class SideBar extends Component {
	state = {
		currentPage: "Início",
		buttonNames: ["Início", "Calibrar", "Controlar", "Config", "Sobre"],
	};
	render() {
		printOne();
		return (
			<div className="side-bar">
				<div className="side-bar-header">Bolinho</div>
				<ul className="side-bar-button-ul">
					{this.state.buttonNames.map((bName) => (
						<li key={bName} className="side-bar-button-li">
							{this.createButton(bName)}
						</li>
					))}
				</ul>
				<div className="side-bar-footer"></div>
			</div>
		);
	}

	getButtonAttrib(buttonName) {
		const { currentPage } = this.state;

		const buttonStyle = "side-bar-button side-bar-button-";

		return currentPage === buttonName
			? buttonStyle + "active"
			: buttonStyle + "inactive";
	}

	createButton(buttonName) {
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
			case "Config":
				imgPath = ConfigIcon;
				break;
			case "Sobre":
				imgPath = SobreIcon;
				break;
			default:
				imgPath = InicioIcon;
		}

		return (
			<button className={this.getButtonAttrib(buttonName)}>
				<img
					className="side-bar-button-icon"
					src={imgPath}
					alt={buttonName}
				/>
				{buttonName}
			</button>
		);
	}
}

export default SideBar;
