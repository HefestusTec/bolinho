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
import CurrentPageProvider from "contexts/currentPageContext";
import { PageType } from "types/PageType";
import { setCurrentPageCallBack } from "api/exp-core-api";
import Experiment from "pages/Experiment/Experiment";

import("./api/linker");

function App() {
    const [globalConfig, setGlobalConfig] = useState(globalConfigDefault);
    const [prompter, setPrompter] = useState<JSX.Element | undefined>(
        undefined
    );
    const [initialized, setInitialized] = useState(false);

    try {
        const getConfigJS = () => {
            return globalConfig;
        };
        window.eel.expose(getConfigJS, "getConfigJS");
    } catch (error) {}

    const [vKeyboard, setVKeyboard] = useState(false);
    const [enableHover, setEnableHover] = useState(globalConfig.enableHover);

    const [currentPage, setCurrentPage] = useState<PageType>("home");

    useEffect(() => {
        setCurrentPageCallBack(setCurrentPage);
    }, []);

    // Updating the save file every time global config is changed
    useEffect(() => {
        if (initialized) {
            setEnableHover(globalConfig.enableHover);
            saveConfigParams(globalConfig);
        } else {
            // Loading the config params from the file
            loadConfigParams().then((response) => {
                if (response) {
                    setGlobalConfig(response);
                }
            });
            setInitialized(true);
        }
    }, [globalConfig, initialized]);

    const getAppClassName = () => {
        if (globalConfig.shadows) return "App";
        return ["App", "disable_shadows"].join(" ");
    };
    function promptUserJS(description: string, options: string[]) {
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
        promptUserJS(
            "Essa é uma mensagem que pode ser acionada pelo backend, o usuário PRECISA responder com uma das opções (também fornecidas pelo backend). Ao selecionar uma resposta a callback function ligada à esse prompt é chamada e a resposta é passada como argumento.",
            ["SIM", "NÃO", "TALVEZ", "NÃO", "TALVEZ"]
        );
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
            <CurrentPageProvider>
                <div
                    className={getAppClassName()}
                    data-theme={globalConfig.theme}
                    animation-speed={globalConfig.animationSpeed}
                    animate-graph={globalConfig.animateGraph}
                    font-size={globalConfig.fontSize}
                    enable-hover={enableHover}
                >
                    {getVirtualKeyboard()}
                    {prompter}
                    {currentPage === "home" ? <Home /> : <Experiment />}
                    <div
                        style={{
                            position: "absolute",
                            zIndex: 300,
                        }}
                    >
                        <button onClick={callPrompter}>Propmt</button>{" "}
                        <button onClick={toggleKeyboard}>
                            Toggle keyboard
                        </button>
                    </div>
                </div>
                <ToastContainer className="toast_notify" transition={Zoom} />
            </CurrentPageProvider>
        </GlobalConfigContext.Provider>
    );
}

export default App;
