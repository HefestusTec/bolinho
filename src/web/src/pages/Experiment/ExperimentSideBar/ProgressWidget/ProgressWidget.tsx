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
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

interface ProgressWidgetProps {
    value: number;
    title: string;
}

const ProgressWidget: FunctionComponent<ProgressWidgetProps> = ({
    value,
    title,
}) => {
    const divStyle: React.CSSProperties = {
        backgroundColor: "var(--primary_color_shader)",
        padding: "10px",
        borderRadius: "10px",
        boxShadow: "0px 2px 2px 0px rgba(0, 0, 0, 0.25)",
    };
    const contentStyle: React.CSSProperties = {
        display: "flex",
        flexDirection: "column",
        color: "var(--font_color_inverted)",
        fontSize: "var(--font_m)",
        alignItems: "center",
        gap: "5px",
    };
    return (
        <div style={divStyle}>
            <div style={contentStyle}>
                {title}
                <b>
                    <CircularProgressbar
                        value={value}
                        text={`${value}%`}
                        styles={buildStyles({
                            textColor: "var(--positive_button_color)",
                            pathColor: "var(--positive_button_color)",
                        })}
                    />
                </b>{" "}
            </div>
        </div>
    );
};

export default ProgressWidget;
