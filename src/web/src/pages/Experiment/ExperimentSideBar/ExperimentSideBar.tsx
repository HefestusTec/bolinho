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

import { FunctionComponent, useContext } from "react";
import styleModule from "./ExperimentSideBar.module.css";
import ProgressWidget from "./ProgressWidget/ProgressWidget";
import { ExperimentPageContext } from "api/contexts/ExperimentPageContext";

interface ExperimentSideBarProps {}

const ExperimentSideBar: FunctionComponent<ExperimentSideBarProps> = () => {
    const [experimentPageContext] = useContext(ExperimentPageContext);

    return (
        <div className={styleModule.experiment_side_bar_div}>
            <span className={styleModule.widgets_span}>
                <div className={styleModule.bolinho_logo} />
                <ProgressWidget
                    value={experimentPageContext.loadPercentage}
                    title="Carga"
                />
                <ProgressWidget value={44} title="Tempo" />
                <ProgressWidget value={12} title="Distância" />
                <ProgressWidget value={99} title="Δ Carga" />
                <footer className={styleModule.side_bar_footer} />
            </span>
        </div>
    );
};

export default ExperimentSideBar;
