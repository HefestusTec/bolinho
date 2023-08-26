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
    FunctionComponent,
    useEffect,
    useRef,
    useState,
    useContext,
} from "react";

import styleModule from "./materialSelectorButton.module.css";
import DropdownButton from "./dropdownButton/dropdownButton";
import { ExperimentType, MaterialType } from "types/DataBaseTypes";
import { getExperimentsByMaterialId } from "api/db-api";
import { CSSTransition } from "react-transition-group";
import GlobalConfigContext from "contexts/globalConfigContext";
import ConfigButton from "./configButton/configButton";
import EditMaterialPopup from "components/EditMaterialPopup/EditMaterialPopup";

interface MaterialSelectorButtonProps {
    material: MaterialType;
}

const MaterialSelectorButton: FunctionComponent<
    MaterialSelectorButtonProps
> = ({ material }) => {
    const [isActive, setIsActive] = useState(false);
    const [experiments, setExperiments] = useState<ExperimentType[]>([]);
    const nodeRef = useRef(null);
    const [globalConfig] = useContext(GlobalConfigContext);

    const getButtonClassName = () => {
        if (isActive) {
            return [
                styleModule.material_selector_button,
                styleModule.material_selector_button_active,
            ].join(" ");
        }
        return [styleModule.material_selector_button].join(" ");
    };

    useEffect(() => {
        getExperimentsByMaterialId(material.id).then((experimentsArray) => {
            setExperiments(experimentsArray);
        });
    }, [isActive, material]);

    const toggleDropDown = () => {
        setIsActive(!isActive);
    };

    const createButton = (experimentElem: ExperimentType) => {
        return (
            <DropdownButton
                experiment={experimentElem}
                key={"EX" + experimentElem.id.toString()}
            />
        );
    };

    const makeExperimentButtons = () => {
        return experiments.map((element) => createButton(element));
    };

    const getTimeout = () => {
        switch (globalConfig.animationSpeed) {
            case "Desligado":
                return 0;
            case "Normal":
                return 350;
            case "Rápido":
                return 150;

            default:
                return 350;
        }
    };
    return (
        <li
            key={"mat_idx_" + material.id}
            className={styleModule.material_selector_li}
        >
            <span className={styleModule.material_button_span}>
                <button
                    className={getButtonClassName()}
                    aria-label="Material Selector"
                    onClick={toggleDropDown}
                >
                    <div className={styleModule.material_selector_side}>
                        <div className={styleModule.add_sign}>
                            {isActive ? "-" : "+"}
                        </div>
                    </div>
                    <span className={styleModule.material_selector_id}>
                        [{material.id}]
                    </span>

                    <div className={styleModule.material_selector_text}>
                        {material.name}
                        <div className={styleModule.material_selector_info}>
                            {`${material.supplier_name}: ${material.batch}`}
                        </div>
                    </div>
                </button>
                <ConfigButton
                    bgColor={
                        isActive
                            ? "var(--button_active_color)"
                            : "var(--button_inactive_color)"
                    }
                >
                    <EditMaterialPopup material={material} />
                </ConfigButton>
            </span>
            <CSSTransition
                nodeRef={nodeRef}
                timeout={getTimeout()}
                classNames={"slide-in-animated"}
                in={isActive}
                unmountOnExit
            >
                <ul className={styleModule.dropdown_ul} ref={nodeRef}>
                    {makeExperimentButtons()}
                </ul>
            </CSSTransition>
        </li>
    );
};

export default MaterialSelectorButton;
