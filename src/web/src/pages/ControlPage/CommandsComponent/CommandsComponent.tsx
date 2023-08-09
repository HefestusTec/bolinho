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

import { returnZAxisJS } from "api/backend-api";
import ContainerComponent from "components/containerComponent/containerComponent";
import CustomButtonArray from "components/customSubComponents/CustomButtonArray/CustomButtonArray";
import CustomButton from "components/customSubComponents/customButton/customButton";
import CustomListSelector from "components/customSubComponents/customListSelector/customListSelector";
import {
    MovementDistanceContext,
    ValidDistancesType,
} from "contexts/MovementDistanceContext";
import { FunctionComponent, useContext } from "react";

interface CommandsComponentProps {}

const CommandsComponent: FunctionComponent<CommandsComponentProps> = () => {
    const [distanceAmount, setDistanceAmount] = useContext(
        MovementDistanceContext
    );

    const distanceCallback = (key: string) => {
        setDistanceAmount(key as ValidDistancesType);
    };

    return (
        <ContainerComponent headerText="Comandos">
            <CustomListSelector
                keys={[
                    "1 mm",
                    "5 mm",
                    "10 mm",
                    "50 mm",
                    "100 mm",
                    "500 mm",
                    "1000 mm",
                ]}
                clickCallBack={distanceCallback}
                selected={distanceAmount}
            >
                Distância de mov.
            </CustomListSelector>

            <CustomButtonArray>
                <CustomButton
                    bgColor="var(--content_background_color)"
                    fontColor="var(--font_color)"
                    clickCallBack={returnZAxisJS}
                >
                    Retornar Eixo Z
                </CustomButton>
            </CustomButtonArray>
        </ContainerComponent>
    );
};

export default CommandsComponent;
