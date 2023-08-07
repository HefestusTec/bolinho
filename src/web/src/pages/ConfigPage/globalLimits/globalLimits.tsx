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

import React, { FunctionComponent, useState } from "react";

import ZoomComponent from "../../../components/zoomComponent/zoomComponent";
import ContainerComponent from "../../../components/containerComponent/containerComponent";
import CustomTextInput from "components/customSubComponents/CustomTextInput/CustomTextInput";

interface GlobalLimitsProps {
    className?: string;
    scaleOrigin: string;
}

const GlobalLimits: FunctionComponent<GlobalLimitsProps> = ({
    className,
    scaleOrigin,
}) => {
    const [maxForce, setMaxForce] = useState<number>(0);

    return (
        <ZoomComponent className={className} scaleOrigin={scaleOrigin}>
            <ContainerComponent headerText="Limites globais">
                <CustomTextInput
                    title="Força máxima"
                    setValue={setMaxForce}
                    value={maxForce}
                    inputType="number"
                    suffix="N"
                />
                <CustomTextInput
                    title="Tempo máxima"
                    setValue={setMaxForce}
                    value={maxForce}
                    inputType="number"
                    suffix="s"
                />
                <CustomTextInput
                    title="Desloc. máximo"
                    setValue={setMaxForce}
                    value={maxForce}
                    inputType="number"
                    suffix="mm"
                />
            </ContainerComponent>
        </ZoomComponent>
    );
};

export default GlobalLimits;
