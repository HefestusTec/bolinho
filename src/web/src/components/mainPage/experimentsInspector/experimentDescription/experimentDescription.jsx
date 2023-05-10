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
import React, { Suspense } from "react";

import { getFormattedBodyParams, getFormattedDate } from "../../../../helpers";

import styleModule from "./experimentDescription.module.css";

export default function ExperimentDescription({ activeTriplet }) {
    const makeMaterialText = () => {
        try {
            const formattedBodyParams = getFormattedBodyParams(
                activeTriplet.experiment.experiment_params.body_params
            );
            return (
                <>
                    <h1>Material</h1>
                    <b>Lote: </b>
                    {activeTriplet.material.batch}
                    <br />
                    <b>Fornecedor: </b>
                    {activeTriplet.material.supplier.name}
                    <br />
                    <b>• E-mail: </b>
                    {activeTriplet.material.supplier.email}
                    <br />
                    <b>Id: </b>
                    {activeTriplet.material.id}
                    <br />
                    <b>Info extra: </b>
                    <p>{activeTriplet.material.extra_info}</p>
                    <hr></hr>
                    <h1>Experimento</h1>
                    <b>Data: </b>
                    {getFormattedDate(activeTriplet.experiment.date)}
                    <br />
                    <b>Parâmetros: </b>
                    <br />
                    <b>• AutoStop: </b>
                    <br />
                    <>- • Queda de força: </>
                    {
                        activeTriplet.experiment.experiment_params.stop_params
                            .force_loss
                    }
                    <br />
                    <>- • Força máxima: </>
                    {
                        activeTriplet.experiment.experiment_params.stop_params
                            .max_force
                    }
                    <br />
                    <>- • Distância máxima: </>
                    {
                        activeTriplet.experiment.experiment_params.stop_params
                            .max_travel
                    }
                    <br />
                    <>- • Tempo máximo: </>
                    {
                        activeTriplet.experiment.experiment_params.stop_params
                            .max_time
                    }
                    <br />
                    <b>• Corpo de prova: </b>
                    <br />
                    <>- • {formattedBodyParams.type}</>
                    <br />
                    <>- • {formattedBodyParams.paramA}</>
                    <br />
                    <>- • {formattedBodyParams.paramB}</>
                    <br />
                    <>- • {formattedBodyParams.height}</>
                    <br />
                    <b>Id: </b>
                    {activeTriplet.experiment.id}
                    <br />
                    <b>Info extra: </b>
                    <p>{activeTriplet.experiment.extra_info}</p>
                </>
            );
        } catch (error) {
            return;
        }
    };

    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <div className={styleModule.experiment_description}>
                {makeMaterialText()}
            </div>
        </Suspense>
    );
}
