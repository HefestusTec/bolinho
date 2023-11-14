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

import React, {
    useState,
    useEffect,
    FunctionComponent,
    useContext,
} from "react";
import styleModule from "./graphComponent.module.css";

import "rc-slider/assets/index.css";
import ChartComponent from "./chartComponent/chartComponent";
import SliderComponent from "./sliderComponent/sliderComponent";
import { ExperimentPlotData } from "../../classes";
import { DataPointType } from "types/DataPointTypes";
import {
    getLoadOverTimeByExperimentId,
    getLoadOverPositionByExperimentId,
} from "api/db-api";
import { toast } from "react-toastify";
import useFetchExperiments from "hooks/useFetchExperiments";
import { PlotTypeType } from "types/PlotTypeType";
import GraphSideBar from "./graphSideBar/graphSideBar";
import { RefreshDataContext } from "api/contexts/RefreshContext";
import { ExperimentType } from "types/DataBaseTypes";

type maxValueType = {
    plotDataArray: ExperimentPlotData[];
    maxValues: DataPointType;
};

const defaultMaxValues: maxValueType = {
    plotDataArray: [],
    maxValues: { x: 100, y: 100 },
};

const getMaxY = (experimentPlotArray: ExperimentPlotData[]): number => {
    if (experimentPlotArray.length === 0) return defaultMaxValues.maxValues.y;

    let maxY = Number.MIN_VALUE;
    experimentPlotArray.forEach((element) => {
        if (element.maxDataValues.y > maxY) maxY = element.maxDataValues.y;
    });
    return maxY;
};

const getMaxX = (
    experimentArray: ExperimentType[],
    experimentData: ExperimentPlotData[] | undefined
): number => {
    if (experimentArray.length === 0) return defaultMaxValues.maxValues.x;

    let maxX = 0;
    experimentArray.forEach((element, idx) => {
        if (element.num_of_data_points === 0 && experimentData) {
            maxX = experimentData[idx].dataset.data.length;
        } else if (element.num_of_data_points > maxX)
            maxX = element.num_of_data_points;
    });
    return maxX;
};

const getMinX = (
    experimentArray: ExperimentType[],
    experimentData: ExperimentPlotData[] | undefined
): number => {
    if (experimentArray.length === 0) return 0;
    if (!experimentData) return 0;

    let minX = Number.MAX_VALUE;
    experimentArray.forEach((element, idx) => {
        if (experimentData[idx].dataset.data[0]) {
            const currentFirstX = experimentData[idx].dataset.data[0].x;
            if (currentFirstX < minX) minX = currentFirstX;
        }
    });
    return minX;
};

const sideBarWidth = "140px";

interface GraphComponentProps {}

const GraphComponent: FunctionComponent<GraphComponentProps> = () => {
    const [experimentArray, setExperimentArray] = useState(defaultMaxValues);

    const [leftHandlePos, setLeftHandlePos] = useState(0);
    const [rightHandlePos, setRightHandlePos] = useState(100);

    const [showSideBar, setShowSideBar] = useState(true);
    const [autoZoom, setAutoZoom] = useState(true);

    const [experimentList] = useFetchExperiments();

    const [plotType, setPlotType] = useState<PlotTypeType>("loadOverTime");
    const [refreshData] = useContext(RefreshDataContext);

    const [minX, setMinX] = useState<number>(0);

    useEffect(() => {
        const fetchPlotData = (id: number) => {
            switch (plotType) {
                case "loadOverTime":
                    return getLoadOverTimeByExperimentId(
                        id,
                        leftHandlePos,
                        rightHandlePos
                    );
                case "loadOverPosition":
                    return getLoadOverPositionByExperimentId(
                        id,
                        leftHandlePos,
                        rightHandlePos
                    );
                default:
                    return getLoadOverTimeByExperimentId(
                        id,
                        leftHandlePos,
                        rightHandlePos
                    );
            }
        };

        const generateExperimentPlotData = async () => {
            let returnPlotDataArray: ExperimentPlotData[] = [];

            for (let i = 0; i < experimentList.length; i++) {
                const experiment = experimentList[i];
                const experimentColor = experimentList[i].plot_color;
                const data: DataPointType[] = await fetchPlotData(
                    experiment.id
                ).catch((err) => {
                    toast.error(err);
                    return [];
                });
                returnPlotDataArray.push(
                    new ExperimentPlotData(
                        experiment.name,
                        data,
                        experimentColor
                    )
                );
            }

            return returnPlotDataArray;
        };
        generateExperimentPlotData().then((generatedPlotData) => {
            const maxX = getMaxX(experimentList, generatedPlotData);
            setMinX(getMinX(experimentList, generatedPlotData));
            const maxY = getMaxY(generatedPlotData);
            // Point up to here

            setExperimentArray({
                plotDataArray: generatedPlotData,
                maxValues: {
                    x: maxX,
                    y: maxY,
                },
            });
        });
    }, [
        experimentList,
        plotType,
        refreshData,
        autoZoom,
        leftHandlePos,
        rightHandlePos,
        setMinX,
    ]);

    useEffect(() => {
        if (autoZoom) {
            const maxX = getMaxX(experimentList, undefined);
            setLeftHandlePos(0);
            setRightHandlePos(maxX);
        }
    }, [experimentList, plotType, refreshData, autoZoom]);
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
                        minX={minX}
                        experimentPlotDataArray={experimentArray.plotDataArray}
                        allMaxDataValues={experimentArray.maxValues}
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
                        dataRightMax={experimentArray.maxValues.x}
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

export default GraphComponent;
