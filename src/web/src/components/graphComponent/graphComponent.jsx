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

import React, { useState, useEffect } from "react";
import styleModule from "./graphComponent.module.css";

import "rc-slider/assets/index.css";
import ChartComponent from "./chartComponent/chartComponent";
import SliderComponent from "./sliderComponent/sliderComponent";
import { ExperimentPlotData } from "../../classes";

const defaultMaxValues = {
    plotDataArray: [],
    maxValues: { x: 100, y: 100 },
};

const getMaxData = (experimentArray) => {
    if (experimentArray.length === 0) return defaultMaxValues;
    let maxX = 0;
    let maxY = Number.MIN_VALUE;
    experimentArray.forEach((element) => {
        if (element.maxDataValues.x > maxX) maxX = element.maxDataValues.x;
        if (element.maxDataValues.y > maxY) maxY = element.maxDataValues.y;
    });
    return { x: maxX, y: maxY };
};

function GraphComponent({ experimentList }) {
    const [experimentArray, setExperimentArray] = useState(defaultMaxValues);

    const [leftHandlePos, setLeftHandlePos] = useState(0);
    const [rightHandlePos, setRightHandlePos] = useState(100);

    const [showSideBar, setShowSideBar] = useState(true);

    useEffect(() => {
        const generateExperimentPlotData = () => {
            let experimentPlotArray = [];
            experimentList.forEach((element) => {
                try {
                    experimentPlotArray.push(
                        new ExperimentPlotData(
                            element.material.name,
                            element.data_array,
                            element.color
                        )
                    );
                } catch (error) {
                    console.error(error);
                }
            });
            return experimentPlotArray;
        };
        const plotDataArray = generateExperimentPlotData();
        const maxVals = getMaxData(plotDataArray);
        setExperimentArray({
            plotDataArray: plotDataArray,
            maxValues: maxVals,
        });
    }, [experimentList]);

    const getOpenSideBarButtonClassName = () => {
        return showSideBar
            ? [
                  styleModule.open_side_bar_button,
                  styleModule.open_side_bar_button_active,
              ].join(" ")
            : [
                  styleModule.open_side_bar_button,
                  styleModule.open_side_bar_button_inactive,
              ].join(" ");
    };

    const toggleSideBar = () => {
        setShowSideBar(!showSideBar);
    };

    const getGraphAreaClassName = () => {
        return showSideBar
            ? [styleModule.graph_area, styleModule.graph_area_mini].join(" ")
            : [styleModule.graph_area].join(" ");
    };

    const getSideBarClassName = () => {
        return showSideBar
            ? [styleModule.side_bar].join(" ")
            : [styleModule.side_bar, styleModule.side_bar_hidden].join(" ");
    };

    const setChartMinMax = (min, max) => {
        setLeftHandlePos(min);
        setRightHandlePos(max);
    };

    return (
        <div className={styleModule.graph_component}>
            <div className={getGraphAreaClassName()}>
                <div className={styleModule.chart_component_div}>
                    <ChartComponent
                        sliderValue={{
                            min: leftHandlePos,
                            max: rightHandlePos,
                        }}
                        experimentPlotDataArray={experimentArray.plotDataArray}
                        allMaxDataValues={experimentArray.maxValues}
                    ></ChartComponent>
                </div>
                <div className={styleModule.side_bar_button_div}>
                    <button
                        className={getOpenSideBarButtonClassName()}
                        onClick={toggleSideBar}
                        aria-label="Toggle Graph SideBar"
                    ></button>
                </div>
                <div className={styleModule.bottom_part}>
                    <SliderComponent
                        setChartMinMax={setChartMinMax}
                        dataRightMax={experimentArray.maxValues.x}
                    />
                </div>
            </div>
            <div className={getSideBarClassName()} display={"none"}></div>
        </div>
    );
}
export default GraphComponent;
