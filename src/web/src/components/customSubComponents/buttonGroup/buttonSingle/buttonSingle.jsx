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
import styleModule from "./buttonSingle.module.css";

function ButtonSingle({
    preIcon,
    postIcon,
    color,
    iconSize,
    children,
    className,
    buttonKey,
    clickCallBack,
}) {
    const buttonStyle = { "--font_color": color };
    const iconStyle = {
        color: color ? color : "#000000",
        width: iconSize ? iconSize : "1em",
        height: iconSize ? iconSize : "1em",
        verticalAlign: "middle",
    };

    const createPreIcon = () => {
        if (preIcon) return <preIcon.type style={iconStyle} />;
        return;
    };

    const createPostIcon = () => {
        if (postIcon) return <postIcon.type style={iconStyle} />;
        return;
    };

    const getClassName = () => {
        return [className, styleModule.custom_button].join(" ");
    };

    const clicked = () => {
        if (clickCallBack !== undefined) {
            clickCallBack(buttonKey);
        }
    };

    return (
        <button
            className={getClassName()}
            style={buttonStyle}
            onClick={clicked}
        >
            {createPreIcon()} {children} {createPostIcon()}
        </button>
    );
}

export default ButtonSingle;
