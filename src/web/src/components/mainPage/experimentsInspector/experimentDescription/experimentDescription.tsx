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
import React, {
    FunctionComponent,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

import styleModule from "./experimentDescription.module.css";
import {
    BodyType,
    MaterialType,
    defaultBodyType,
    defaultMaterialType,
} from "types/DataBaseTypes";
import { getBodyById, getMaterialById } from "api/db-api";
import { SelectedExperimentsContext } from "contexts/SelectedExperimentsContext";

interface ExperimentDescriptionProps {
    activeExperimentIdx: number;
}

const ExperimentDescription: FunctionComponent<ExperimentDescriptionProps> = ({
    activeExperimentIdx,
}) => {
    const [selectedExperiments] = useContext(SelectedExperimentsContext);
    const [myBody, setMyBody] = useState<BodyType>(defaultBodyType);
    const [myMaterial, setMyMaterial] =
        useState<MaterialType>(defaultMaterialType);
    const myExperiment = useMemo(() => {
        if (activeExperimentIdx < 0) return;

        return selectedExperiments[activeExperimentIdx].experiment;
    }, [activeExperimentIdx, selectedExperiments]);

    console.log(myBody);

    useEffect(() => {
        getBodyById(selectedExperiments[activeExperimentIdx].experiment.body_id)
            .then((bodyResponse) => {
                if (bodyResponse) setMyBody(bodyResponse);
            })
            .catch((err) => console.log(err));
    }, [activeExperimentIdx, selectedExperiments]);

    useEffect(() => {
        getMaterialById(myBody.material_id)
            .then((materialResponse) => {
                if (materialResponse) setMyMaterial(materialResponse);
            })
            .catch((err) => console.log(err));
    }, [myBody]);

    const makeMaterialText = () => {
        if (myExperiment === undefined) return;
        return (
            <>
                <h1>Material</h1>
                <b>Lote: </b>
                {myMaterial.batch}
                <br />
                <b>Fornecedor: </b>
                {myMaterial.supplier_name}
                <br />
                <b>• E-mail: </b>
                {myMaterial.supplier_contact_info}
                <br />
                <b>Id: </b>
                {myMaterial.id}
                <br />
                <b>Info extra: </b>
                <p>{myMaterial.extra_info}</p>
                <hr></hr>
                <h1>Experimento</h1>
                <b>Data: </b>
                {myExperiment.date_time}
                <br />
                <b>Parâmetros: </b>
                <br />
                <b>• AutoStop: </b>
                <br />
                <>- • Queda de força: </>
                {myExperiment.load_loss_limit}
                <br />
                <>- • Força máxima: </>
                {myExperiment.max_load}
                <br />
                <>- • Distância máxima: </>
                {myExperiment.max_travel}
                <br />
                <>- • Tempo máximo: </>
                {myExperiment.max_time}
                <br />
                <b>• Corpo de prova: </b>
                <br />
                <>- • {myBody.type}</>
                <br />
                <>- • {myBody.param_a}</>
                <br />
                <>- • {myBody.param_b}</>
                <br />
                <>- • {myBody.height}</>
                <br />
                <b>Id: </b>
                {myExperiment.id}
                <br />
                <b>Info extra: </b>
                <p>{myExperiment.extra_info}</p>
            </>
        );
    };

    return <div className={styleModule.content}>{makeMaterialText()}</div>;
};

export default ExperimentDescription;
