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
import React, {
    CSSProperties,
    FunctionComponent,
    useContext,
    useMemo,
} from "react";
import styleModule from "./backgroundFader.module.css";

import GlobalConfigContext from "../../contexts/globalConfigContext";

interface BackgroundFaderProps {
    callbackFunc?: () => void;
    fullscreen?: boolean;
    faderIndex?: number;
    invisible?: boolean;
}

const BackgroundFader: FunctionComponent<BackgroundFaderProps> = ({
    callbackFunc,
    fullscreen = true,
    faderIndex = 2,
    invisible = false,
}) => {
    const [globalConfig] = useContext(GlobalConfigContext);

    const getBackgroundStyle = useMemo(() => {
        if (!fullscreen) {
            return {
                "--position_type": "absolute",
                "--fader_index": faderIndex,
                backgroundColor: invisible
                    ? "none !important"
                    : "rgba(0, 0, 0, 0.6)",
            } as CSSProperties;
        }
        return {
            "--fader_index": faderIndex,
            backgroundColor: invisible
                ? "none !important"
                : "rgba(0, 0, 0, 0.6)",
        } as CSSProperties;
    }, [fullscreen, faderIndex, invisible]);

    const getClassName = useMemo(() => {
        if (globalConfig.backgroundBlur)
            return [styleModule.background, styleModule.blur].join(" ");

        return styleModule.background;
    }, [globalConfig.backgroundBlur]);

    return (
        <div
            className={getClassName}
            onClick={() => {
                if (callbackFunc) callbackFunc();
            }}
            style={getBackgroundStyle}
        />
    );
};

export default BackgroundFader;
