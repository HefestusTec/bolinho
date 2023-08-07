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
import React, { FunctionComponent } from "react";

import styleModule from "./materialSelector.module.css";
import MaterialSelectorButton from "./materialSelectorButton/materialSelectorButton";
import { MaterialType } from "types/MaterialType";

interface MaterialSelectorProps {
    materialList: MaterialType[];
}

const MaterialSelector: FunctionComponent<MaterialSelectorProps> = ({
    materialList,
}) => {
    //const [graphData, setGraphData] = useState(makeConstData());
    const createButton = (material: MaterialType, idx: number) => {
        return (
            <MaterialSelectorButton
                key={"m_" + material.name.toString() + idx}
                material={material}
            />
        );
    };

    const makeButtons = () => {
        return materialList.map((element, idx) => createButton(element, idx));
    };

    return (
        <div className={styleModule.material_selector}>
            <div className={styleModule.selector_header}>
                <div className={styleModule.selector_header_text}>
                    Selecionar Experimento
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
};

export default MaterialSelector;
