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

import { FunctionComponent, useContext, useEffect, useState } from "react";
import CustomButtonArray from "components/customSubComponents/CustomButtonArray/CustomButtonArray";
import CustomTextInput from "components/customSubComponents/CustomTextInput/CustomTextInput";
import CustomButton from "components/customSubComponents/customButton/customButton";
import React from "react";
import { patchMaterialByIdJS } from "api/backend-api";
import { MaterialType } from "types/DataBaseTypes";
import CustomText from "components/customSubComponents/CustomText/CustomText";
import { NeedsToRefreshContext } from "contexts/NeedsToRefreshContext";

interface EditMaterialPopupProps {
    material: MaterialType;
}

const EditMaterialPopup: FunctionComponent<EditMaterialPopupProps> = ({
    material,
}) => {
    const [supplierName, setSupplierName] = useState<string>(
        material.supplier_name
    );
    const [supplierContactInfo, setSupplierContactInfo] = useState<string>(
        material.supplier_contact_info
    );
    const [extraInfo, setExtraInfo] = useState<string>(material.extra_info);
    const [needsToRefresh, setNeedsToRefresh] = useContext(
        NeedsToRefreshContext
    );
    const [supplierNameAlert, setSupplierNameAlert] = useState<boolean>(false);
    const [supplierContactInfoAlert, setSupplierContactInfoAlert] =
        useState<boolean>(false);
    const [extraInfoAlert, setExtraInfoAlert] = useState<boolean>(false);

    useEffect(() => {
        setSupplierNameAlert(supplierName !== material.supplier_name);
        setSupplierContactInfoAlert(
            supplierContactInfo !== material.supplier_contact_info
        );
        setExtraInfoAlert(extraInfo !== material.extra_info);
    }, [
        supplierName,
        supplierContactInfo,
        extraInfo,
        material,
        needsToRefresh,
    ]);

    return (
        <React.Fragment>
            <CustomText title="Nome: " value={material.name} />
            <CustomText title="ID:" value={material.id.toString()} />
            <CustomText title="Lote" value={material.batch} />
            <CustomTextInput
                title="Fornecedor"
                setValue={setSupplierName}
                value={supplierName}
                inputType="text"
                suffix=""
                alert={supplierNameAlert}
                alertColor="var(--positive_button_color)"
            />
            <CustomTextInput
                title="Informações do fornecedor"
                setValue={setSupplierContactInfo}
                value={supplierContactInfo}
                inputType="text"
                suffix=""
                alert={supplierContactInfoAlert}
                alertColor="var(--positive_button_color)"
            />
            <CustomTextInput
                title="Extra"
                setValue={setExtraInfo}
                value={extraInfo}
                inputType="text"
                suffix=""
                alert={extraInfoAlert}
                alertColor="var(--positive_button_color)"
            />
            <CustomButtonArray>
                <CustomButton
                    bgColor="var(--positive_button_color)"
                    fontColor="var(--font_color_inverted)"
                    clickCallBack={() => {
                        patchMaterialByIdJS({
                            id: material.id,
                            supplier_name: supplierName,
                            supplier_contact_info: supplierContactInfo,
                            extra_info: extraInfo,
                        }).then(() => {
                            alert(1);
                            setNeedsToRefresh(true);
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
