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
import {
    createContext,
    Dispatch,
    FunctionComponent,
    ReactNode,
    SetStateAction,
    useState,
} from "react";
import { defaultMaterialType, MaterialType } from "types/MaterialType";
import { defaultReadingsType, ReadingsType } from "types/ReadingsType";

export type ExperimentPageType = {
    loadPercentage: number; // Number between 0 - 100
    timePercentage: number; // Number between 0 - 100
    distancePercentage: number; // Number between 0 - 100
    deltaLoadPercentage: number; // Number between 0 - 100

    experimentParameters: string;
    readings: ReadingsType;
    description: string;
    material: MaterialType;
};

const experimentPageContextDefault: ExperimentPageType = {
    loadPercentage: 0,
    timePercentage: 0,
    distancePercentage: 0,
    deltaLoadPercentage: 0,

    experimentParameters: "",
    readings: defaultReadingsType,
    description: "",
    material: defaultMaterialType,
};

export const ExperimentPageContext = createContext<
    [ExperimentPageType, Dispatch<SetStateAction<ExperimentPageType>>]
>([experimentPageContextDefault, () => {}]);

interface ExperimentPageProviderProps {
    children: ReactNode;
}

export const ExperimentPageProvider: FunctionComponent<
    ExperimentPageProviderProps
> = ({ children }) => {
    const [experimentPageContext, setExperimentPageContext] = useState(
        experimentPageContextDefault
    );

    function getLoadPercentageJS() {
        return experimentPageContext.loadPercentage;
    }
    function setLoadPercentageJS(newValue: number) {
        setExperimentPageContext((old) => ({
            ...old,
            loadPercentage: newValue,
        }));
    }

    function getTimePercentageJS() {
        return experimentPageContext.timePercentage;
    }
    function setTimePercentageJS(newValue: number) {
        setExperimentPageContext((old) => ({
            ...old,
            timePercentage: newValue,
        }));
    }

    function getDistancePercentageJS() {
        return experimentPageContext.distancePercentage;
    }
    function setDistancePercentageJS(newValue: number) {
        setExperimentPageContext((old) => ({
            ...old,
            distancePercentage: newValue,
        }));
    }

    function getDeltaLoadPercentageJS() {
        return experimentPageContext.deltaLoadPercentage;
    }
    function setDeltaLoadPercentageJS(newValue: number) {
        setExperimentPageContext((old) => ({
            ...old,
            deltaLoadPercentage: newValue,
        }));
    }
    function getExperimentParametersJS() {
        return experimentPageContext.experimentParameters;
    }
    function setExperimentParametersJS(newValue: string) {
        setExperimentPageContext((old) => ({
            ...old,
            experimentParameters: newValue,
        }));
    }

    function getReadingsJS() {
        return experimentPageContext.readings;
    }
    function setReadingsJS(newValue: string) {
        const parsedReading: ReadingsType = JSON.parse(newValue);

        setExperimentPageContext((old) => ({
            ...old,
            readings: parsedReading,
        }));
    }

    function getDescriptionJS() {
        return experimentPageContext.description;
    }
    function setDescriptionJS(newValue: string) {
        setExperimentPageContext((old) => ({
            ...old,
            description: newValue,
        }));
    }

    function getMaterialJS() {
        return experimentPageContext.material;
    }
    function setMaterialJS(newValue: string) {
        const parsedMaterial: MaterialType = JSON.parse(newValue);

        setExperimentPageContext((old) => ({
            ...old,
            material: parsedMaterial,
        }));
    }

    try {
        window.eel.expose(getLoadPercentageJS, "getLoadPercentageJS");
        window.eel.expose(setLoadPercentageJS, "setLoadPercentageJS");

        window.eel.expose(getTimePercentageJS, "getTimePercentageJS");
        window.eel.expose(setTimePercentageJS, "setTimePercentageJS");

        window.eel.expose(getDistancePercentageJS, "getDistancePercentageJS");
        window.eel.expose(setDistancePercentageJS, "setDistancePercentageJS");

        window.eel.expose(getDeltaLoadPercentageJS, "getDeltaLoadPercentageJS");
        window.eel.expose(setDeltaLoadPercentageJS, "setDeltaLoadPercentageJS");

        window.eel.expose(
            getExperimentParametersJS,
            "getExperimentParametersJS"
        );
        window.eel.expose(
            setExperimentParametersJS,
            "setExperimentParametersJS"
        );

        window.eel.expose(getReadingsJS, "getReadingsJS");
        window.eel.expose(setReadingsJS, "setReadingsJS");

        window.eel.expose(getDescriptionJS, "getDescriptionJS");
        window.eel.expose(setDescriptionJS, "setDescriptionJS");

        window.eel.expose(getMaterialJS, "getMaterialJS");
        window.eel.expose(setMaterialJS, "setMaterialJS");
    } catch (error) {}

    return (
        <ExperimentPageContext.Provider
            value={[experimentPageContext, setExperimentPageContext]}
        >
            {children}
        </ExperimentPageContext.Provider>
    );
};
