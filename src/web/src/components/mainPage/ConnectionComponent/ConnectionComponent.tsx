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
    useContext,
    useEffect,
    useState,
} from "react";

import styleModule from "./ConnectionComponent.module.css";
import ContainerComponent from "components/containerComponent/containerComponent";
import CustomButton from "components/customSubComponents/customButton/customButton";
import CustomListSelector from "components/customSubComponents/customListSelector/customListSelector";
import { PortType } from "types/PortType";
import {
    connectToPortJS,
    disconnectGranuladoJS,
    getAvailablePortsListJS,
} from "api/backend-api";
import { toast } from "react-toastify";
import { IsConnectedContext } from "api/contexts/IsConnectedContext";

interface ConnectionComponentProps {}

const ConnectionComponent: FunctionComponent<ConnectionComponentProps> = () => {
    const [selectedPort, setSelectedPort] = useState<string>("");
    const [availablePorts, setAvailablePorts] = useState<PortType[]>([]);
    const [isConnected] = useContext(IsConnectedContext);

    const portSelectCallback = (key: string) => {
        const match = key.match(/^(.*?)\s*\|/);
        if (match) {
            const result = match[1].trim();

            setSelectedPort(result);
        }
    };

    const updateAvailablePorts = () => {
        getAvailablePortsListJS().then((portsResponse) => {
            toast.success("Lista de portas atualizada!");

            if (portsResponse) {
                setAvailablePorts(portsResponse);
            }
        });
    };

    useEffect(() => {
        updateAvailablePorts();
    }, []);

    const connectToPort = () => {
        connectToPortJS(selectedPort);
    };

    const disconnect = () => {
        disconnectGranuladoJS();
    };

    const getFormattedPorts = (): string[] => {
        return availablePorts.map(
            (element) => `${element.port} | ${element.desc}`
        );
    };

    return (
        <ContainerComponent
            headerText="Conexão"
            headerButton={
                <CustomButton
                    fontSize="var(--font_s)"
                    bgColor="var(--warning_button_color)"
                    clickCallBack={updateAvailablePorts}
                >
                    Atualizar
                </CustomButton>
            }
        >
            <CustomListSelector
                keys={getFormattedPorts()}
                clickCallBack={portSelectCallback}
                selected={selectedPort}
            >
                Porta
            </CustomListSelector>

            {isConnected ? (
                <CustomButton
                    className={styleModule.connect_button}
                    bgColor="var(--negative_button_color)"
                    fontColor="var(--font_color_inverted)"
                    clickCallBack={disconnect}
                >
                    DESCONECTAR
                </CustomButton>
            ) : (
                <CustomButton
                    className={styleModule.connect_button}
                    bgColor="var(--positive_button_color)"
                    fontColor="var(--font_color_inverted)"
                    clickCallBack={connectToPort}
                >
                    CONECTAR
                </CustomButton>
            )}
        </ContainerComponent>
    );
};

export default ConnectionComponent;
