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
import React, {
    useContext,
    useState,
    useEffect,
    Suspense,
    FunctionComponent,
} from "react";
import ExperimentButton from "./experimentButton/experimentButton";
import SelectedObjectListContext, {
    SelectedObjectType,
} from "contexts/selectedObjectListContext";
import { ReactComponent as ColorIcon } from "../../../resources/colorSelectorIcon.svg";
import { ReactComponent as AcceptIcon } from "../../../resources/acceptIcon.svg";
import ColorPicker from "./colorPicker/colorPicker";
import ExperimentDescription from "./experimentDescription/experimentDescription";
import { toast } from "react-toastify";

import styleModule from "./experimentsInspector.module.css";

interface ExperimentsInspectorProps {}

const ExperimentsInspector: FunctionComponent<
    ExperimentsInspectorProps
> = () => {
    const [objectList, setObjectList] = useContext(SelectedObjectListContext);
    const [activeTriplet, setActiveTriplet] = useState<
        SelectedObjectType | undefined
    >(undefined);
    const [colorPickerIsActive, setColorPickerIsActive] = useState(false);

    const createButton = (object: SelectedObjectType, idx: number) => {
        return (
            <ExperimentButton
                object={object}
                activeTriplet={activeTriplet}
                setActiveTriplet={setActiveTriplet}
                key={object.material.name.toString() + idx}
            ></ExperimentButton>
        );
    };

    const makeButtons = () => {
        return objectList.map((element, idx) => createButton(element, idx));
    };

    const makeHeaderText = () => {
        if (activeTriplet === undefined) return;

        try {
            const name = activeTriplet.material.name;
            const batch = activeTriplet.material.batch;
            return `[${batch}] ${name}`;
        } catch (error) {
            return "Selecione um experimento";
        }
    };

    const activateNextExperiment = () => {
        try {
            objectList.forEach((triplet) => {
                if (triplet !== activeTriplet) {
                    setActiveTriplet(triplet);
                    return;
                }
            });
        } catch (error) {}
    };

    const removeActiveExperiment = () => {
        if (activeTriplet === undefined) return;
        try {
            const newCartData = objectList.filter(
                (d) => d.experiment.id !== activeTriplet.experiment.id
            );

            setObjectList(newCartData);
            activateNextExperiment();
        } catch (error) {}
    };

    useEffect(() => {
        if (objectList.length === 0) {
            setActiveTriplet(undefined);
            return;
        } else if (objectList.length === 1) {
            setActiveTriplet(objectList[0]);
        }
    }, [objectList]);

    const getHeaderColorClassName = () => {
        if (colorPickerIsActive) {
            return [
                styleModule.material_inspector_header_color,
                styleModule.material_inspector_header_color_active,
            ].join(" ");
        }
        return styleModule.material_inspector_header_color;
    };

    const getStyleColor = () => {
        if (activeTriplet) return activeTriplet.color;

        return "var(--primary_color)";
    };

    const getColorPickerIcon = () => {
        if (colorPickerIsActive) {
            return (
                <AcceptIcon
                    className={styleModule.material_inspector_header_color_icon}
                />
            );
        }

        return (
            <ColorIcon
                className={styleModule.material_inspector_header_color_icon}
            />
        );
    };

    const getColorPickerText = () => {
        if (colorPickerIsActive) {
            return <p>Aplicar</p>;
        }
        return;
    };

    const updateDataColor = () => {
        if (objectList === undefined || activeTriplet === undefined) return;
        try {
            let objectListCopy = [...objectList];
            const idx = objectListCopy.findIndex(
                (element) =>
                    element.experiment.id === activeTriplet.experiment.id
            );

            objectListCopy[idx].color = activeTriplet.color;
            setObjectList(objectListCopy);
        } catch (error) {
            toast.error("Não foi possível alterar a cor da plotagem");
        }
    };

    const deactivateColorPicker = () => {
        if (colorPickerIsActive) {
            setColorPickerIsActive(false);
            updateDataColor();
        }
    };

    const toggleColorPickIsActive = () => {
        if (!colorPickerIsActive) {
            setColorPickerIsActive(true);
            return;
        }
        deactivateColorPicker();
    };

    const makeRemoveButton = () => {
        if (activeTriplet === undefined) return;
        if (Object.keys(activeTriplet).length)
            return (
                <button
                    className={styleModule.delete_material_button}
                    onClick={removeActiveExperiment}
                ></button>
            );
    };

    const makeHeaderColor = () => {
        if (activeTriplet === undefined) return;
        if (Object.keys(activeTriplet).length)
            return (
                <div
                    className={getHeaderColorClassName()}
                    style={{ "--experiment_color": getStyleColor() } as any}
                    onClick={toggleColorPickIsActive}
                >
                    {getColorPickerText()}
                    {getColorPickerIcon()}
                </div>
            );
    };

    const makeColorPicker = () => {
        if (colorPickerIsActive)
            return (
                <ColorPicker
                    activeTriplet={activeTriplet}
                    setActiveTriplet={setActiveTriplet}
                    colorPickerIsActive={colorPickerIsActive}
                    setColorPickerIsActive={setColorPickerIsActive}
                    deactivateColorPicker={deactivateColorPicker}
                    updateDataColor={updateDataColor}
                />
            );
    };

    return (
        <div className={styleModule.material_inspector_div}>
            <div className={styleModule.material_inspector}>
                <div className={styleModule.material_inspector_header}>
                    {makeRemoveButton()}

                    <div className={styleModule.material_inspector_header_text}>
                        {makeHeaderText()}
                    </div>
                    {makeHeaderColor()}
                </div>
                <div className={styleModule.material_inspector_content}>
                    <div className={styleModule.material_inspector_search_area}>
                        <ul
                            className={
                                styleModule.material_inspector_search_area_ul
                            }
                        >
                            {makeButtons()}
                        </ul>
                    </div>
                    <Suspense fallback={<div>Carregando...</div>}>
                        <div className={styleModule.experiment_description}>
                            {activeTriplet ? (
                                <ExperimentDescription
                                    activeTriplet={activeTriplet}
                                />
                            ) : (
                                <p> Selecione um experimento...</p>
                            )}
                        </div>
                    </Suspense>
                </div>
            </div>

            {makeColorPicker()}
        </div>
    );
};

export default ExperimentsInspector;
