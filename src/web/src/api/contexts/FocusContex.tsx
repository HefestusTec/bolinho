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
import { FocusKeyType } from "api/apiTypes";
import {
    Dispatch,
    FunctionComponent,
    SetStateAction,
    createContext,
    useState,
} from "react";

export const FocusContext = createContext<
    [FocusKeyType, Dispatch<SetStateAction<FocusKeyType>>]
>(["none", () => {}]);

interface FocusProviderProps {
    children: any;
}

const FocusProvider: FunctionComponent<FocusProviderProps> = ({ children }) => {
    const [focus, setFocus] = useState<FocusKeyType>("none");

    function setFocusJS(newFocus: FocusKeyType) {
        setFocus(newFocus);
    }

    try {
        window.eel.expose(setFocusJS, "setFocusJS");
    } catch (error) {}

    return (
        <FocusContext.Provider value={[focus, setFocus]}>
            {children}
        </FocusContext.Provider>
    );
};

export default FocusProvider;
