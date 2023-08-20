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

import ContainerComponent from "components/containerComponent/containerComponent";
import CustomButtonArray from "components/customSubComponents/CustomButtonArray/CustomButtonArray";
import CustomTextInput from "components/customSubComponents/CustomTextInput/CustomTextInput";
import CustomButton from "components/customSubComponents/customButton/customButton";
import React from "react";
import { FunctionComponent, useState } from "react";

interface ConfigToolTipProps {}

const ConfigToolTip: FunctionComponent<ConfigToolTipProps> = () => {
    const [maxForce, setMaxForce] = useState<number>(1);
    return (
        <React.Fragment>
            <span style={{}}>
                <ContainerComponent headerText="">
                    <CustomTextInput
                        title="Nome"
                        setValue={setMaxForce}
                        value={maxForce}
                        inputType="text"
                        suffix=""
                        alert={false}
                        alertColor="var(--positive_button_color)"
                    />
                    <CustomTextInput
                        title="Nome"
                        setValue={setMaxForce}
                        value={maxForce}
                        inputType="text"
                        suffix=""
                        alert={false}
                        alertColor="var(--positive_button_color)"
                    />
                    <CustomTextInput
                        title="Nome"
                        setValue={setMaxForce}
                        value={maxForce}
                        inputType="text"
                        suffix=""
                        alert={false}
                        alertColor="var(--positive_button_color)"
                    />
                    <CustomTextInput
                        title="Nome"
                        setValue={setMaxForce}
                        value={maxForce}
                        inputType="text"
                        suffix=""
                        alert={false}
                        alertColor="var(--positive_button_color)"
                    />
                    <CustomButtonArray>
                        <CustomButton
                            bgColor="var(--positive_button_color)"
                            fontColor="var(--font_color_inverted)"
                            clickCallBack={() => {}}
                        >
                            Salvar
                        </CustomButton>
                    </CustomButtonArray>
                </ContainerComponent>
            </span>
        </React.Fragment>
    );
};

export default ConfigToolTip;
