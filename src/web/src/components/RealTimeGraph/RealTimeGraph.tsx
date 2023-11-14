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
import { ExperimentType } from "types/DataBaseTypes";
import RealTimeChart from "./RealTimeChart/RealTimeChart";
import useRealTimeGraph from "api/hooks/useRealTimeGraph";

const sideBarWidth = "140px";

interface RealTimeGraphProps {
    experiment: ExperimentType;
}

const RealTimeGraph: FunctionComponent<RealTimeGraphProps> = ({
    experiment,
}) => {
    const [leftHandlePos, setLeftHandlePos] = useState(0);
    const [rightHandlePos, setRightHandlePos] = useState(100);

    const [showSideBar, setShowSideBar] = useState(true);
    const [autoZoom, setAutoZoom] = useState(true);

    const [plotType, setPlotType] = useState<PlotTypeType>("loadOverTime");

    const [experimentPlotData] = useRealTimeGraph({
        plotType: plotType,
        experiment,
    });

    const maxData = useMemo<DataPointType>(() => {
        const dataArray = experimentPlotData.dataArray;
        if (dataArray.length === 0) return { x: 10, y: 10 };

        let maxY = Number.MIN_VALUE;
        dataArray.forEach((element) => {
            if (element.y > maxY) maxY = element.y;
        });
        return { x: dataArray[dataArray.length - 1].x, y: maxY };
    }, [experimentPlotData]);

    const minData = useMemo<DataPointType>(() => {
        const dataArray = experimentPlotData.dataArray;
        if (dataArray.length === 0) return { x: 0, y: 0 };

        let minY = Number.MAX_VALUE;
        dataArray.forEach((element) => {
            if (element.y < minY) minY = element.y;
        });
        return { x: dataArray[0].x, y: minY };
    }, [experimentPlotData]);

    useEffect(() => {
        if (autoZoom) {
            setLeftHandlePos(minData.x);
            setRightHandlePos(maxData.x);
        }
    }, [plotType, experimentPlotData, autoZoom, minData, maxData]);
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
                    <RealTimeChart
                        sliderValue={{
                            min: leftHandlePos,
                            max: rightHandlePos,
                        }}
                        experimentPlotData={experimentPlotData}
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
                        dataRightMax={maxData.x}
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
