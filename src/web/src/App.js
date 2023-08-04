import "./App.css";

import { useState, useEffect } from "react";
//import FpsMeter from "./components/fpsMeter/fpsMeter";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { saveConfigParams, loadConfigParams } from "./api/backend-api";

import GlobalConfigContext, {
    globalConfigDefault,
} from "./contexts/globalConfigContext";
import Prompter from "./components/prompter/prompter";
import VirtualInput from "./components/virtualInput/virtualInput";
import Home from "pages/Home";

import("./api/linker");

function App() {
    const [globalConfig, setGlobalConfig] = useState(globalConfigDefault);
    const [prompter, setPrompter] = useState();
    const [doOnce, setDoOnce] = useState(true);

    try {
        function getConfigJS() {
            return globalConfig;
        }
        window.eel.expose(getConfigJS, "getConfigJS");
    } catch (error) {}

    const [vKeyboard, setVKeyboard] = useState(false);
    const [enableHover, setEnableHover] = useState(globalConfig.enableHover);

    useEffect(() => {
        if (doOnce) {
            // Loading the config params from the file
            loadConfigParams().then((response) => {
                if (response === 0) return;
                if (response.configVersion >= globalConfig.configVersion) {
                    setGlobalConfig(response);
                    return;
                }
                saveConfigParams(globalConfig);
            });
            setDoOnce(false);
        }
    }, [globalConfig, doOnce]);

    // Updating the save file every time global config is changed
    useEffect(() => {
        setEnableHover(globalConfig.enableHover);
        saveConfigParams(globalConfig);
    }, [globalConfig]);

    const getAppClassName = () => {
        if (globalConfig.shadows) return "App";
        return ["App", "disable_shadows"].join(" ");
    };
    function promptUserJS(description, options) {
        // Creates a prompt
        setPrompter(
            <Prompter
                description={description}
                options={options}
                myStateSetter={setPrompter}
            />
        );
        return 1;
    }
    try {
        window.eel.expose(promptUserJS, "promptUserJS");
    } catch (error) {}

    const callPrompter = () => {
        promptUserJS("Descrição", ["sim", "não", "talvez", "não", "talvez"]);
    };
    const toggleKeyboard = () => {
        setVKeyboard(!vKeyboard);
    };
    const getVirtualKeyboard = () => {
        if (vKeyboard) return <VirtualInput />;
        return;
    };
    return (
        <GlobalConfigContext.Provider value={[globalConfig, setGlobalConfig]}>
            <div
                className={getAppClassName()}
                data_theme={globalConfig.theme}
                animation_speed={globalConfig.animationSpeed}
                animate_graph={globalConfig.animateGraph}
                font_size={globalConfig.fontSize}
                enable_hover={enableHover}
            >
                {getVirtualKeyboard()}
                {prompter}
                <Home />
                <div
                    style={{
                        position: "absolute",
                        zIndex: 300,
                    }}
                >
                    <button onClick={callPrompter}>Propmt</button>{" "}
                    <button onClick={toggleKeyboard}>Toggle keyboard</button>{" "}
                </div>
            </div>
            <ToastContainer className="toast_notify" transition={Zoom} />
        </GlobalConfigContext.Provider>
    );
}

export default App;
