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
import CustomButton from "components/customSubComponents/customButton/customButton";
import { deleteMaterialByIdJS, patchMaterialByIdJS } from "api/backend-api";
import { MaterialType } from "types/DataBaseTypes";
import { RefreshDataContext } from "api/contexts/RefreshContext";
import ContainerComponent from "components/containerComponent/containerComponent";
import { toast } from "react-toastify";
import useRefresh from "hooks/useRefresh";
import useConfirm from "hooks/useConfirm";
import CustomTextAreaInput from "components/customSubComponents/CustomTextAreaInput/CustomTextAreaInput";
import CustomTextArea from "components/customSubComponents/CustomTextArea/CustomTextArea";
import { SelectedExperimentsContext } from "contexts/SelectedExperimentsContext";

interface EditMaterialPopupProps {
    material: MaterialType;
    closeTooltip?: () => void;
}

const EditMaterialPopup: FunctionComponent<EditMaterialPopupProps> = ({
    material,
    closeTooltip,
}) => {
    const [materialName, setMaterialName] = useState<string>(material.name);
    const [supplierName, setSupplierName] = useState<string>(
        material.supplier_name
    );
    const [, setSelectedExperiments] = useContext(SelectedExperimentsContext);

    const [supplierContactInfo, setSupplierContactInfo] = useState<string>(
        material.supplier_contact_info
    );
    const [extraInfo, setExtraInfo] = useState<string>(material.extra_info);

    const [refreshData] = useContext(RefreshDataContext);
    const refresh = useRefresh();
    const [materialNameAlert, setMaterialNameAlert] = useState<boolean>(false);

    const [supplierNameAlert, setSupplierNameAlert] = useState<boolean>(false);
    const [supplierContactInfoAlert, setSupplierContactInfoAlert] =
        useState<boolean>(false);
    const [extraInfoAlert, setExtraInfoAlert] = useState<boolean>(false);
    const [ConfirmationDialog, confirm] = useConfirm();

    useEffect(() => {
        setMaterialNameAlert(materialName !== material.name);

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
        refreshData,
        materialName,
    ]);

    const saveMaterial = () => {
        patchMaterialByIdJS({
            name: materialName,
            id: material.id,
            supplier_name: supplierName,
            supplier_contact_info: supplierContactInfo,
            extra_info: extraInfo,
        }).then((response) => {
            if (response) {
                toast.success("Material atualizado com sucesso");
                refresh();
                if (closeTooltip) closeTooltip();
                return;
            }
            toast.error("Não foi possível atualizar esse material");
        });
    };
    const deleteMaterial = () => {
        setSelectedExperiments([]);
        deleteMaterialByIdJS(material.id).then((response) => {
            if (response) {
                toast.success("Material deletado com sucesso");
                refresh();
                if (closeTooltip) closeTooltip();
                return;
            }
            toast.error("Não foi possível deletar esse material");
        });
    };

    return (
        <ContainerComponent
            headerText={`Editar material `}
            headerButton={
                <CustomButton
                    fontSize="var(--font_s)"
                    fontColor="var(--font_color_inverted)"
                    bgColor="var(--negative_button_color)"
                    clickCallBack={() => {
                        confirm(deleteMaterial);
                    }}
                    padding="5px"
                >
                    EXCLUIR
                </CustomButton>
            }
            containerContentStyle={{
                paddingRight: 0,
            }}
        >
            <CustomTextArea>
                <table>
                    <th>
                        <b>Dados do material:</b>
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
                        <th>Lote</th>
                        <th>{material.batch}</th>
                    </tr>
                </table>
            </CustomTextArea>
            <CustomTextAreaInput
                title="Nome do material"
                setValue={setMaterialName}
                value={materialName}
                inputType="text"
                suffix=""
                alert={materialNameAlert}
                alertColor="var(--positive_button_color)"
            />
            <CustomTextAreaInput
                title="Fornecedor"
                setValue={setSupplierName}
                value={supplierName}
                inputType="text"
                suffix=""
                alert={supplierNameAlert}
                alertColor="var(--positive_button_color)"
            />
            <CustomTextAreaInput
                title="Informações do fornecedor"
                setValue={setSupplierContactInfo}
                value={supplierContactInfo}
                inputType="text"
                suffix=""
                alert={supplierContactInfoAlert}
                alertColor="var(--positive_button_color)"
            />
            <CustomTextAreaInput
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
                    bgColor="var(--button_inactive_color)"
                    fontColor="var(--font_color)"
                    clickCallBack={() => {
                        if (closeTooltip) closeTooltip();
                    }}
                    width="50%"
                >
                    Cancelar
                </CustomButton>
                <CustomButton
                    bgColor="var(--positive_button_color)"
                    fontColor="var(--font_color_inverted)"
                    clickCallBack={() => {
                        confirm(saveMaterial);
                    }}
                    width="50%"
                >
                    Salvar
                </CustomButton>
            </CustomButtonArray>
            <ConfirmationDialog />
        </ContainerComponent>
    );
};

export default EditMaterialPopup;
