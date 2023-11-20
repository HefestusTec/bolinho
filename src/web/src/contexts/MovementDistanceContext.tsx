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
    Dispatch,
    FunctionComponent,
    SetStateAction,
    createContext,
    useState,
} from "react";

export type ValidDistancesType =
    | "5 mm"
    | "10 mm"
    | "100 mm"
    | "1000 mm"
    | "0.25 REV"
    | "0.5 REV"
    | "1 REV";

export const ValidDistancesTypeArray: ValidDistancesType[] = [
    "5 mm",
    "10 mm",
    "100 mm",
    "1000 mm",
    "0.25 REV",
    "0.5 REV",
    "1 REV",
];

export const MovementDistanceContext = createContext<
    [ValidDistancesType, Dispatch<SetStateAction<ValidDistancesType>>]
>(["100 mm", () => {}]);

interface MovementDistanceProviderProps {
    children: any;
}

export const MovementDistanceProvider: FunctionComponent<
    MovementDistanceProviderProps
> = ({ children }) => {
    const [distanceAmount, setDistanceAmount] =
        useState<ValidDistancesType>("100 mm");

    return (
        <MovementDistanceContext.Provider
            value={[distanceAmount, setDistanceAmount]}
        >
            {children}
        </MovementDistanceContext.Provider>
    );
};
