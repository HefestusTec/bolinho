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
import BackgroundFader from "components/backgroundFader/backgroundFader";
import ContainerComponent from "components/containerComponent/containerComponent";
import CustomButtonArray from "components/customSubComponents/CustomButtonArray/CustomButtonArray";
import CustomText from "components/customSubComponents/CustomText/CustomText";
import CustomButton from "components/customSubComponents/customButton/customButton";
import React, { useState } from "react";
import { toast } from "react-toastify";

const useConfirm = (
    title: string = "Confirme sua escolha",
    message: string = "ATENÇÃO essa ação não poderá ser revertida",
    confirmLabel: string = "Confirmar",
    cancelLabel: string = "Cancelar"
) => {
    console.log("up");
    const [promise, setPromise] = useState<{
        resolve: (value: boolean) => void;
    } | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const confirm = (onTrueFunc: () => void, onFalseFunc?: () => void) =>
        new Promise<boolean>((resolve, reject) => {
            setIsOpen(true);
            setPromise({ resolve });
        })
            .then((response) => {
                if (response) onTrueFunc();
                else {
                    if (onFalseFunc) onFalseFunc();
                }
            })
            .catch((err) => {
                toast.error("Algo deu errado.");
                console.error(err);
            });

    const handleClose = () => {
        setPromise(null);
        setIsOpen(false);
    };

    const handleConfirm = () => {
        promise?.resolve(true);
        handleClose();
    };

    const handleCancel = () => {
        promise?.resolve(false);
        handleClose();
    };

    // You could replace the Dialog with your library's version
    const ConfirmationDialog = React.memo(
        () =>
            isOpen && (
                <React.Fragment>
                    <BackgroundFader
                        callbackFunc={() => {
                            handleCancel();
                        }}
                        faderIndex={2}
                    />
                    <div
                        style={{
                            position: "fixed",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "300px",
                            zIndex: 2,
                        }}
                    >
                        <ContainerComponent headerText={title}>
                            <CustomText value={message} />
                            <CustomButtonArray>
                                <CustomButton
                                    bgColor="var(--button_inactive_color)"
                                    fontColor="var(--font_color)"
                                    clickCallBack={handleCancel}
                                    width="50%"
                                >
                                    {cancelLabel}
                                </CustomButton>
                                <CustomButton
                                    bgColor="var(--positive_button_color)"
                                    fontColor="var(--font_color_inverted)"
                                    clickCallBack={handleConfirm}
                                    width="50%"
                                >
                                    {confirmLabel}
                                </CustomButton>
                            </CustomButtonArray>
                        </ContainerComponent>
                    </div>
                </React.Fragment>
            )
    );

    return [ConfirmationDialog, confirm] as const;
};

export default useConfirm;
