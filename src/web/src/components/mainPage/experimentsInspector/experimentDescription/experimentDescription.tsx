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
import { getBodyTypeAsText } from "helpers";

interface ExperimentDescriptionProps {
    myBody: BodyType;
    experiment: ExperimentType;
    material: MaterialType;
}

const ExperimentDescription: FunctionComponent<ExperimentDescriptionProps> = ({
    myBody,
    experiment,
    material,
}) => {
    const materialDescription = (
        <table>
            <th>
                <h1>Material</h1>
            </th>
            <th>
                <br /> <br />
            </th>
            <tr>
                <th>Nome</th>
                <th>{material.name}</th>
            </tr>
            <tr>
                <th>ID</th>
                <th>{material.id}</th>
            </tr>
            <tr>
                <th>Fornecedor</th>
                <th>{material.supplier_name}</th>
            </tr>
            <tr>
                <th>Informações do fornecedor</th>
                <th>{material.supplier_contact_info}</th>
            </tr>
            <tr>
                <th>Lote</th>
                <th>{material.batch}</th>
            </tr>
            <tr>
                <th>Extra</th>
                <th>{material.extra_info}</th>
            </tr>
        </table>
    );
    const experimentDescription = (
        <table>
            <th>
                <h1>Experimento</h1>
            </th>
            <th>
                <br /> <br />
            </th>
            <tr>
                <th>Nome</th>
                <th>{experiment.name}</th>
            </tr>
            <tr>
                <th>ID</th>
                <th>{experiment.id}</th>
            </tr>
            <tr>
                <th>Data</th>
                <th>{experiment.date_time}</th>
            </tr>
            <tr>
                <th>Limite de perca de carga</th>
                <th>{experiment.load_loss_limit.toFixed(2)} N/s</th>
            </tr>
            <tr>
                <th>Limite de carga</th>
                <th>{experiment.max_load.toFixed(2)} N</th>
            </tr>
            <tr>
                <th>Limite de distância</th>
                <th>{experiment.max_travel.toFixed(2)} mm</th>
            </tr>
            <tr>
                <th>Limite de tempo</th>
                <th>{experiment.max_time.toFixed(2)} s</th>
            </tr>
            <tr>
                <th>Velocidade do eixo Z</th>
                <th>{experiment.z_axis_speed.toFixed(2)} mm/s</th>
            </tr>
            <tr>
                <th>Tipo de exp.</th>
                <th> {experiment.compress ? "Compressão" : "Expansão"}</th>
            </tr>
            <tr>
                <th>Extra</th>
                <th>{experiment.extra_info}</th>
            </tr>
        </table>
    );
    const bodyDescription = (
        <table>
            <th>
                <h1>Corpo de prova</h1>
            </th>
            <th>
                <br /> <br />
            </th>

            <tr>
                <th>ID</th>
                <th>{experiment.body.id}</th>
            </tr>
            <tr>
                <th>Tipo</th>
                <th>{getBodyTypeAsText(experiment.body.type)}</th>
            </tr>
            <tr>
                <th>Altura</th>
                <th>{experiment.body.height.toFixed(2)} mm</th>
            </tr>
            <tr>
                <th>Parâmetro A</th>
                <th>{experiment.body.param_a.toFixed(2)} mm</th>
            </tr>
            <tr>
                <th>Parâmetro B</th>
                <th>{experiment.body.param_b.toFixed(2)} mm</th>
            </tr>
        </table>
    );
    const makeMaterialText = () => {
        if (experiment === undefined) return;
        return (
            <>
                {materialDescription}
                <br />
                {experimentDescription}
                <br />
                {bodyDescription}
            </>
        );
    };

    return <div className={styleModule.content}>{makeMaterialText()}</div>;
};

export default ExperimentDescription;
