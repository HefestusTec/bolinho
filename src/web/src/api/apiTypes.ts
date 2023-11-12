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

export type FontSizeType = "50%" | "75% " | "100%" | "125%" | "150%" | "200%";
export type NumOfDataPointsType = "500" | "1k" | "10k" | "25k" | "50k";

export interface GlobalConfigContextProps {
    configVersion: number; // Version number of the config file
    theme: "Claro" | "Escuro" | "Meia Noite"; // Claro | Escuro | Meia Noite
    animationSpeed: "Rápido" | "Normal" | "Desligado"; // Rápido | Normal | Desligado
    fontSize: FontSizeType; // 50% | 75% | 100% | 125% | 150% | 200%
    enableZoom: boolean; // Should zooming be enable?
    zoomDelay: number; // How long [ms] should I press to zoom
    backgroundBlur: boolean; // Should it blur when zooming?
    shadows: boolean; // Should it render shadows
    forceVirtualKeyboard: boolean; // Should it use the virtual keyboard as input
    enableHover: "enable" | "disable";
    absoluteMaximumLoad: number;
    absoluteMaximumTime: number;
    absoluteMaximumTravel: number;
    absoluteMaximumDeltaLoad: number;
    port: string;
    animateGraph: boolean;
    zAxisLength: number; // Z axis length in millimeters
    knownWeight: number; // Known weight for calibration
    numOfDataPointsPerExp: NumOfDataPointsType; // Number of data points that are shown to the user per experiment
}

export const globalConfigDefault: GlobalConfigContextProps = {
    configVersion: 1, // Version number of the config file
    theme: "Claro", // Claro | Escuro | Meia Noite
    animationSpeed: "Normal", // Rápido | Normal | Desligado
    fontSize: "100%", // 50% | 75% | 100% | 125% | 150% | 200%
    enableZoom: true, // Should zooming be enable?
    zoomDelay: 500, // How long [ms] should I press to zoom
    backgroundBlur: false, // Should it blur when zooming?
    shadows: true, // Should it render shadows
    forceVirtualKeyboard: false, // Should it use the virtual keyboard as input
    enableHover: "enable", // enable | disable
    absoluteMaximumLoad: 10000, // Global limit in grams
    absoluteMaximumTime: 6000, // Global limit in seconds
    absoluteMaximumTravel: 1000, // Global limit in mm
    absoluteMaximumDeltaLoad: 1000, // Global limit in grams / second
    port: "",
    animateGraph: true,
    zAxisLength: 1000,
    knownWeight: 1000,
    numOfDataPointsPerExp: "1k",
};

export type FocusKeyType =
    | "connection-component"
    | "material-inspector"
    | "config-page"
    | "calib-page"
    | "none";
