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
import React, { FunctionComponent, Suspense, useEffect, useState } from "react";

import styleModule from "./experimentDescription.module.css";
import { SelectedObjectType } from "contexts/selectedObjectListContext";
import { BodyType, defaultBodyType } from "types/DataBaseTypes";
import { getBodyById } from "api/db-api";

interface ExperimentDescriptionProps {
    activeTriplet: SelectedObjectType | undefined;
}

const ExperimentDescription: FunctionComponent<ExperimentDescriptionProps> = ({
    activeTriplet,
}) => {
    const [myBody, setMyBody] = useState<BodyType>(defaultBodyType);

    useEffect(() => {
        if (activeTriplet === undefined) return;
        getBodyById(activeTriplet.experiment.body_id)
            .then((bodyResponse) => {
                if (bodyResponse) setMyBody(bodyResponse);
            })
            .catch((err) => console.log(err));
    }, [activeTriplet]);

    const makeMaterialText = () => {
        if (activeTriplet === undefined) return;
        return (
            <>
                <h1>Material</h1>
                <b>Lote: </b>
                {activeTriplet.material.batch}
                <br />
                <b>Fornecedor: </b>
                {activeTriplet.material.supplier_name}
                <br />
                <b>• E-mail: </b>
                {activeTriplet.material.supplier_contact_info}
                <br />
                <b>Id: </b>
                {activeTriplet.material.id}
                <br />
                <b>Info extra: </b>
                <p>{activeTriplet.material.extra_info}</p>
                <hr></hr>
                <h1>Experimento</h1>
                <b>Data: </b>
                {activeTriplet.experiment.date_time}
                <br />
                <b>Parâmetros: </b>
                <br />
                <b>• AutoStop: </b>
                <br />
                <>- • Queda de força: </>
                {activeTriplet.experiment.load_loss_limit}
                <br />
                <>- • Força máxima: </>
                {activeTriplet.experiment.max_load}
                <br />
                <>- • Distância máxima: </>
                {activeTriplet.experiment.max_travel}
                <br />
                <>- • Tempo máximo: </>
                {activeTriplet.experiment.max_time}
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
                {activeTriplet.experiment.id}
                <br />
                <b>Info extra: </b>
                <p>{activeTriplet.experiment.extra_info}</p>
            </>
        );
    };

    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <div className={styleModule.experiment_description}>
                {activeTriplet ? (
                    makeMaterialText()
                ) : (
                    <h1> Selecione um experimento...</h1>
                )}
            </div>
        </Suspense>
    );
};

export default ExperimentDescription;
