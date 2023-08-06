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

export type ReadingsType = {
    zAxisPos: number; // Position of the z-axis in mm
    loadReading: number; // Load reading from the load cell in Newtons
    status: string; // Arbitrary status string
};

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
    readings: {
        loadReading: 0,
        status: "",
        zAxisPos: 0,
    },
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
    try {
        window.eel.expose(getLoadPercentageJS, "getLoadPercentageJS");
    } catch (error) {}
    function setLoadPercentageJS(newValue: number) {
        setExperimentPageContext((old) => ({
            ...old,
            loadPercentage: newValue,
        }));
    }
    try {
        window.eel.expose(setLoadPercentageJS, "setLoadPercentageJS");
    } catch (error) {}

    return (
        <ExperimentPageContext.Provider
            value={[experimentPageContext, setExperimentPageContext]}
        >
            {children}
        </ExperimentPageContext.Provider>
    );
};
