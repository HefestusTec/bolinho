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
    useState,
    useContext,
    useMemo,
    FunctionComponent,
    CSSProperties,
    useEffect,
} from "react";
import { useLongPress } from "use-long-press";
import GlobalConfigContext from "../../contexts/globalConfigContext";
import BackgroundFader from "../backgroundFader/backgroundFader";
import { FocusContext } from "api/contexts/FocusContex";
import { FocusKeyType } from "api/apiTypes";

interface ZoomComponentProps {
    scaleOrigin: string;
    className?: string;
    children?: any;
    style?: CSSProperties;
    focusKey?: FocusKeyType;
}

const ZoomComponent: FunctionComponent<ZoomComponentProps> = ({
    scaleOrigin = "top",
    className = "",
    style,
    children,
    focusKey,
}) => {
    const [globalConfig] = useContext(GlobalConfigContext);
    const [focus, setFocus] = useContext(FocusContext);
    const [isActive, setIsActive] = useState(false);
    const [canZoom, setCanZoom] = useState(true);
    const [zIndexVal, setZIndexVal] = useState("inherit");

    useEffect(() => {
        if (focus === focusKey) {
            setIsActive(true);
            setFocus("none");
        }
    }, [focus, focusKey, setFocus]);

    const usedZoom = () => {
        if (canZoom) setIsActive(!isActive);
    };

    const resetCanZoom = () => {
        setCanZoom(true);
    };

    const bindLongPress = useLongPress(usedZoom, {
        cancelOnMovement: 1,
        captureEvent: true,
        threshold: globalConfig.zoomDelay,
        onFinish: resetCanZoom,
        onStart: resetCanZoom,
    });

    const fallBackPressed = () => {
        setIsActive(false);
    };

    const scrolled = (event: any) => {
        if (event) {
            setCanZoom(false);
        }
    };

    const transitioned = (property: React.TransitionEvent<HTMLDivElement>) => {
        if (property.propertyName === "transform") {
            if (!isActive) setZIndexVal("inherit");
            else setZIndexVal("10");
        }
    };

    const getStyle = useMemo(() => {
        if (isActive) {
            return {
                transformOrigin: scaleOrigin,
                transitionDuration: "var(--animation_slow)",
                transform: "scale(var(--zoom_scale))",
                zIndex: 10,
                ...style,
            };
        }

        return {
            transformOrigin: scaleOrigin,
            transitionDuration: "var(--animation_slow)",
            zIndex: zIndexVal,
            ...style,
        };
    }, [isActive, scaleOrigin, zIndexVal, style]);

    const createFallBack = useMemo(() => {
        if (isActive) {
            return <BackgroundFader callbackFunc={fallBackPressed} />;
        }
        return null;
    }, [isActive]);

    return (
        <>
            <div
                className={className}
                style={getStyle}
                {...bindLongPress()}
                onScrollCapture={scrolled}
                onTransitionEndCapture={transitioned}
            >
                {children}
            </div>
            {createFallBack}
        </>
    );
};

export default ZoomComponent;
