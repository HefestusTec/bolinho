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

import styleModule from "./materialSelector.module.css";
import MaterialSelectorButton from "./materialSelectorButton/materialSelectorButton";

function MaterialSelector() {
	//const [graphData, setGraphData] = useState(makeConstData());

	return (
		<div className={styleModule.material_selector_component}>
			<div className={styleModule.selector_header}>
				<div className={styleModule.selector_header_text}>
					Selecionar Material
				</div>
			</div>
			<ul className={styleModule.selector_content_ul}>
				<MaterialSelectorButton />
				<MaterialSelectorButton />
				<MaterialSelectorButton />
				<MaterialSelectorButton />
				<MaterialSelectorButton />
				<MaterialSelectorButton />
				<MaterialSelectorButton />
				<MaterialSelectorButton />
				<MaterialSelectorButton />
				<MaterialSelectorButton />
				<MaterialSelectorButton />
				<MaterialSelectorButton />
				<MaterialSelectorButton />
			</ul>
		</div>
	);
}
export default MaterialSelector;
