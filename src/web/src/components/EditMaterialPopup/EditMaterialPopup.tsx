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

import { FunctionComponent, useState } from "react";
import CustomButtonArray from "components/customSubComponents/CustomButtonArray/CustomButtonArray";
import CustomTextInput from "components/customSubComponents/CustomTextInput/CustomTextInput";
import CustomButton from "components/customSubComponents/customButton/customButton";
import React from "react";
import { patchMaterialByIdJS } from "api/backend-api";

interface EditMaterialPopupProps {
    materialId: number;
}

const EditMaterialPopup: FunctionComponent<EditMaterialPopupProps> = ({
    materialId,
}) => {
    const [supplierName, setSupplierName] = useState<string>(
        "SEM NOME DO FORNECEDOR"
    );
    const [supplierContactInfo, setSupplierContactInfo] = useState<string>(
        "SEM Dados do fornecedor"
    );
    const [extraInfo, setExtraInfo] = useState<string>("SEM EXTRA INFO");

    return (
        <React.Fragment>
            <CustomTextInput
                title="Fornecedor"
                setValue={setSupplierName}
                value={supplierName}
                inputType="text"
                suffix=""
                alert={false}
                alertColor="var(--positive_button_color)"
            />
            <CustomTextInput
                title="Informações do fornecedor"
                setValue={setSupplierContactInfo}
                value={supplierContactInfo}
                inputType="text"
                suffix=""
                alert={false}
                alertColor="var(--positive_button_color)"
            />
            <CustomTextInput
                title="Extra"
                setValue={setExtraInfo}
                value={extraInfo}
                inputType="text"
                suffix=""
                alert={false}
                alertColor="var(--positive_button_color)"
            />
            <CustomButtonArray>
                <CustomButton
                    bgColor="var(--positive_button_color)"
                    fontColor="var(--font_color_inverted)"
                    clickCallBack={() => {
                        patchMaterialByIdJS({
                            id: materialId,
                            supplier_name: supplierName,
                            supplier_contact_info: supplierContactInfo,
                            extra_info: extraInfo,
                        });
                    }}
                    width="50%"
                >
                    Salvar
                </CustomButton>
            </CustomButtonArray>
        </React.Fragment>
    );
};

export default EditMaterialPopup;
