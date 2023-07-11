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
import styleModule from "./customCheckbox.module.css";

interface CustomCheckboxProps {
    children: any;
    clickCallBack: () => void;
    className: string;
    checked: boolean;
}

const CustomCheckbox: FunctionComponent<CustomCheckboxProps> = ({
    children,
    className,
    clickCallBack,
    checked,
}) => {
    const getClassName = () => {
        return [styleModule.custom_checkbox_div, className].join(" ");
    };

    const clicked = () => {
        if (clickCallBack !== undefined) {
            clickCallBack();
        }
    };

    return (
        <div className={getClassName()}>
            <button className={styleModule.custom_button} onClick={clicked}>
                {children}
            </button>

            <input type="checkbox" checked={checked} onChange={clicked} />
        </div>
    );
};

export default CustomCheckbox;
