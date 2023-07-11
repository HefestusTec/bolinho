/// <reference types="react-scripts" />
interface Window {
    eel: any;
}

declare var window: Window;

interface Navigator {
    app: any;
    serial: any;
}

declare var navigator: Navigator;

// Defines the return type from the JSON received from eel
type PortType = {
    port: string;
    desc: string;
};

interface globalAccessInterface {
    //(): void;
    ports: PortType[];
}
//declare module "*.module.css";
