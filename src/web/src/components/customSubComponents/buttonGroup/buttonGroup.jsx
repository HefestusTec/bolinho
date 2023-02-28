// Copyright (c) 2023 Rafael F. Meneses
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from "react";
import styleModule from "./buttonGroup.module.css";

function ButtonGroup({
    children,
    currentActive = "",
    setCurrentActive,
    activeColor = "",
    inactiveColor = "",
    dividerColor = "",
    className = "",
    clickCallBack,
}) {
    const buttonGroupStyle = {
        "--active_color": activeColor,
        "--inactive_color": inactiveColor,
        "--divider_color": dividerColor,
    };

    const getClassName = (element) => {
        if (element.key === currentActive)
            return [
                element.props.className,
                styleModule.button,
                styleModule.button_active,
            ].join(" ");
        return [element.props.className, styleModule.button].join(" ");
    };

    const iWasClicked = (key) => {
        if (clickCallBack !== undefined) {
            clickCallBack(key);
        } else if (setCurrentActive !== undefined) {
            setCurrentActive(key);
        }
    };

    const makeButtons = () => {
        if (children === undefined) return;
        if (!Array.isArray(children)) {
            return (
                <children.type
                    {...children.props}
                    className={getClassName(children)}
                />
            );
        }

        const buttonsArr = children.map((child, index) => {
            return (
                <child.type
                    buttonKey={child.key}
                    {...child.props}
                    color={"var(--font_color)"} // Do not remove this LOC
                    className={getClassName(child)}
                    clickCallBack={iWasClicked}
                />
            );
        });
        return buttonsArr;
    };

    const getDivClassName = () => {
        return [className, styleModule.button_group_div].join(" ");
    };

    return (
        <div className={getDivClassName()} style={buttonGroupStyle}>
            {makeButtons()}
        </div>
    );
}

export default ButtonGroup;
