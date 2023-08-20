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

import { FunctionComponent, useContext, useEffect, useState } from "react";
import CustomButtonArray from "components/customSubComponents/CustomButtonArray/CustomButtonArray";
import CustomTextInput from "components/customSubComponents/CustomTextInput/CustomTextInput";
import CustomButton from "components/customSubComponents/customButton/customButton";
import React from "react";
import { patchExperimentByIdJS } from "api/backend-api";
import { ExperimentType } from "types/DataBaseTypes";
import { NeedsToRefreshContext } from "contexts/NeedsToRefreshContext";

interface EditExperimentPopupProps {
    experiment: ExperimentType;
}

const EditExperimentPopup: FunctionComponent<EditExperimentPopupProps> = ({
    experiment,
}) => {
    const [name, setName] = useState<string>(experiment.name);
    const [extraInfo, setExtraInfo] = useState<string>(experiment.extra_info);

    const [needsToRefresh, setNeedsToRefresh] = useContext(
        NeedsToRefreshContext
    );

    const [nameAlert, setNameAlert] = useState<boolean>(false);
    const [extraInfoAlert, setExtraInfoAlert] = useState<boolean>(false);

    useEffect(() => {
        setNameAlert(name !== experiment.name);
        setExtraInfoAlert(extraInfo !== experiment.extra_info);
    }, [name, extraInfo, experiment, needsToRefresh]);

    return (
        <React.Fragment>
            <CustomTextInput
                title="Nome"
                setValue={setName}
                value={name}
                inputType="text"
                suffix=""
                alert={nameAlert}
                alertColor="var(--positive_button_color)"
            />
            <CustomTextInput
                title="Extra"
                setValue={setExtraInfo}
                value={extraInfo}
                inputType="text"
                suffix=""
                alert={extraInfoAlert}
                alertColor="var(--positive_button_color)"
            />
            <CustomButtonArray>
                <CustomButton
                    bgColor="var(--positive_button_color)"
                    fontColor="var(--font_color_inverted)"
                    clickCallBack={() => {
                        patchExperimentByIdJS({
                            id: experiment.id,
                            name: name,
                            extra_info: extraInfo,
                        }).then(() => {
                            setNeedsToRefresh(true);
                        });
                    }}
                    width="50%"
                >
                    Salvar
                </CustomButton>
            </CustomButtonArray>
        </React.Fragment>
    );
};

export default EditExperimentPopup;
