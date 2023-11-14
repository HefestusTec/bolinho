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
import {
    defaultMaterialType,
    ExperimentType,
    MaterialType,
} from "types/DataBaseTypes";

export type ExperimentPageType = {
    time: number; // Time since starting of experiment
    deltaLoad: number; // Current variation of load
    material: MaterialType | null;
    experiment: ExperimentType | null;
};

const experimentPageContextDefault: ExperimentPageType = {
    time: 0,
    deltaLoad: 0,
    material: null,
    experiment: null,
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

    function setTimeJS(newValue: number) {
        setExperimentPageContext((old) => ({
            ...old,
            timePercentage: newValue,
        }));
    }

    function setDeltaLoadJS(newValue: number) {
        setExperimentPageContext((old) => ({
            ...old,
            deltaLoadPercentage: newValue,
        }));
    }

    try {
        window.eel.expose(setTimeJS, "setTimeJS");

        window.eel.expose(setDeltaLoadJS, "setDeltaLoadJS");
    } catch (error) {}

    return (
        <ExperimentPageContext.Provider
            value={[experimentPageContext, setExperimentPageContext]}
        >
            {children}
        </ExperimentPageContext.Provider>
    );
};
