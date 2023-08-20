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

import styleModule from "./experimentDescription.module.css";
import { BodyType, ExperimentType, MaterialType } from "types/DataBaseTypes";

interface ExperimentDescriptionProps {
    myBody: BodyType;
    myExperiment: ExperimentType;
    myMaterial: MaterialType;
}

const ExperimentDescription: FunctionComponent<ExperimentDescriptionProps> = ({
    myBody,
    myExperiment,
    myMaterial,
}) => {
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
                <>- • Tipo de corpo: {myBody.type}</>
                <br />
                <>- • Parâmetro A: {myBody.param_a}</>
                <br />
                <>- • Parâmetro B: {myBody.param_b}</>
                <br />
                <>- • Altura do corpo: {myBody.height} [mm]</>
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
