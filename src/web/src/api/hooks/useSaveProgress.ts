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

import { calculatePercentage } from "helpers";
import { Dispatch, SetStateAction, useState } from "react";

const useSaveProgress = (setIsSaving: Dispatch<SetStateAction<boolean>>) => {
    const [progress, setProgress] = useState<number>(0);

    function setSaveExperimentProgressJS(total: number, amount: number) {
        setProgress(calculatePercentage(amount, total));
        setIsSaving(true);
    }
    try {
        window.eel.expose(
            setSaveExperimentProgressJS,
            "setSaveExperimentProgressJS"
        );
    } catch (error) {}

    return [progress] as const;
};

export default useSaveProgress;
