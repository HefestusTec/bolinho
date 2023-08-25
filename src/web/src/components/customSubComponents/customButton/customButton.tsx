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
import styleModule from "./customButton.module.css";

interface CustomButtonProps {
    children?: any;
    clickCallBack?: (param: any) => void;
    className?: string;
    bgColor?: string;
    fontColor?: string;
    fontSize?: string;
    maxWidth?: string;
    width?: string;
    padding?: string;
}

const CustomButton: FunctionComponent<CustomButtonProps> = ({
    children,
    clickCallBack,
    className,
    bgColor,
    fontColor,
    fontSize = "var(--font_m)",
    maxWidth = "100%",
    width,
    padding,
}) => {
    const getClassName = () => {
        return [className, styleModule.custom_button].join(" ");
    };

    const clicked = () => {
        if (clickCallBack) clickCallBack(children);
    };

    return (
        <button
            className={getClassName()}
            onClick={clicked}
            style={{
                backgroundColor: bgColor,
                color: fontColor,
                fontSize: fontSize,
                maxWidth: maxWidth,
                width: width,
                padding: padding,
            }}
        >
            {children}
        </button>
    );
};

export default CustomButton;
