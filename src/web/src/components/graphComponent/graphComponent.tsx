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

import React, { useState, useEffect, FunctionComponent, useMemo } from "react";
import styleModule from "../graphComponent/graphComponent.module.css";

import "rc-slider/assets/index.css";
import SliderComponent from "../graphComponent/sliderComponent/sliderComponent";
import { DataPointType } from "types/DataPointTypes";
import { PlotTypeType } from "types/PlotTypeType";
import GraphSideBar from "../graphComponent/graphSideBar/graphSideBar";
import ChartComponent from "./chartComponent/chartComponent";
import useFetchExperiments from "hooks/useFetchExperiments";
import useFetchExperimentsData from "hooks/useFetchExperimentsData";

const sideBarWidth = "140px";

interface RealTimeGraphProps {}

const RealTimeGraph: FunctionComponent<RealTimeGraphProps> = () => {
    const [leftHandlePos, setLeftHandlePos] = useState(0);
    const [rightHandlePos, setRightHandlePos] = useState(100);

    const [showSideBar, setShowSideBar] = useState(true);
    const [autoZoom, setAutoZoom] = useState(true);

    const [plotType, setPlotType] = useState<PlotTypeType>("loadOverTime");
    const [experimentList] = useFetchExperiments();

    const largestX = useMemo(() => {
        let newLargest: number = 0;
        experimentList.forEach((e) => {
            const maxP = () => {
                switch (plotType) {
                    case "loadOverPosition":
                        return e.max_z_pos;

                    default:
                        return e.max_x;
                }
            };
            const m = maxP();
            if (m > newLargest) newLargest = m;
        });
        return newLargest;
    }, [experimentList, plotType]);

    const [experimentPlotDataList] = useFetchExperimentsData(
        experimentList,
        plotType,
        leftHandlePos,
        rightHandlePos
    );

    const maxData = useMemo<DataPointType>(() => {
        if (experimentPlotDataList.length === 0) return { x: 1, y: 1 };

        let maxY = 1;

        experimentPlotDataList.forEach((e) => {
            const dataArray = e.dataArray;
            if (dataArray.length > 0) {
                dataArray.forEach((element) => {
                    if (element.y > maxY) maxY = element.y;
                });
            }
        });
        return { x: largestX, y: maxY };
    }, [experimentPlotDataList, largestX]);

    const minData = useMemo<DataPointType>(() => {
        if (experimentPlotDataList.length === 0) return { x: 0, y: 0 };

        let minY = 0;
        let minX = 0;
        experimentPlotDataList.forEach((e) => {
            const dataArray = e.dataArray;
            if (dataArray.length > 0) {
                const firstElement = dataArray[0].x;

                dataArray.forEach((element) => {
                    if (element.y < minY) minY = element.y;
                });
                if (firstElement < minX) minX = firstElement;
            }
        });
        return { x: minX, y: minY };
    }, [experimentPlotDataList]);

    useEffect(() => {
        if (autoZoom) {
            setLeftHandlePos(minData.x);
            setRightHandlePos(maxData.x);
        }
    }, [plotType, autoZoom, minData, maxData]);
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

    const getSideBarClassName = () => {
        return showSideBar
            ? [styleModule.side_bar].join(" ")
            : [styleModule.side_bar, styleModule.side_bar_hidden].join(" ");
    };

    const setChartMinMax = (min: number, max: number) => {
        setLeftHandlePos(min);
        setRightHandlePos(max);
    };
    return (
        <div className={styleModule.graph_component}>
            <div
                className={styleModule.graph_area}
                style={{
                    width: showSideBar
                        ? `calc(100% - ${sideBarWidth})`
                        : "100%",
                }}
            >
                <div className={styleModule.chart_component_div}>
                    <ChartComponent
                        sliderValue={{
                            min: leftHandlePos,
                            max: rightHandlePos,
                        }}
                        experimentPlotDataList={experimentPlotDataList}
                        maxData={maxData}
                        minData={minData}
                    />
                </div>
                <div className={styleModule.side_bar_button_div}>
                    <button
                        className={getOpenSideBarButtonClassName()}
                        onClick={toggleSideBar}
                        aria-label="Toggle Graph SideBar"
                    />
                </div>
                <div className={styleModule.bottom_part}>
                    <SliderComponent
                        setChartMinMax={setChartMinMax}
                        dataRightMax={largestX}
                        setAutoZoom={setAutoZoom}
                        leftHandlePos={leftHandlePos}
                        rightHandlePos={rightHandlePos}
                    />
                </div>
            </div>
            <div
                className={getSideBarClassName()}
                style={{
                    width: sideBarWidth,
                }}
            >
                <GraphSideBar
                    setPlotType={setPlotType}
                    plotType={plotType}
                    autoZoom={autoZoom}
                    setAutoZoom={setAutoZoom}
                />
            </div>
        </div>
    );
};

export default RealTimeGraph;
