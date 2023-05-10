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
import React, { useContext, useMemo } from "react";
import styleModule from "./backgroundFader.module.css";

import GlobalConfigContext from "../../contexts/globalConfigContext";

export default function BackgroundFader({
    callbackFunc,
    fullscreen = true,
    faderIndex = 2,
}) {
    const [globalConfig] = useContext(GlobalConfigContext);

    const getBackgroundStyle = useMemo(() => {
        if (!fullscreen) {
            return {
                "--position_type": "absolute",
                "--fader_index": faderIndex,
            };
        }
        return { "--fader_index": faderIndex };
    }, [fullscreen, faderIndex]);

    const getClassName = useMemo(() => {
        if (globalConfig.backgroundBlur)
            return [styleModule.background, styleModule.blur].join(" ");

        return styleModule.background;
    }, [globalConfig.backgroundBlur]);

    return (
        <div
            className={getClassName}
            onClick={callbackFunc}
            style={getBackgroundStyle}
        ></div>
    );
}
