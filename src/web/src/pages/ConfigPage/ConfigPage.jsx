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
import styleModule from "./configPage.module.css";

import ThemeSelector from "./themeSelector/themeSelector";
import VfxContainer from "./vfxContainer/vfxContainer";
import GlobalLimits from "./globalLimits/globalLimits";
import OtherSelector from "./otherSelector/otherSelector";

export default function ConfigPage() {
    return (
        <React.Fragment>
            <ThemeSelector
                className={styleModule.theme_selector}
                scaleOrigin="top left"
            />
            <VfxContainer
                className={styleModule.animation_selector}
                scaleOrigin="top right"
            />
            <GlobalLimits
                className={styleModule.global_limits}
                scaleOrigin="bottom left"
            />
            <OtherSelector
                className={styleModule.other_selector}
                scaleOrigin="bottom right"
            />
        </React.Fragment>
    );
}
