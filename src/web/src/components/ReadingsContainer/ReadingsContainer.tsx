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

import { ReadingsContext } from "api/contexts/ReadingsContext";
import ContainerComponent from "components/containerComponent/containerComponent";
import CustomText from "components/customSubComponents/CustomText/CustomText";
import ZoomComponent from "components/zoomComponent/zoomComponent";
import { CSSProperties, FunctionComponent, useContext } from "react";

interface ReadingsContainerProps {
    className?: string;
    style?: CSSProperties;
    scaleOrigin: string;
}

const ReadingsContainer: FunctionComponent<ReadingsContainerProps> = ({
    className,
    style,
    scaleOrigin,
}) => {
    const [readingsContext] = useContext(ReadingsContext);

    return (
        <ZoomComponent
            className={className}
            style={style}
            scaleOrigin={scaleOrigin}
        >
            <ContainerComponent headerText="Leituras">
                <CustomText
                    title="Status"
                    value={`${readingsContext.status}`}
                />
                <CustomText
                    title="Eixo-Z Relativo"
                    value={`${readingsContext.z_axis_pos} mm`}
                />
                <CustomText
                    title="Carga atual"
                    value={`${readingsContext.current_load} N`}
                />
                <CustomText
                    title="Δ Carga atual"
                    value={`${readingsContext.current_delta_load} N/s`}
                />
            </ContainerComponent>
        </ZoomComponent>
    );
};

export default ReadingsContainer;
