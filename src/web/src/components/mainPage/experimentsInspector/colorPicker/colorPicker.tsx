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
    useState,
} from "react";
import { useDebouncedCallback } from "use-debounce";

import styleModule from "./colorPicker.module.css";
import { HexColorPicker } from "react-colorful";
import { ExperimentType } from "types/DataBaseTypes";
import { patchExperimentByIdJS } from "api/backend-api";
import useRefresh from "hooks/useRefresh";
import BackgroundFader from "components/backgroundFader/backgroundFader";

interface ColorPickerProps {
    activeExperiment: ExperimentType;
    colorPickerIsActive: boolean;
    setColorPickerIsActive: Dispatch<SetStateAction<boolean>>;
    deactivateColorPicker: () => void;
}

const ColorPicker: FunctionComponent<ColorPickerProps> = ({
    activeExperiment,
    colorPickerIsActive,
    setColorPickerIsActive,
    deactivateColorPicker,
}) => {
    const [currentColor, setCurrentColor] = useState("#FFFFFF");
    const [changing, setChanging] = useState(false);

    const refresh = useRefresh();

    // Debouncer allows to dynamically update the data color without having to update every frame
    const debounced = useDebouncedCallback(
        // function
        (newColor) => {
            setChanging(false);
            patchExperimentByIdJS({
                name: activeExperiment.name,
                extra_info: activeExperiment.extra_info,
                id: activeExperiment.id,
                plot_color: newColor,
            });
            refresh();
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
            <BackgroundFader callbackFunc={clickedOut} invisible={true} />

            <div className={makeClassName()} style={{ zIndex: 10 }}>
                <HexColorPicker color={currentColor} onChange={colorChanged}>
                    {colorPickerIsActive ? (
                        <div
                            className={styleModule.color_picker_back_drop}
                            onClick={closeColorPicker}
                        />
                    ) : (
                        <></>
                    )}
                </HexColorPicker>
            </div>
        </React.Fragment>
    );
};

export default ColorPicker;
