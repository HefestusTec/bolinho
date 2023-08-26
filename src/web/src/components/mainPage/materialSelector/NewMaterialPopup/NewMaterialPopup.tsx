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
import CustomButton from "components/customSubComponents/customButton/customButton";
import React from "react";
import { postMaterialJS } from "api/backend-api";
import { toast } from "react-toastify";
import useConfirm from "hooks/useConfirm";
import CustomTextAreaInput from "components/customSubComponents/CustomTextAreaInput/CustomTextAreaInput";
import useRefresh from "hooks/useRefresh";

interface NewMaterialPopupProps {
    closePopup: () => void;
}

const NewMaterialPopup: FunctionComponent<NewMaterialPopupProps> = ({
    closePopup,
}) => {
    const [name, setName] = useState<string>("SEM NOME");
    const [batch, setBatch] = useState<string>("SEM LOTE");
    const [supplierName, setSupplierName] = useState<string>(
        "SEM NOME DO FORNECEDOR"
    );
    const [supplierContactInfo, setSupplierContactInfo] = useState<string>(
        "SEM Dados do fornecedor"
    );
    const [extraInfo, setExtraInfo] = useState<string>("SEM EXTRA INFO");
    const [ConfirmationDialog, confirm] = useConfirm();
    const refresh = useRefresh();

    const postNewMaterial = () => {
        postMaterialJS({
            name: name,
            batch: batch,
            extra_info: extraInfo,
            supplier_contact_info: supplierContactInfo,
            supplier_name: supplierName,
        }).then((response) => {
            if (response >= 0) {
                toast.success("Material criado com sucesso");
                closePopup();
            } else {
                toast.error("Erro durante a criação do material");
            }
            refresh();
        });
    };
    return (
        <React.Fragment>
            <CustomTextAreaInput
                title="Nome"
                setValue={setName}
                value={name}
                inputType="text"
                suffix=""
                alert={false}
                alertColor="var(--positive_button_color)"
            />
            <CustomTextAreaInput
                title="Lote"
                setValue={setBatch}
                value={batch}
                inputType="text"
                suffix=""
                alert={false}
                alertColor="var(--positive_button_color)"
            />
            <CustomTextAreaInput
                title="Fornecedor"
                setValue={setSupplierName}
                value={supplierName}
                inputType="text"
                suffix=""
                alert={false}
                alertColor="var(--positive_button_color)"
            />
            <CustomTextAreaInput
                title="Informações do fornecedor"
                setValue={setSupplierContactInfo}
                value={supplierContactInfo}
                inputType="text"
                suffix=""
                alert={false}
                alertColor="var(--positive_button_color)"
            />
            <CustomTextAreaInput
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
                    bgColor="var(--button_inactive_color)"
                    fontColor="var(--font_color)"
                    clickCallBack={() => {
                        if (closePopup) closePopup();
                    }}
                    width="50%"
                >
                    Cancelar
                </CustomButton>
                <CustomButton
                    bgColor="var(--positive_button_color)"
                    fontColor="var(--font_color_inverted)"
                    clickCallBack={() => {
                        confirm(postNewMaterial);
                    }}
                    width="50%"
                >
                    Criar
                </CustomButton>
            </CustomButtonArray>
            <ConfirmationDialog />
        </React.Fragment>
    );
};

export default NewMaterialPopup;
