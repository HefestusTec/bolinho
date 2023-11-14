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

import ZoomComponent from "components/zoomComponent/zoomComponent";
import { Dispatch, FunctionComponent, SetStateAction } from "react";
import styleModule from "./MainMonitor.module.css";
import BigButton from "components/customSubComponents/BigButton/BigButton";
import React from "react";

interface MainMonitorProps {
    className: string;
    scaleOrigin: string;
    currentLoad: number;
    setEndPromptIsActive: Dispatch<SetStateAction<boolean>>;
}

const MainMonitor: FunctionComponent<MainMonitorProps> = ({
    className,
    scaleOrigin,
    currentLoad,
    setEndPromptIsActive,
}) => {
    return (
        <React.Fragment>
            <ZoomComponent
                className={[className, styleModule.main_monitor_div].join(" ")}
                scaleOrigin={scaleOrigin}
            >
                <div className={styleModule.force_monitor_div}>
                    <h1 className={styleModule.force_monitor_text}>
                        {currentLoad} N
                    </h1>
                </div>
                <BigButton
                    clickCallBack={() => {
                        setEndPromptIsActive(true);
                    }}
                    buttonText="ENCERRAR"
                    bgColor="var(--negative_button_color)"
                    fontSize="var(--font_l)"
                    height="90%"
                />
            </ZoomComponent>
        </React.Fragment>
    );
};

export default MainMonitor;
