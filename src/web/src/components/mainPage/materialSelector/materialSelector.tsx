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
    FunctionComponent,
    ReactNode,
    RefObject,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import styleModule from "./materialSelector.module.css";
import MaterialSelectorButton from "./materialSelectorButton/materialSelectorButton";
import { MaterialType } from "types/DataBaseTypes";
import CustomButton from "components/customSubComponents/customButton/customButton";
import { getMaterialsDB } from "api/db-api";
import Popup from "reactjs-popup";
import BackgroundFader from "components/backgroundFader/backgroundFader";
import ContainerComponent from "components/containerComponent/containerComponent";
import { PopupActions } from "reactjs-popup/dist/types";
import NewMaterialPopup from "./NewMaterialPopup/NewMaterialPopup";
import { RefreshDataContext } from "api/contexts/RefreshContext";
import useRefresh from "hooks/useRefresh";

interface MaterialSelectorProps {}

const MaterialSelector: FunctionComponent<MaterialSelectorProps> = () => {
    const [materialList, setMaterialList] = useState<MaterialType[]>([]);

    const [refreshData] = useContext(RefreshDataContext);

    const [searchQuery, setSearchQuery] = useState<string>("");
    const ref = useRef<PopupActions>(null) as RefObject<PopupActions>;

    const filteredItems = useMemo(() => {
        return materialList.filter((item) => {
            return item.name.toLowerCase().includes(searchQuery.toLowerCase());
        });
    }, [materialList, searchQuery]);

    useEffect(() => {
        getMaterialsDB().then((response) => {
            setMaterialList(response);
        });
    }, [refreshData]);

    const createButton = (material: MaterialType, idx: number) => {
        return (
            <MaterialSelectorButton
                key={"m_" + material.name + idx}
                material={material}
            />
        );
    };
    const makeButtons = (): ReactNode[] => {
        return [
            <button>info</button>,
            filteredItems.map((element, idx) => createButton(element, idx)),
        ];
    };
    const closeTooltip = () => {
        ref?.current?.close();
    };

    return (
        <div className={styleModule.material_selector}>
            <div className={styleModule.selector_header}>
                <div className={styleModule.selector_header_text}>
                    Meus Experimentos
                </div>
                <div className={styleModule.selector_header_bottom}>
                    <span className={styleModule.selector_header_search_bar}>
                        <input
                            type="text"
                            className={styleModule.selector_header_search}
                            placeholder="Buscar"
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                            }}
                        />
                        <button
                            className={
                                styleModule.selector_header_search_button
                            }
                            aria-label="Search Button"
                        ></button>
                    </span>
                    <CustomButton className={styleModule.expand_button}>
                        <Popup
                            trigger={() => (
                                <div
                                    style={{
                                        height: "100%",
                                        paddingTop: "auto",
                                        paddingBottom: "auto",
                                        display: "flex",
                                        paddingLeft: "10px",
                                        paddingRight: "10px",
                                        textAlign: "center",
                                    }}
                                >
                                    Novo
                                </div>
                            )}
                            ref={ref}
                            position={"right center"}
                            closeOnDocumentClick
                            className={styleModule.popup_trigger}
                            keepTooltipInside=".App"
                        >
                            <React.Fragment>
                                <ContainerComponent
                                    headerText={"Novo material"}
                                    headerButton={
                                        <CustomButton
                                            fontSize="var(--font_s)"
                                            fontColor="var(--font_color_inverted)"
                                            bgColor="var(--negative_button_color)"
                                            clickCallBack={closeTooltip}
                                        >
                                            Cancelar
                                        </CustomButton>
                                    }
                                >
                                    <NewMaterialPopup
                                        closePopup={closeTooltip}
                                    />
                                </ContainerComponent>

                                <BackgroundFader
                                    faderIndex={-2}
                                    callbackFunc={closeTooltip}
                                />
                            </React.Fragment>
                        </Popup>
                    </CustomButton>
                </div>
            </div>
            <ul className={styleModule.selector_content_ul}>{makeButtons()}</ul>
        </div>
    );
};

export default MaterialSelector;
