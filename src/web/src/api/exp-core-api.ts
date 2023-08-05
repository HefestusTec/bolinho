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

import { Dispatch, SetStateAction } from "react";
import { PageType } from "types/PageType";

let setCurrentPage: Dispatch<SetStateAction<PageType>> | null = null;

export function setCurrentPageCallBack(
    callback: Dispatch<SetStateAction<PageType>>
) {
    setCurrentPage = callback;
}
export function pingJS() {
    // Ping function, returns 1 if the connection was successful
    return 1;
}
try {
    window.eel.expose(pingJS, "pingJS");
} catch (error) {}

// TODO implement the function
export function goToExperimentPageJS() {
    // Routs to the experiment page, returns 1 if it was successful
    if (setCurrentPage == null) return;
    setCurrentPage("experiment");
}
try {
    window.eel.expose(goToExperimentPageJS, "goToExperimentPageJS");
} catch (error) {}

// TODO implement the function
export function showConnectPromptJS() {
    // Shows the connect prompt, returns 1 if it was successful
    alert("Show connect prompt");
}
try {
    window.eel.expose(showConnectPromptJS, "showConnectPromptJS");
} catch (error) {}
