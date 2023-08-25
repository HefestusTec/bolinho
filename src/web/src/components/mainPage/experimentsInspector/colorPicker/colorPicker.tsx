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
import React, {
    Dispatch,
    FunctionComponent,
    SetStateAction,
    useContext,
    useState,
} from "react";
import ClickAwayListener from "react-click-away-listener";
import { useDebouncedCallback } from "use-debounce";

import styleModule from "./colorPicker.module.css";
import { SelectedExperimentsContext } from "contexts/SelectedExperimentsContext";
import { HexColorPicker } from "react-colorful";

interface ColorPickerProps {
    activeExperimentId: number;
    colorPickerIsActive: boolean;
    setColorPickerIsActive: Dispatch<SetStateAction<boolean>>;
    deactivateColorPicker: () => void;
}

const ColorPicker: FunctionComponent<ColorPickerProps> = ({
    activeExperimentId,
    colorPickerIsActive,
    setColorPickerIsActive,
    deactivateColorPicker,
}) => {
    const [selectedExperiments, setSelectedExperiments] = useContext(
        SelectedExperimentsContext
    );
    const [currentColor, setCurrentColor] = useState("#FFFFFF");
    const [changing, setChanging] = useState(false);

    // Debouncer allows to dynamically update the data color without having to update every frame
    const debounced = useDebouncedCallback(
        // function
        (newColor) => {
            setChanging(false);
            let selectedExperimentsCopy = [...selectedExperiments];
            selectedExperimentsCopy[activeExperimentId].color = newColor;

            setSelectedExperiments(selectedExperimentsCopy);
        },
        // delay in ms
        300
    );

    const colorChanged = (newColor: string) => {
        debounced(newColor);
        setChanging(true);
        setCurrentColor(newColor);
    };

    const clickedOut = () => {
        if (!changing) deactivateColorPicker();
    };

    const makeClassName = () => {
        if (colorPickerIsActive)
            return [
                styleModule.color_picker_div,
                styleModule.color_picker_div_active,
            ].join(" ");
        return styleModule.color_picker_div;
    };

    const closeColorPicker = () => {
        setColorPickerIsActive(false);
    };

    return (
        <React.Fragment>
            <div className={makeClassName()}>
                <ClickAwayListener onClickAway={clickedOut}>
                    <HexColorPicker
                        color={currentColor}
                        onChange={colorChanged}
                    >
                        {colorPickerIsActive ? (
                            <div
                                className={styleModule.color_picker_back_drop}
                                onClick={closeColorPicker}
                            />
                        ) : (
                            <></>
                        )}
                    </HexColorPicker>
                </ClickAwayListener>
            </div>
        </React.Fragment>
    );
};

export default ColorPicker;
