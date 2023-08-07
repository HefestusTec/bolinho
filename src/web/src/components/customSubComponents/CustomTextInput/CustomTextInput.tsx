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
    ChangeEvent,
    Dispatch,
    FunctionComponent,
    HTMLInputTypeAttribute,
    SetStateAction,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import styleModule from "./CustomTextInput.module.css";

interface CustomTextInputProps {
    inputType?: HTMLInputTypeAttribute;
    title?: string;
    value: number | string;
    setValue: Dispatch<SetStateAction<any>>;
    suffix?: string;
    alert?: boolean;
    alertColor?: string;
}

const CustomTextInput: FunctionComponent<CustomTextInputProps> = ({
    inputType = "text",
    title,
    value,
    setValue,
    suffix,
    alert,
    alertColor = "var(--warning_button_color)",
}) => {
    const buttonStyleTemplate: CSSProperties = useMemo(
        () => ({
            borderColor: alertColor,
            borderWidth: alert ? "0px 0px 4px 0px" : "0",
        }),
        [alert, alertColor]
    );
    const [buttonStyle, setButtonStyle] =
        useState<CSSProperties>(buttonStyleTemplate);

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setButtonStyle(buttonStyleTemplate);
    }, [buttonStyleTemplate]);

    const focusOnInput = () => {
        inputRef.current?.focus();
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const newVal = e.target.value;
        if (inputType === "number") setValue(newVal);
        else setValue(newVal);
    };

    return (
        <div className={styleModule.main_div}>
            <button
                className={styleModule.main_button}
                style={buttonStyle}
                onClick={focusOnInput}
            >
                <span className={styleModule.title_span}>{title}</span>
                <span className={styleModule.input_span}>
                    <input
                        type={inputType}
                        className={styleModule.text_input}
                        ref={inputRef}
                        onChange={handleInputChange}
                        value={value}
                    />
                    <p className={styleModule.suffix}>{suffix}</p>
                </span>
            </button>
        </div>
    );
};

export default CustomTextInput;
