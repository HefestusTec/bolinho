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

import React, { useState, useRef } from "react";
import styleModule from "./virtualInput.module.css";

import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

const lbr = {
    default: [
        "' 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
        "{tab} q w e r t y u i o p [ ] \\",
        "{lock} a s d f g h j k l ç {enter}",
        "ãéí... z x c v b n m , . / {shift}",
        ".com @ {space}",
    ],
    shift: [
        '" ! @ # $ % ^ &amp; * ( ) _ + {bksp}',
        "{tab} Q W E R T Y U I O P { } |",
        "{lock} A S D F G H J K L Ç {enter}",
        "ÃÉÍ... Z X C V B N M &lt; &gt; ? {shift}",
        ".com @ {space}",
    ],
    modified: [
        "' 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
        "{tab} a ã á à â e é è ê [ ] \\",
        "{lock} i í ì î o õ ó ò ô {enter}",
        "ãéí... u ú ù û  / {shift}",
        ".com @ {space}",
    ],
};

export default function VirtualInput() {
    const [layout, setLayout] = useState("default");
    const keyboard = useRef();

    const onChange = (input) => {
        //setInput(input);
        console.log("Input changed", input);
    };

    const handleShift = () => {
        const newLayoutName = layout === "default" ? "shift" : "default";
        setLayout(newLayoutName);
    };

    const onKeyPress = (button) => {
        console.log("Button pressed", button);

        if (button === "{shift}" || button === "{lock}") handleShift();
    };

    return (
        <div className={styleModule.virtual_input_div}>
            <Keyboard
                keyboardRef={(r) => (keyboard.current = r)}
                layoutName={layout}
                onChange={onChange}
                onKeyPress={onKeyPress}
                className={styleModule.virtual_keyboard}
                layout={lbr}
            />
        </div>
    );
}
