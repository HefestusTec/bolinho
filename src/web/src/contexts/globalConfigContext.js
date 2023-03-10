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
import { createContext } from "react";

export const globalConfigDefault = {
    theme: "Claro", // Claro | Escuro
    animationSpeed: "slow", // fast | slow | off
    animateGraph: "on", // on | off
    enableZoom: true, // Should zooming be enable?
    zoomDelay: 500, // How long [ms] should I press to zoom
    backgroundBlur: true, // Should it blur when zooming?
    absoluteMaximumForce: 10000,
};

const GlobalConfigContext = createContext([globalConfigDefault, () => {}]);

export default GlobalConfigContext;
