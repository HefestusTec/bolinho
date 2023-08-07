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
    ChangeEvent,
    Dispatch,
    FunctionComponent,
    HTMLInputTypeAttribute,
    SetStateAction,
    useRef,
    useState,
} from "react";
import styleModule from "./CustomTextInput.module.css";
import { useDebouncedCallback } from "use-debounce";

interface CustomTextInputProps {
    inputType?: HTMLInputTypeAttribute;
    title?: string;
    value: number | string;
    setValue:
        | Dispatch<SetStateAction<number>>
        | Dispatch<SetStateAction<string>>;
    suffix?: string;
}

const CustomTextInput: FunctionComponent<CustomTextInputProps> = ({
    inputType = "text",
    title,
    value,
    setValue,
    suffix,
}) => {
    const [hasUpdated, setHasUpdated] = useState<boolean>(true);
    const debounced = useDebouncedCallback(
        (debouncedVal) => {
            setHasUpdated(true);
            setValue(debouncedVal);
        },
        // delay in ms
        500
    );

    const inputRef = useRef<HTMLInputElement>(null);

    const errorStyle: React.CSSProperties = {
        borderWidth: "0px 0px 4px 0px",
    };

    const focusOnInput = () => {
        inputRef.current?.focus();
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setHasUpdated(false);

        debounced(e.target.value);
    };

    return (
        <div className={styleModule.main_div}>
            <button
                className={styleModule.main_button}
                style={!hasUpdated ? errorStyle : undefined}
                onClick={focusOnInput}
            >
                <span className={styleModule.title_span}>{title}</span>
                <span className={styleModule.input_span}>
                    <input
                        type={inputType}
                        className={styleModule.text_input}
                        ref={inputRef}
                        onChange={handleInputChange}
                    />
                    <p className={styleModule.suffix}>{suffix}</p>
                </span>
            </button>
        </div>
    );
};

export default CustomTextInput;
