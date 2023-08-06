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

import { FunctionComponent } from "react";
import styleModule from "./ExperimentSideBar.module.css";
import ProgressWidget from "./ProgressWidget/ProgressWidget";

interface ExperimentSideBarProps {}

const ExperimentSideBar: FunctionComponent<ExperimentSideBarProps> = () => {
    return (
        <div className={styleModule.experiment_side_bar_div}>
            <div className={styleModule.bolinho_logo} />
            <span className={styleModule.widgets_span}>
                <ProgressWidget value={66} title="Carga" />
                <ProgressWidget value={44} title="Tempo" />
                <ProgressWidget value={12} title="Distância" />
                <ProgressWidget value={99} title="Δ Carga" />
            </span>
            <footer className={styleModule.side_bar_footer} />
        </div>
    );
};

export default ExperimentSideBar;
