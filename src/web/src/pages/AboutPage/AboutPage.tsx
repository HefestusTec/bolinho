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
import LogoHefestus from "../../resources/LogoHefestus.png";
interface AboutPageProps {}

const AboutPage: FunctionComponent<AboutPageProps> = () => {
    return (
        <span
            className={styleModule.about_content}
            style={{
                overflowY: "scroll",
                height: "100%",
            }}
        >
            <h1>Licença</h1>
            <p style={{ textAlign: "center" }}>
                <div
                    style={{
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                    }}
                >
                    <img
                        src={LogoHefestus}
                        alt="Associação de Pesquisa, Desenvolvimento e Tecnologia Hefestus"
                        style={{
                            height: 200,
                            width: 200,
                        }}
                    />

                    <img
                        src="https://www.gnu.org/graphics/gplv3-127x51.png"
                        alt="GNU Public License v3 logo"
                        style={{
                            height: 51,
                            width: 127,
                        }}
                    />
                </div>
            </p>
            <p style={{ textJustify: "initial" }}>
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
                <a
                    href="http://www.gnu.org/licenses/"
                    target="_blank"
                    rel="noreferrer"
                >
                    http://www.gnu.org/licenses/
                </a>
                <h2>Repositórios</h2>
                <ul>
                    <li>
                        <a
                            href="https://github.com/HefestusTec/bolinho"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Bolinho
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://github.com/HefestusTec/granulado"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Granulado
                        </a>
                    </li>
                </ul>
                <h2>Time de desenvolvedores</h2>
                <ul>
                    <li>
                        <a
                            href="https://github.com/zRafaF"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Rafael (zRafaF) Farias Meneses
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://github.com/GPoleto27"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Guilherme (GPoleto27) Poleto
                        </a>
                    </li>
                </ul>
            </p>
        </span>
    );
};

export default AboutPage;
