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
import { GlobalConfigContextProps } from "api/apiTypes";
import { Dispatch, SetStateAction, createContext } from "react";

export const globalConfigDefault: GlobalConfigContextProps = {
    configVersion: 1, // Version number of the config file
    theme: "Claro", // Claro | Escuro | Meia Noite
    animationSpeed: "Normal", // Rápido | Normal | Desligado
    fontSize: "100%", // 50% | 75% | 100% | 125% | 150% | 200%
    enableZoom: true, // Should zooming be enable?
    zoomDelay: 500, // How long [ms] should I press to zoom
    backgroundBlur: true, // Should it blur when zooming?
    shadows: true, // Should it render shadows
    forceVirtualKeyboard: false, // Should it use the virtual keyboard as input
    enableHover: "enable", // enable | disable
    absoluteMaximumForce: 10000,
    port: "",
};

const GlobalConfigContext = createContext<
    [
        GlobalConfigContextProps,
        Dispatch<SetStateAction<GlobalConfigContextProps>>
    ]
>([globalConfigDefault, () => {}]);

export default GlobalConfigContext;
