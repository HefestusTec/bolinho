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
import { RefreshDataContext } from "api/contexts/RefreshContext";
import { getExperimentById } from "api/db-api";
import { SelectedExperimentsContext } from "contexts/SelectedExperimentsContext";
import { useContext, useEffect, useState } from "react";
import { ExperimentType } from "types/DataBaseTypes";

const useFetchExperiments = () => {
    const [experiments, setExperiments] = useState<ExperimentType[]>([]);
    const [refreshData] = useContext(RefreshDataContext);
    const [selectedExperiments] = useContext(SelectedExperimentsContext);
    useEffect(() => {
        const fetchExperiments = async () => {
            let expList = [];
            for (let i = 0; i < selectedExperiments.length; i++) {
                const experiment = await getExperimentById(
                    selectedExperiments[i].id
                );
                if (experiment !== undefined) expList.push(experiment);
            }
            setExperiments(expList);
        };
        fetchExperiments().catch();
    }, [selectedExperiments, refreshData]);
    return [experiments] as const;
};

export default useFetchExperiments;
