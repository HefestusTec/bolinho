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
import { ExperimentType } from "types/DataBaseTypes";
import { getBodyTypeAsText } from "helpers";

interface BodyTableProps {
    experiment: ExperimentType | undefined;
    hideTitle?: boolean;
}

const BodyTable: FunctionComponent<BodyTableProps> = ({
    experiment,
    hideTitle,
}) => {
    if (experiment === undefined) return <></>;
    return (
        <table>
            <tbody>
                {!hideTitle && (
                    <tr>
                        <th>
                            <h1>Corpo de prova</h1>
                        </th>
                        <th>
                            <br /> <br />
                        </th>
                    </tr>
                )}
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
            </tbody>
        </table>
    );
};

export default BodyTable;
