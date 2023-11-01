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

import { eel } from "api/backend-api";
import useRefresh from "hooks/useRefresh";
import { FunctionComponent } from "react";
import { DataPointType } from "types/DataPointTypes";

function randInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function get_random_data_points(dataSize: number, xOffset: number = 0) {
    var return_array: DataPointType[] = [];

    for (var i = 0, _pj_a = dataSize; i < _pj_a; i += 1) {
        return_array.push({
            x: xOffset + i,
            y: randInt(0, 100),
        });
    }

    return return_array;
}

interface GenerateDebugPointsProps {}

const GenerateDebugPoints: FunctionComponent<GenerateDebugPointsProps> = () => {
    const refresh = useRefresh();

    const addXPoints = (nOfPoints: number = 50) => {
        try {
            const newPoints = get_random_data_points(
                nOfPoints,
                eel.pointsArray.length
            );
            eel.pointsArray = eel.pointsArray.concat(newPoints);
        } catch (error) {}
        refresh();
    };

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
            }}
        >
            <button
                onClick={() => {
                    addXPoints(10);
                }}
            >
                +10
            </button>
            <button
                onClick={() => {
                    addXPoints(50);
                }}
            >
                +50
            </button>
            <button
                onClick={() => {
                    addXPoints(100);
                }}
            >
                +100
            </button>
            <button
                onClick={() => {
                    addXPoints(500);
                }}
            >
                +500
            </button>
            <button
                onClick={() => {
                    addXPoints(1000);
                }}
            >
                +1000
            </button>
            <button
                onClick={() => {
                    addXPoints(5000);
                }}
            >
                +5000
            </button>
        </div>
    );
};

export default GenerateDebugPoints;
