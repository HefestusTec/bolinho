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

import { CSSProperties, FunctionComponent, ReactNode } from "react";
import CustomButton from "../customButton/customButton";
import React from "react";

interface CustomButtonArrayProps {
    children?: ReactNode | ReactNode[];
}
const isCustomButton = (
    child: ReactNode
): child is React.ReactElement<typeof CustomButton> => {
    return React.isValidElement(child) && child.type === CustomButton;
};

const CustomButtonArray: FunctionComponent<CustomButtonArrayProps> = ({
    children,
}) => {
    const validChildren =
        React.Children.toArray(children).filter(isCustomButton);

    const divStyle: CSSProperties = {
        width: "90%",
        display: "flex",
        height: "7vh",
        minHeight: "calc(var(--font_m) * 2.7)",
        paddingLeft: "5%",
        marginBottom: "2vh",
        gap: "20px",
        justifyContent: "center",
    };

    return <div style={divStyle}>{validChildren}</div>;
};

export default CustomButtonArray;
