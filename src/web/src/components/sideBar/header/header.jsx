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
import styleModule from "./header.module.css";
import { useMemo } from "react";

function Header() {
    const currentYear = useMemo(()=>new Date().getFullYear(),[])

    return (
        <div className={styleModule.header}>
            <div className={styleModule.header_logo} />
            <div className={styleModule.header_text}>
                <div className={styleModule.header_name}>Bolinho</div>
                <div className={styleModule.header_copyright}>
                    Copyright © {currentYear} Hefestus &nbsp;&nbsp;
                </div>
            </div>
        </div>
    );
}
export default Header;
