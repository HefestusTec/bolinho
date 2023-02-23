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
import React from "react";
import styleModule from "./subPage.module.css";

import BackgroundFader from "../backgroundFader/backgroundFader";
import ConfigPage from "../configPage/configPage";

export default function SubPage({ myPage, currentPage, setCurrentPage }) {
	const getPage = () => {
		switch (myPage) {
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

	const createSubPage = () => {
		if (currentPage === myPage) {
			return (
				<React.Fragment>
					<BackgroundFader
						callbackFunc={() => setCurrentPage("Início")}
						fullscreen={false}
						faderIndex={1}
					/>
					<div className={styleModule.sub_page_div}>
						<div className={styleModule.sub_page_header}>
							{myPage}
						</div>
						<div className={styleModule.sub_page_content}>
							{getPage()}
						</div>
					</div>
				</React.Fragment>
			);
		}
	};

	return createSubPage();
}
