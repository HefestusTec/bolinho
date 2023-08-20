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
import React, { useMemo, lazy, Suspense, FunctionComponent } from "react";
import styleModule from "./subPage.module.css";

import BackgroundFader from "../backgroundFader/backgroundFader";
import { PagesEnum } from "types/PagesEnum";
import ControlPage from "pages/ControlPage/ControlPage";
import CalibratePage from "pages/CalibratePage/CalibratePage";

const ConfigPage = lazy(() => import("../../pages/ConfigPage/ConfigPage"));
const AboutPage = lazy(() => import("../../pages/AboutPage/AboutPage"));

interface SubPageProps {
    myPage: PagesEnum;
    currentPage: PagesEnum;
    setCurrentPage: (page: PagesEnum) => void;
}

const SubPage: FunctionComponent<SubPageProps> = ({
    myPage,
    currentPage,
    setCurrentPage,
}) => {
    const getPage = useMemo(() => {
        switch (myPage) {
            case "Início":
                return;
            case "Calibrar":
                return <CalibratePage key={myPage}></CalibratePage>;
            case "Controlar":
                return <ControlPage key={myPage}></ControlPage>;
            case "Configurar":
                return <ConfigPage key={myPage}></ConfigPage>;
            case "Sobre":
                return <AboutPage key={myPage}></AboutPage>;
            default:
                return;
        }
    }, [myPage]);

    const createSubPage = useMemo(() => {
        if (currentPage === myPage) {
            return (
                <React.Fragment>
                    <BackgroundFader
                        callbackFunc={() => setCurrentPage("Início")}
                        fullscreen={false}
                        faderIndex={1}
                    />
                    <div className={styleModule.sub_page_div}>
                        <header className={styleModule.sub_page_header}>
                            <div className={styleModule.sub_page_header_text}>
                                {myPage}
                            </div>
                        </header>
                        <div className={styleModule.sub_page_content}>
                            <Suspense fallback={<div>Carregando...</div>}>
                                {getPage}
                            </Suspense>
                        </div>
                    </div>
                </React.Fragment>
            );
        }
    }, [currentPage, myPage, getPage, setCurrentPage]);

    return createSubPage;
};

export default SubPage;
