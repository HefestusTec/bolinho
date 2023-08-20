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
import styleModule from "./BigButton.module.css";

interface BigButtonProps {
    clickCallBack: () => void;
    buttonText?: string;
    bgColor?: string;
    fontSize?: string;
    fontWeight?: string;
    fontColor?: string;
    height?: string;
    width?: string;
    disabled?: boolean;
}

const BigButton: FunctionComponent<BigButtonProps> = ({
    clickCallBack,
    buttonText,
    bgColor = "red",
    fontSize = "var(--font_l)",
    fontWeight = "700",
    fontColor = "var(--font_color_inverted)",
    height = "100%",
    width = "100%",
    disabled,
}) => {
    const divStyle: React.CSSProperties = {
        display: "flex",
        alignItems: "center",
        height: "100%",
        width: "100%",
    };
    const buttonStyle: React.CSSProperties = {
        backgroundColor: disabled ? "var(--background2_color)" : bgColor,
        fontSize: fontSize,
        fontWeight: fontWeight,
        color: fontColor,
        pointerEvents: disabled ? "none" : "inherit",
        boxShadow: disabled ? "none" : "",
        height: height,
        width: width,
    };
    return (
        <div style={divStyle}>
            <button
                style={buttonStyle}
                className={styleModule.big_button}
                onClick={clickCallBack}
                disabled={disabled}
            >
                {buttonText}
            </button>
        </div>
    );
};

export default BigButton;
