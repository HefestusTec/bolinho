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

import styleModule from "./materialsInspector.module.css";

function MaterialsInspector() {
	return (
		<div className={styleModule.material_inspector}>
			<div className={styleModule.material_inspector_header}>
				<div className={styleModule.material_inspector_header_text}>
					[592] Aço carbono 12
				</div>
				<div
					className={styleModule.material_inspector_header_color}
				></div>
			</div>
			<div className={styleModule.material_inspector_content}>
				<div className={styleModule.material_inspector_serch_area}>
					serch area
				</div>
				<div className={styleModule.material_inspector_description}>
					Material: Aço carbono Lote: 1202 Fornecedor: MinasLTDA
					Ensaio: 02 Lorem ipsum dolor sit amet, consectetur
					adipiscing elit. Nullam malesuada placerat fringilla. Ut
					viverra, nulla vitae egestas .
				</div>
			</div>
		</div>
	);
}

export default MaterialsInspector;
