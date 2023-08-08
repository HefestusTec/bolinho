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

export interface GlobalConfigContextProps {
    configVersion: number; // Version number of the config file
    theme: "Claro" | "Escuro" | "Meia Noite"; // Claro | Escuro | Meia Noite
    animationSpeed: "Rápido" | "Normal" | "Desligado"; // Rápido | Normal | Desligado
    fontSize: "50%" | "75% " | "100%" | "125%" | "150%" | "200%"; // 50% | 75% | 100% | 125% | 150% | 200%
    enableZoom: boolean; // Should zooming be enable?
    zoomDelay: number; // How long [ms] should I press to zoom
    backgroundBlur: boolean; // Should it blur when zooming?
    shadows: boolean; // Should it render shadows
    forceVirtualKeyboard: boolean; // Should it use the virtual keyboard as input
    enableHover: "enable" | "disable";
    absoluteMaximumForce: number;
    absoluteMaximumTime: number;
    absoluteMaximumTravel: number;
    port: string;
    animateGraph: boolean;
}

export type FocusKeyType =
    | "connection-component"
    | "material-inspector"
    | "config-page"
    | "none";
