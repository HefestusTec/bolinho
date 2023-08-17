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
import React, { FunctionComponent, useEffect, useMemo, useState } from "react";

import styleModule from "./materialSelector.module.css";
import MaterialSelectorButton from "./materialSelectorButton/materialSelectorButton";
import { MaterialType } from "types/DataBaseTypes";
import CustomButton from "components/customSubComponents/customButton/customButton";
import CreateMaterialComponent from "./createMaterialComponent/createMaterialComponent";
import { getMaterialsDB } from "api/db-api";

interface MaterialSelectorProps {}

const MaterialSelector: FunctionComponent<MaterialSelectorProps> = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [materialList, setMaterialList] = useState<MaterialType[]>([]);

    const [searchQuery, setSearchQuery] = useState<string>("");

    const filteredItems = useMemo(() => {
        return materialList.filter((item) => {
            return item.name.toLowerCase().includes(searchQuery.toLowerCase());
        });
    }, [materialList, searchQuery]);

    useEffect(() => {
        getMaterialsDB().then((response) => {
            setMaterialList(response);
        });
    }, []);

    const createButton = (material: MaterialType, idx: number) => {
        return (
            <MaterialSelectorButton
                key={"m_" + material.name + idx}
                material={material}
            />
        );
    };

    const makeButtons = () => {
        return filteredItems.map((element, idx) => createButton(element, idx));
    };

    return (
        <div className={styleModule.material_selector}>
            <div className={styleModule.selector_header}>
                <div className={styleModule.selector_header_text}>
                    Meus Experimentos
                </div>
                <div className={styleModule.selector_header_bottom}>
                    <span className={styleModule.selector_header_search_bar}>
                        <input
                            type="text"
                            className={styleModule.selector_header_search}
                            placeholder="Buscar"
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                            }}
                        />
                        <button
                            className={
                                styleModule.selector_header_search_button
                            }
                            aria-label="Search Button"
                        ></button>
                    </span>
                    <CustomButton
                        clickCallBack={() => {
                            setIsDropdownOpen(!isDropdownOpen);
                        }}
                        className={styleModule.expand_button}
                    >
                        Novo
                    </CustomButton>
                </div>
                {isDropdownOpen ? <CreateMaterialComponent /> : <></>}
            </div>
            <ul className={styleModule.selector_content_ul}>{makeButtons()}</ul>
        </div>
    );
};

export default MaterialSelector;
