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

import { isFakeEel } from "api/backend-api";
import { CurrentPageContext } from "api/contexts/CurrentPageContext";
import useRefresh from "hooks/useRefresh";
import { useContext, useEffect, useState } from "react";

const useFakeEel = () => {
    const [currentPage] = useContext(CurrentPageContext);
    const refresh = useRefresh();
    const [, setIsRunning] = useState(false);
    useEffect(() => {
        console.log("fakeeel");

        function runAt2FPS() {
            const fps = 1;
            const frameDelay = 1000 / fps;

            function update() {
                if (currentPage === "experiment") {
                    console.log("refresh");
                    refresh();
                }
                setTimeout(update, frameDelay);
            }

            update();
        }
        setIsRunning((isRun) => {
            if (isFakeEel && !isRun) {
                // Call the function to start the infinite loop
                runAt2FPS();
                return true;
            }
            return isRun;
        });
    }, [currentPage, refresh]);

    return;
};

export default useFakeEel;
