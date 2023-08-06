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
import { FunctionComponent } from "react";
import styleModule from "./AboutPage.module.css";

interface AboutPageProps {}

const AboutPage: FunctionComponent<AboutPageProps> = () => {
    return (
        <span className={styleModule.about_content}>
            <h1>Licença</h1>
            <p style={{ textAlign: "center" }}>
                Copyright (C) 2023 Hefestus
                <br />
                <br />
                Bolinho is free software: you can redistribute it and/or modify
                it under the terms of the GNU General Public License as
                published by the Free Software Foundation, either version 3 of
                the License, or (at your option) any later version.
                <br />
                <br />
                Bolinho is distributed in the hope that it will be useful, but
                WITHOUT ANY WARRANTY; without even the implied warranty of
                MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
                General Public License for more details.
                <br />
                <br />
                You should have received a copy of the GNU General Public
                License along with Bolinho. If not, see &nbsp;
                <a href="http://www.gnu.org/licenses/" target="_blank">
                    http://www.gnu.org/licenses/
                </a>
                .
            </p>
        </span>
    );
};

export default AboutPage;
