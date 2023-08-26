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

import {
    CSSProperties,
    FunctionComponent,
    ReactNode,
    useContext,
    useRef,
    useState,
} from "react";
import styleModule from "./CustomTextArea.module.css";
import CustomButton from "../customButton/customButton";
import openIcon from "../../../resources/openMenu.svg";
import { CSSTransition } from "react-transition-group";
import GlobalConfigContext from "contexts/globalConfigContext";

interface CustomTextAreaProps {
    children: ReactNode;
    style?: CSSProperties;
    title?: string;
    defaultIsOpen?: boolean;
}

const CustomTextArea: FunctionComponent<CustomTextAreaProps> = ({
    children,
    style,
    title = "Expandir detalhes",
    defaultIsOpen = false,
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(defaultIsOpen);
    const getExpandMenuIndicatorClassName = () => {
        if (isOpen) {
            return [
                styleModule.expand_menu_indicator_open,
                styleModule.expand_menu_indicator,
            ].join(" ");
        }
        return [styleModule.expand_menu_indicator].join(" ");
    };
    const [globalConfig] = useContext(GlobalConfigContext);
    const nodeRef = useRef(null);

    const getTimeout = () => {
        switch (globalConfig.animationSpeed) {
            case "Desligado":
                return 0;
            case "Normal":
                return 350;
            case "Rápido":
                return 150;

            default:
                return 350;
        }
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
                    {title}
                    <div className={getExpandMenuIndicatorClassName()}>
                        <img src={openIcon} alt="Logo" />{" "}
                    </div>
                </CustomButton>
            </header>
            <CSSTransition
                nodeRef={nodeRef}
                timeout={getTimeout()}
                classNames={"fade-in-animated"}
                in={isOpen}
                unmountOnExit
            >
                <div
                    style={style}
                    className={styleModule.text_area_content}
                    ref={nodeRef}
                >
                    {children}
                </div>
            </CSSTransition>
        </div>
    );
};

export default CustomTextArea;
