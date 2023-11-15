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

import { CSSProperties, FunctionComponent, useContext } from "react";
import styleModule from "./UpDownButtons.module.css";
import CustomButton from "components/customSubComponents/customButton/customButton";
import { MovementDistanceContext } from "contexts/MovementDistanceContext";
import { moveZAxisMillimetersJS } from "api/backend-api";

// along with Bolinho.  If not, see <http://www.gnu.org/licenses/>.
interface UpDownButtonsProps {
    style?: CSSProperties;
}

enum MovementDirection {
    UP,
    DOWN,
}

const UpDownButtons: FunctionComponent<UpDownButtonsProps> = ({ style }) => {
    const [distanceAmount] = useContext(MovementDistanceContext);

    const moveZAxisCallback = (direction: MovementDirection) => {
        const movementAmountAsNumber: number = Number(
            distanceAmount.match(/\d+/)
        );
        moveZAxisMillimetersJS(
            direction === MovementDirection.UP
                ? -movementAmountAsNumber
                : movementAmountAsNumber
        );
    };

    return (
        <div style={style} className={styleModule.outer_div}>
            <div className={styleModule.content_div}>
                <CustomButton
                    className={[
                        styleModule.main_button,
                        styleModule.main_button_up,
                    ].join(" ")}
                    bgColor="var(--content_background_color)"
                    clickCallBack={() => {
                        moveZAxisCallback(MovementDirection.UP);
                    }}
                >
                    <div
                        className={styleModule.button_movement_indicator}
                        style={{
                            bottom: "5%",
                        }}
                    >
                        -{distanceAmount}
                    </div>
                </CustomButton>
                <CustomButton
                    className={styleModule.main_button}
                    bgColor="var(--content_background_color)"
                    clickCallBack={() => {
                        moveZAxisCallback(MovementDirection.DOWN);
                    }}
                >
                    <div
                        className={styleModule.button_movement_indicator}
                        style={{
                            top: "5%",
                        }}
                    >
                        +{distanceAmount}
                    </div>
                </CustomButton>
            </div>
        </div>
    );
};

export default UpDownButtons;
