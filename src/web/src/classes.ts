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

import { DataPointType } from "types/DataPointTypes";

type DataSet = {
    label: string;
    data: DataPointType[];
    fill: boolean;
    borderColor: string;
};

export class ExperimentPlotData {
    name: string;
    dataArray: DataPointType[];
    lineColor: string;
    dataset: DataSet;
    maxDataValues: DataPointType;

    constructor(
        name: string = "NONE",
        dataArray: DataPointType[] = [],
        lineColor: string = "#000000"
    ) {
        this.name = name;
        this.dataArray = dataArray;
        this.lineColor = lineColor;
        this.dataset = this.makeDataSet();
        this.maxDataValues = this.getMaxDataValues();
    }
    makeDataSet(): DataSet {
        return {
            label: this.name,
            data: this.dataArray,
            fill: false,
            borderColor: this.lineColor, // Color of the line
        };
    }
    getMaxDataValues(): DataPointType {
        if (this.dataArray.length === 0) return { x: 0, y: 0 };

        let maxX = this.dataArray[0].x;
        let maxY = this.dataArray[0].y;

        for (const { x, y } of this.dataArray) {
            maxX = Math.max(maxX, x);
            maxY = Math.max(maxY, y);
        }

        return { x: maxX, y: maxY };
    }
}
