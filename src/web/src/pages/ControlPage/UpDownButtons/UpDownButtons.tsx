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
import {
    moveZAxisMillimetersJS,
    moveZAxisRevolutionsJS,
} from "api/backend-api";
import { isMillimeterString } from "helpers";

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
        if (isMillimeterString(distanceAmount)) {
            console.log(distanceAmount);
            const absoluteMovementAmountAsNumber: number = Number(
                distanceAmount.match(/\d+/)
            );
            console.log(absoluteMovementAmountAsNumber);

            const movementAmountAsNumber =
                direction === MovementDirection.UP
                    ? -absoluteMovementAmountAsNumber
                    : absoluteMovementAmountAsNumber;

            moveZAxisMillimetersJS(movementAmountAsNumber);
        } else {
            const match = distanceAmount.match(/^(\d+(\.\d+)?) REV$/);
            if (!match) return;
            const absoluteMovementAmountAsNumber: number = parseFloat(match[1]);

            const movementAmountAsNumber =
                direction === MovementDirection.UP
                    ? -absoluteMovementAmountAsNumber
                    : absoluteMovementAmountAsNumber;

            moveZAxisRevolutionsJS(movementAmountAsNumber);
        }
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
