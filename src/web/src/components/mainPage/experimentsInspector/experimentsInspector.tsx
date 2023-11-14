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
    useMemo,
    ReactNode,
} from "react";
import ExperimentButton from "./experimentButton/experimentButton";

import { ReactComponent as ColorIcon } from "../../../resources/colorSelectorIcon.svg";
import { ReactComponent as AcceptIcon } from "../../../resources/acceptIcon.svg";
import ColorPicker from "./colorPicker/colorPicker";
import ExperimentDescription from "./experimentDescription/experimentDescription";

import styleModule from "./experimentsInspector.module.css";
import { SelectedExperimentsContext } from "contexts/SelectedExperimentsContext";
import {
    ExperimentType,
    MaterialType,
    defaultExperimentType,
    defaultMaterialType,
} from "types/DataBaseTypes";
import {
    getMaterialById,
    removeExperimentFromVisualizationBuffer,
} from "api/db-api";
import useFetchExperiments from "hooks/useFetchExperiments";

interface ExperimentsInspectorProps {}

const ExperimentsInspector: FunctionComponent<
    ExperimentsInspectorProps
> = () => {
    const [selectedExperiments, setSelectedExperiments] = useContext(
        SelectedExperimentsContext
    );

    const [activeExperimentId, setActiveExperimentId] = useState<number>(-1);
    const [colorPickerIsActive, setColorPickerIsActive] = useState(false);
    const [myMaterial, setMyMaterial] =
        useState<MaterialType>(defaultMaterialType);

    const [experimentList] = useFetchExperiments();

    const myExperiment = useMemo<ExperimentType>(() => {
        if (activeExperimentId < 0)
            return defaultExperimentType as ExperimentType;

        return experimentList[activeExperimentId];
    }, [activeExperimentId, experimentList]);

    const myButtons = useMemo<ReactNode[]>(() => {
        return experimentList.map((element, idx) => (
            <ExperimentButton
                experiment={element}
                experimentColor={element.plot_color}
                activeExperimentId={activeExperimentId}
                myId={idx}
                setActiveExperimentId={setActiveExperimentId}
                key={element.id.toString() + idx}
            />
        ));
    }, [activeExperimentId, experimentList]);

    useEffect(() => {
        if (activeExperimentId < 0 || !experimentList.length) return;
        if (myExperiment) {
            getMaterialById(myExperiment.body.material.id)
                .then((materialResponse) => {
                    if (materialResponse) setMyMaterial(materialResponse);
                })
                .catch((err) => console.log(err));
        }
    }, [myExperiment, activeExperimentId, experimentList]);

    const makeHeaderText = () => {
        if (activeExperimentId < 0) return "Selecione um experimento";

        const name = myMaterial.name;
        const id = myMaterial.id;
        return `[${id}] ${name}`;
    };
    const removeActiveExperiment = async () => {
        if (activeExperimentId < 0) return;

        console.log("removedSuccessfully");
        const removedSuccessfully =
            await removeExperimentFromVisualizationBuffer(myExperiment.id);
        console.log(removedSuccessfully);

        if (!removedSuccessfully) return;
        console.log("after");

        let objectListCopy = [...selectedExperiments];

        objectListCopy.splice(activeExperimentId, 1);
        setSelectedExperiments(objectListCopy);

        setActiveExperimentId(objectListCopy.length - 1);
    };

    useEffect(() => {
        setActiveExperimentId((currentId) => {
            if (currentId < 0 && experimentList.length)
                return experimentList.length - 1;
            return currentId;
        });
        setActiveExperimentId(experimentList.length - 1);
    }, [experimentList]);

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
        if (activeExperimentId >= 0)
            return experimentList[activeExperimentId]?.plot_color;

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

    const deactivateColorPicker = () => {
        if (colorPickerIsActive) {
            setColorPickerIsActive(false);
        }
    };

    const toggleColorPickIsActive = () => {
        setColorPickerIsActive((state) => !state);
    };

    const makeRemoveButton = () => {
        if (activeExperimentId < 0) return;
        if (Object.keys(selectedExperiments).length)
            return (
                <button
                    className={styleModule.delete_material_button}
                    onClick={removeActiveExperiment}
                ></button>
            );
    };

    const makeHeaderColor = () => {
        if (activeExperimentId < 0) return;
        if (selectedExperiments.length) {
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
        }
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
                            {myButtons}
                        </ul>
                    </div>
                    <Suspense fallback={<div>Carregando...</div>}>
                        <div className={styleModule.experiment_description}>
                            {activeExperimentId >= 0 ? (
                                <ExperimentDescription
                                    experiment={myExperiment}
                                    material={myMaterial}
                                />
                            ) : (
                                <p> Selecione um experimento...</p>
                            )}
                        </div>
                    </Suspense>
                </div>
            </div>

            {colorPickerIsActive ? (
                <ColorPicker
                    activeExperiment={experimentList[activeExperimentId]}
                    colorPickerIsActive={colorPickerIsActive}
                    setColorPickerIsActive={setColorPickerIsActive}
                    deactivateColorPicker={deactivateColorPicker}
                />
            ) : (
                <></>
            )}
        </div>
    );
};

export default ExperimentsInspector;
