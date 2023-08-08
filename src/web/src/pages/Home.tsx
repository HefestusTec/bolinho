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

import { getMaterialsDB } from "api/db-api";
import MainPage from "components/mainPage/mainPage";
import SideBar from "components/sideBar/sideBar";
import SubPage from "components/subPage/subPage";
import React from "react";
import { FunctionComponent, useEffect, useState } from "react";
import { MaterialType } from "types/DataBaseTypes";
import { PagesEnum } from "types/PagesEnum";

interface homeProps {}

const Home: FunctionComponent<homeProps> = () => {
    const pageList: PagesEnum[] = [
        "Início",
        "Calibrar",
        "Controlar",
        "Configurar",
        "Sobre",
    ];
    // options "Início", "Calibrar", "Controlar", "Config.", "Sobre"
    const [currentPage, setCurrentPage] = useState<PagesEnum>("Início");
    const [materialList, setMaterialList] = useState<MaterialType[]>([]);

    const createSubPages = () => {
        return pageList.map((item) => {
            if (currentPage !== "Início") {
                return (
                    <SubPage
                        key={"page" + item.toString()}
                        myPage={item}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                );
            }
            return undefined;
        });
    };
    useEffect(() => {
        getMaterialsDB().then((response) => {
            setMaterialList(response);
        });
    }, []);
    return (
        <React.Fragment>
            <SideBar
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pageList={pageList}
            />
            <div className="content_area">
                <MainPage materialList={materialList} />
                {createSubPages()}
            </div>
        </React.Fragment>
    );
};

export default Home;
