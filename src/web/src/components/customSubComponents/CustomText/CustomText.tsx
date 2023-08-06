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

import { FunctionComponent } from "react";
import styleModule from "./CustomText.module.css";

interface CustomTextProps {
    title?: string;
    value?: string;
}

const CustomText: FunctionComponent<CustomTextProps> = ({ title, value }) => {
    return (
        <div className={styleModule.custom_text_div}>
            <div className={styleModule.custom_text_title}>{title}</div>
            <div className={styleModule.custom_text_value}>{value}</div>
        </div>
    );
};

export default CustomText;
