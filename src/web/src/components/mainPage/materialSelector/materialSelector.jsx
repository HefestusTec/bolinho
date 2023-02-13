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

import styleModule from "./materialSelector.module.css";
import MaterialSelectorButton from "./materialSelectorButton/materialSelectorButton";

function MaterialSelector({ materialList }) {
	//const [graphData, setGraphData] = useState(makeConstData());
	const createButton = (material) => {
		return (
			<MaterialSelectorButton
				material={material}
			></MaterialSelectorButton>
		);
	};

	const makeButtons = () => {
		let buttonArray = [];
		console.log("app ", materialList);

		try {
			materialList.forEach((element) => {
				buttonArray.push(createButton(element));
			});
		} catch (error) {}
		return buttonArray;
	};

	return (
		<div className={styleModule.material_selector}>
			<div className={styleModule.selector_header}>
				<div className={styleModule.selector_header_text}>
					Selecionar Material
				</div>
				<div className={styleModule.selector_header_bottom}>
					<input
						type="text"
						className={styleModule.selector_header_search}
						placeholder="Buscar"
					></input>
					<button
						className={styleModule.selector_header_search_button}
						aria-label="Search Button"
					></button>
					<div className={styleModule.selector_header_filter}>
						<button
							className={
								styleModule.selector_header_filter_button
							}
							aria-label="Filter Button"
						></button>
					</div>
				</div>
			</div>
			<ul className={styleModule.selector_content_ul}>{makeButtons()}</ul>
		</div>
	);
}
export default MaterialSelector;
