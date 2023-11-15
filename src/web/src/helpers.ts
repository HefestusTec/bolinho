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

import { BodyType } from "types/DataBaseTypes";
import { ValidBodyTypeType } from "types/ValidBodyTypeType";

export const getBodyTypeAsText = (bodyType: number): ValidBodyTypeType => {
    switch (bodyType) {
        case 1:
            return "Retangular";
        case 2:
            return "Cilíndrico";
        case 3:
            return "Tubo";
        case 4:
            return "Outro";
        default:
            return "Retangular";
    }
};

export const getFormattedBodyParams = (bodyParams: BodyType) => {
    const getParamA = () => {
        switch (bodyParams.type) {
            case 1:
                return "Largura: " + bodyParams.param_a + "mm";
            case 2:
                return "Diam. Externo: " + bodyParams.param_a + "mm";
            case 3:
                return "Diam. Externo: " + bodyParams.param_a + "mm";
            default:
                return "";
        }
    };
    const getParamB = () => {
        switch (bodyParams.type) {
            case 1:
                return "Profundidade: " + bodyParams.param_b + "mm";
            case 2:
                return "";
            case 3:
                return "Diam. Interno: " + bodyParams.param_b + "mm";
            default:
                return "";
        }
    };
    const getHeight = () => {
        return "Altura: " + bodyParams.height + "mm";
    };

    return {
        type: getBodyTypeAsText(bodyParams.type),
        paramA: getParamA(),
        paramB: getParamB(),
        height: getHeight(),
    };
};

export const getRandomColor = () =>
    "#" + Math.floor(Math.random() * 16777215).toString(16);

export function calculatePercentage(part: number, whole: number): number {
    if (whole === 0) {
        return 100;
    }

    const percentage = Math.round((part / whole) * 10000) / 100;
    return percentage;
}
