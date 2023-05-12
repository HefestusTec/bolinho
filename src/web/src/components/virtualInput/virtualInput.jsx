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

import "./vkeyboard.css";
const layoutBR = {
    default: [
        "1 2 3 4 5 6 7 8 9 0",
        "q w e r t y u i o p",
        "a s d f g h j k l ç",
        "{shift} z x c v b n m {backspace}",
        "{accents} , {space} . {ent}",
    ],
    shift: [
        "1 2 3 4 5 6 7 8 9 0",
        "Q W E R T Y U I O P",
        "A S D F G H J K L Ç",
        "{shift} Z X C V B N M {backspace}",
        "{accents} , {space} . {ent}",
    ],
    accents: [
        "{at} # $ _ & - + ( ) /",
        "* \" ' : ; [ ] ™ ® ©",
        "á é í ó ú â ê î ô û",
        "{shift} à ã õ ! < > ? {backspace}",
        "{abc} , {space} . {ent}",
    ],
    accentsShift: [
        "{at} # $ _ & - + ( ) /",
        "* \" ' : ; [ ] ™ ® ©",
        "Á É Í Ó Ú Â Ê Î Ô Û",
        "{shift} À Ã Õ ! < > ? {backspace}",
        "{abc} , {space} . {ent}",
    ],
};
const displayBR = {
    "{accents}": "?ãé",
    "{ent}": "return",
    "{escape}": "esc ⎋",
    "{tab}": "tab ⇥",
    "{backspace}": "⌫",
    "{capslock}": "caps lock ⇪",
    "{shift}": "⇧",
    "{controlleft}": "ctrl ⌃",
    "{controlright}": "ctrl ⌃",
    "{altleft}": "alt ⌥",
    "{altright}": "alt ⌥",
    "{metaleft}": "cmd ⌘",
    "{metaright}": "cmd ⌘",
    "{abc}": "ABC",
    "{space}": " ",
    "{at}": "@",
};
export default function VirtualInput() {
    const [layout, setLayout] = useState("default");
    const keyboard = useRef();

    const onChange = (input) => {
        //setInput(input);
        console.log("Input changed", input);
    };

    const handleShift = () => {
        let newLayoutName = null;
        switch (layout) {
            case "default":
                newLayoutName = "shift";
                break;
            case "shift":
                newLayoutName = "default";
                break;
            case "accents":
                newLayoutName = "accentsShift";
                break;
            case "accentsShift":
                newLayoutName = "accents";
                break;
            default:
                newLayoutName = "default";
                break;
        }
        setLayout(newLayoutName);
    };
    function handleAccents() {
        let newLayoutName = null;
        switch (layout) {
            case "accents":
                newLayoutName = "default";
                break;
            case "default":
                newLayoutName = "accents";
                break;
            case "accentsShift":
                newLayoutName = "shift";
                break;
            case "shift":
                newLayoutName = "accentsShift";
                break;
            default:
                newLayoutName = "default";
                break;
        }
        setLayout(newLayoutName);
    }
    function onKeyPress(button) {
        console.log("Button pressed", button);

        if (button === "{shift}") handleShift();
        if (button === "{accents}" || button === "{abc}") handleAccents();
    }

    return (
        <div className={styleModule.virtual_input_div}>
            <div className={styleModule.input_field}>asd</div>
            <Keyboard
                keyboardRef={(r) => (keyboard.current = r)}
                layoutName={layout}
                onChange={onChange}
                onKeyPress={onKeyPress}
                layout={layoutBR}
                display={displayBR}
                theme={[
                    styleModule.virtual_keyboard,
                    "hg-theme-default hg-layout-default",
                ].join(" ")}
            />
        </div>
    );
}
