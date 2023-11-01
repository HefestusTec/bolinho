import "./App.css";

import { useState, useEffect, useContext } from "react";
//import FpsMeter from "./components/fpsMeter/fpsMeter";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
    saveConfigParams,
    loadConfigParams,
    isFakeEel,
} from "./api/backend-api";

import GlobalConfigContext from "./contexts/globalConfigContext";
import Prompter from "./components/prompter/prompter";
// import VirtualInput from "./components/virtualInput/virtualInput";
import Home from "pages/Home";
import Experiment from "pages/Experiment/Experiment";
import { ExperimentPageProvider } from "api/contexts/ExperimentPageContext";
import { ReadingsProvider } from "api/contexts/ReadingsContext";
import FocusProvider from "api/contexts/FocusContex";
import { globalConfigDefault } from "api/apiTypes";
import IsConnectedProvider from "api/contexts/IsConnectedContext";
import { setCurrentPageCallBack } from "staticDB";
import { CurrentPageContext } from "api/contexts/CurrentPageContext";
import { SelectedExperimentsContext } from "contexts/SelectedExperimentsContext";

import("./api/linker");

function App() {
    const [globalConfig, setGlobalConfig] = useState(globalConfigDefault);
    const [prompter, setPrompter] = useState<JSX.Element | undefined>(
        undefined
    );
    const [initialized, setInitialized] = useState(false);
    const [selectedExperiments, setSelectedExperiments] = useState<number[]>(
        isFakeEel ? [-1] : []
    );
    try {
        const getConfigJS = () => {
            return globalConfig;
        };
        window.eel.expose(getConfigJS, "getConfigJS");
    } catch (error) {}

    // const [vKeyboard, setVKeyboard] = useState(false);
    const [enableHover, setEnableHover] = useState(globalConfig.enableHover);

    const [currentPage, setCurrentPage] = useContext(CurrentPageContext);

    useEffect(() => {
        setCurrentPageCallBack(setCurrentPage);
    }, [setCurrentPage]);

    // Updating the save file every time global config is changed
    useEffect(() => {
        if (initialized) {
            setEnableHover(globalConfig.enableHover);
            saveConfigParams(globalConfig);
            document.documentElement.setAttribute(
                "data-theme",
                globalConfig.theme
            );
            document.documentElement.setAttribute(
                "animation-speed",
                globalConfig.animationSpeed
            );
            document.documentElement.setAttribute(
                "custom-font-size",
                globalConfig.fontSize
            );
            document.documentElement.setAttribute("enable-hover", enableHover);
        } else {
            // Loading the config params from the file
            loadConfigParams().then((response) => {
                if (response) {
                    setGlobalConfig(response);
                }
            });
            setInitialized(true);
        }
    }, [globalConfig, initialized, enableHover]);

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

    // const getVirtualKeyboard = () => {
    //     if (vKeyboard) return <VirtualInput />;
    //     return;
    // };
    return (
        <GlobalConfigContext.Provider value={[globalConfig, setGlobalConfig]}>
            <SelectedExperimentsContext.Provider
                value={[selectedExperiments, setSelectedExperiments]}
            >
                <IsConnectedProvider>
                    <ReadingsProvider>
                        <FocusProvider>
                            <ExperimentPageProvider>
                                <div className={getAppClassName()}>
                                    {/* {getVirtualKeyboard()} */}
                                    {prompter}
                                    {currentPage === "home" ? (
                                        <Home />
                                    ) : (
                                        <Experiment />
                                    )}
                                    {/* <div
                                    style={{
                                        position: "absolute",
                                        zIndex: 300,
                                    }}
                                >
                                    <button onClick={toggleKeyboard}>
                                        Toggle keyboard
                                    </button>
                                </div> */}
                                </div>
                                <ToastContainer
                                    className="toast_notify"
                                    transition={Zoom}
                                />
                            </ExperimentPageProvider>
                        </FocusProvider>
                    </ReadingsProvider>
                </IsConnectedProvider>
            </SelectedExperimentsContext.Provider>
        </GlobalConfigContext.Provider>
    );
}

export default App;
