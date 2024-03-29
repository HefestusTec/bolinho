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
import React, { Dispatch, FunctionComponent, SetStateAction } from "react";
import styleModule from "./prompter.module.css";
import BackgroundFader from "../backgroundFader/backgroundFader";
import { toast } from "react-toastify";
import CustomButton from "../customSubComponents/customButton/customButton";
import { returnPromptResult } from "../../api/backend-api";

interface PrompterProps {
    description: string;
    options: string[];
    myStateSetter: Dispatch<SetStateAction<JSX.Element | undefined>>;
}

const Prompter: FunctionComponent<PrompterProps> = ({
    description = "Nada aqui...",
    options,
    myStateSetter,
}) => {
    const backgroundCallback = () => {
        toast.error("É preciso selecionar uma opção.");
    };
    const optionsButtonClicked = (key: string) => {
        returnPromptResult(key);

        myStateSetter(undefined);
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
                <div className={styleModule.prompter_content}>
                    <div className={styleModule.prompter_title}>
                        <div className={styleModule.prompter_title_h1}>
                            Mensagem obrigatória
                        </div>
                    </div>
                    <div className={styleModule.description_div}>
                        <p className={styleModule.description_p}>
                            {description}
                        </p>
                    </div>
                    <div className={styleModule.options_div}>
                        {makeOptionsButtons()}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Prompter;
