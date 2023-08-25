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

import { FocusContext } from "api/contexts/FocusContex";
import MainPage from "components/mainPage/mainPage";
import SideBar from "components/sideBar/sideBar";
import SubPage from "components/subPage/subPage";
import RefreshDataProvider from "api/contexts/RefreshContext";
import React, { useContext, useEffect } from "react";
import { FunctionComponent, useState } from "react";
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
    const [focus, setFocus] = useContext(FocusContext);

    useEffect(() => {
        switch (focus) {
            case "config-page":
                setCurrentPage("Configurar");
                setFocus("none");
                break;
            case "calib-page":
                setCurrentPage("Calibrar");
                setFocus("none");
                break;
            default:
                break;
        }
    }, [focus, setFocus]);

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

    return (
        <RefreshDataProvider>
            <SideBar
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pageList={pageList}
            />
            <div className="content_area">
                <MainPage />
                {createSubPages()}
            </div>
        </RefreshDataProvider>
    );
};

export default Home;
