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
import { PageType } from "types/PageType";

export const CurrentPageContext = createContext<
    [PageType, Dispatch<SetStateAction<PageType>>]
>(["home", () => {}]);

interface CurrentPageProviderProps {
    children: any;
}

const CurrentPageProvider: FunctionComponent<CurrentPageProviderProps> = ({
    children,
}) => {
    const [currentPage, setCurrentPage] = useState<PageType>("home");

    function goToExperimentPageJS() {
        // Routs to the experiment page, returns 1 if it was successful
        if (setCurrentPage == null) return;
        setCurrentPage("experiment");
    }

    function goToHomePageJS() {
        // Routs to the experiment page, returns 1 if it was successful
        if (setCurrentPage == null) return;
        setCurrentPage("home");
    }
    try {
        window.eel.expose(goToExperimentPageJS, "goToExperimentPageJS");

        window.eel.expose(goToHomePageJS, "goToHomePageJS");
    } catch (error) {}

    return (
        <CurrentPageContext.Provider value={[currentPage, setCurrentPage]}>
            {children}
        </CurrentPageContext.Provider>
    );
};

export default CurrentPageProvider;
