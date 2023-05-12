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
import React from "react";
import styleModule from "./prompter.module.css";
import BackgroundFader from "../backgroundFader/backgroundFader";
import { toast } from "react-toastify";
import CustomButton from "../customSubComponents/customButton/customButton";
import { returnPromptResult } from "../../api/backend-api";

export default function Prompter({
    description = "Nada aqui...",
    options,
    myStateSetter,
}) {
    const backgroundCallback = () => {
        toast.error("É preciso selecionar uma opção.");
    };
    const optionsButtonClicked = (key) => {
        // Calls a function in python that returns the choice
        returnPromptResult(key);

        myStateSetter();
    };

    const makeOptionsButtons = () => {
        const buttons = options.map((option) => (
            <CustomButton
                clickCallBack={optionsButtonClicked}
                className={styleModule.option_button}
            >
                {option}
            </CustomButton>
        ));
        return buttons;
    };

    return (
        <React.Fragment>
            <BackgroundFader
                faderIndex={40}
                callbackFunc={backgroundCallback}
            ></BackgroundFader>
            <div className={styleModule.prompter_div}>
                <div className={styleModule.description_div}>{description}</div>
                <div className={styleModule.options_div}>
                    {makeOptionsButtons()}
                </div>
            </div>
        </React.Fragment>
    );
}
