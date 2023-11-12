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
import { FunctionComponent } from "react";

import styleModule from "components/InfoTables/MaterialTable.module.css";
import { ExperimentType, MaterialType } from "types/DataBaseTypes";
import MaterialTable from "components/InfoTables/MaterialTable";
import ExperimentTable from "components/InfoTables/ExperimentTable";
import BodyTable from "components/InfoTables/BodyTable";

interface ExperimentDescriptionProps {
    experiment: ExperimentType;
    material: MaterialType;
}

const ExperimentDescription: FunctionComponent<ExperimentDescriptionProps> = ({
    experiment,
    material,
}) => {
    const makeMaterialText = () => {
        if (experiment === undefined) return;
        return (
            <>
                <MaterialTable material={material} />
                <br />
                <ExperimentTable experiment={experiment} />
                <br />
                <BodyTable experiment={experiment} />
            </>
        );
    };

    return <div className={styleModule.content}>{makeMaterialText()}</div>;
};

export default ExperimentDescription;
