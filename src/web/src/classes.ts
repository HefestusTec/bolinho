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

type DataSet = {
    label: string;
    data: DataPoint[];
    fill: boolean;
    borderColor: string;
};

export class DataPoint {
    x: number;
    y: number;
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}

export class ExperimentPlotData {
    name: string;
    dataArray: DataPoint[];
    lineColor: string;
    dataset: DataSet;
    maxDataValues: DataPoint;

    constructor(name = "NONE", dataArray = [], lineColor = "#000000") {
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
    getMaxDataValues(): DataPoint {
        if (this.dataArray.length <= 0) return { x: 0, y: 0 };
        const maxX = this.dataArray[this.dataArray.length - 1].x;
        const maxY = Math.max(...this.dataArray.map((object) => object.y));
        return { x: maxX, y: maxY };
    }
}
