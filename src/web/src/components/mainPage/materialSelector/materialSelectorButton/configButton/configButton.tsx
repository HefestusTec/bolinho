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

import { FunctionComponent } from "react";
import CustomButton from "components/customSubComponents/customButton/customButton";
import styleModule from "./configButton.module.css";

interface ConfigButtonProps {
    bgColor?: string;
}

const ConfigButton: FunctionComponent<ConfigButtonProps> = ({
    bgColor = "var(--button_inactive_color)",
}) => {
    return (
        <CustomButton
            className={styleModule.edit_material_button}
            bgColor={bgColor}
        >
            <span className={styleModule.edit_icon} />
        </CustomButton>
    );
};

export default ConfigButton;
