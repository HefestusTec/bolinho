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

import { CSSProperties, FunctionComponent, ReactNode, useState } from "react";
import styleModule from "./CustomTextArea.module.css";
import CustomButton from "../customButton/customButton";
import openIcon from "../../../resources/openMenu.svg";

interface CustomTextAreaProps {
    children: ReactNode;
    style?: CSSProperties;
}

const CustomTextArea: FunctionComponent<CustomTextAreaProps> = ({
    children,
    style,
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const getExpandMenuIndicatorClassName = () => {
        if (isOpen) {
            return [
                styleModule.expand_menu_indicator_open,
                styleModule.expand_menu_indicator,
            ].join(" ");
        }
        return [styleModule.expand_menu_indicator].join(" ");
    };

    return (
        <div className={styleModule.custom_text_div}>
            <header className={styleModule.text_area_header}>
                <CustomButton
                    clickCallBack={() => {
                        setIsOpen((o) => !o);
                    }}
                    bgColor="var(--button_active_color)"
                    fontColor="var(--font_color)"
                    padding="10px"
                >
                    Expandir detalhes
                    <div className={getExpandMenuIndicatorClassName()}>
                        <img src={openIcon} alt="Logo" />{" "}
                    </div>
                </CustomButton>
            </header>
            <div style={style} className={styleModule.text_area_content}>
                {isOpen && children}
            </div>
        </div>
    );
};

export default CustomTextArea;
