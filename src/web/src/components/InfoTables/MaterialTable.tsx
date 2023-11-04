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
import { MaterialType } from "types/DataBaseTypes";

interface MaterialTableProps {
    material: MaterialType;
    hideTitle?: boolean;
}

const MaterialTable: FunctionComponent<MaterialTableProps> = ({
    material,
    hideTitle,
}) => {
    return (
        <table>
            {!hideTitle && (
                <>
                    <th>
                        <h1>Material</h1>
                    </th>
                    <th>
                        <br /> <br />
                    </th>
                </>
            )}
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
};

export default MaterialTable;
