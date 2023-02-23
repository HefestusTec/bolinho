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
import React, { useContext } from "react";
import styleModule from "./subPage.module.css";

import BackgroundFader from "../backgroundFader/backgroundFader";
import ConfigPage from "../configPage/configPage";
import GlobalConfigContext from "../../contexts/globalConfigContext";

export default function SubPage({ currentPage, setCurrentPage }) {
	const [globalConfig] = useContext(GlobalConfigContext);

	const getPage = () => {
		switch (currentPage) {
			case "Início":
				return;
			case "Calibrar":
				break;
			case "Controlar":
				break;
			case "Config.":
				return <ConfigPage></ConfigPage>;
			case "Sobre":
				break;
			default:
				return;
		}
	};

	const getBackgroundFader = () => {
		if (currentPage !== "Início")
			return (
				<BackgroundFader
					callbackFunc={() => setCurrentPage("Início")}
					fullscreen={false}
				/>
			);
	};

	return (
		<React.Fragment>
			<div className={styleModule.sub_page_div}>{getPage()}</div>;
			{getBackgroundFader()}
		</React.Fragment>
	);
}
