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
import { defaultReadingsType, ReadingsType } from "types/ReadingsType";

export const ReadingsContext = createContext<
    [ReadingsType, Dispatch<SetStateAction<ReadingsType>>]
>([defaultReadingsType, () => {}]);

interface ExperimentPageProviderProps {
    children: ReactNode;
}

export const ReadingsProvider: FunctionComponent<
    ExperimentPageProviderProps
> = ({ children }) => {
    const [readingsContext, setReadingsContext] = useState(defaultReadingsType);

    function getReadingsJS() {
        return readingsContext;
    }
    function setReadingsJS(newValue: string) {
        const parsedReading: ReadingsType = JSON.parse(newValue);

        setReadingsContext(parsedReading);
    }

    try {
        window.eel.expose(getReadingsJS, "getReadingsJS");
        window.eel.expose(setReadingsJS, "setReadingsJS");
    } catch (error) {}

    return (
        <ReadingsContext.Provider value={[readingsContext, setReadingsContext]}>
            {children}
        </ReadingsContext.Provider>
    );
};
