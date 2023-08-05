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

import { endExperimentRoutineJS } from "api/backend-api";
import ZoomComponent from "components/zoomComponent/zoomComponent";
import { FunctionComponent } from "react";
import styleModule from "./MainMonitor.module.css";
import BigButton from "components/customSubComponents/BigButton/BigButton";

interface MainMonitorProps {
    className: string;
    scaleOrigin: string;
}

const MainMonitor: FunctionComponent<MainMonitorProps> = ({
    className,
    scaleOrigin,
}) => {
    return (
        <ZoomComponent
            className={[className, styleModule.main_monitor_div].join(" ")}
            scaleOrigin={scaleOrigin}
        >
            <div className={styleModule.force_monitor_div}>20 KN</div>
            <BigButton
                clickCallBack={endExperimentRoutineJS}
                buttonText="ENCERRAR"
                bgColor="var(--negative_button_color)"
                fontSize="var(--font_l)"
                height="90%"
            />
        </ZoomComponent>
    );
};

export default MainMonitor;
