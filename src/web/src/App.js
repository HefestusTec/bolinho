import "./App.css";

import { useState, useEffect } from "react";
import SideBar from "./components/sideBar/sideBar";
import MainPage from "./components/mainPage/mainPage";
//import FpsMeter from "./components/fpsMeter/fpsMeter";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SubPage from "./components/subPage/subPage";

import {
    getMaterialList,
    saveConfigParams,
    loadConfigParams,
} from "./api/backend-api";

import GlobalConfigContext, {
    globalConfigDefault,
} from "./contexts/globalConfigContext";

import("./api/linker");

function App() {
    const [globalConfig, setGlobalConfig] = useState(globalConfigDefault);
    const [materialList, setMaterialList] = useState([]);
    const [initialized, setInitialized] = useState(false);

    try {
        function getConfigJS() {
            return globalConfig;
        }
        window.eel.expose(getConfigJS, "getConfigJS");
    } catch (error) {}

    const pageList = ["Início", "Calibrar", "Controlar", "Configurar", "Sobre"];
    // options "Início", "Calibrar", "Controlar", "Config.", "Sobre"
    const [currentPage, setCurrentPage] = useState("Início");

    // Runs only once
    if (!initialized) {
        getMaterialList().then((response) => {
            setMaterialList(response);
        });

        // Loading the config params from the file
        loadConfigParams().then((response) => {
            if (response === 0) return;
            if (response.configVersion >= globalConfig.configVersion) {
                setGlobalConfig(response);
                return;
            }
            saveConfigParams(globalConfig);
        });
        setInitialized(true);
    }

    // Updating the save file every time global config is changed
    useEffect(() => {
        saveConfigParams(globalConfig);
    }, [globalConfig]);

    const createSubPages = () => {
        return pageList.map((item) => {
            if (currentPage !== "Início") {
                return (
                    <SubPage
                        key={item}
                        myPage={item}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                );
            }
            return <></>;
        });
    };

    return (
        <GlobalConfigContext.Provider value={[globalConfig, setGlobalConfig]}>
            <div
                className="App"
                data_theme={globalConfig.theme}
                animation_speed={globalConfig.animationSpeed}
                animate_graph={globalConfig.animateGraph}
            >
                <SideBar
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    pageList={pageList}
                />
                <div className="content_area">
                    <MainPage materialList={materialList} />
                    {createSubPages()}
                </div>
            </div>
            <ToastContainer className="toast_notify" transition={Zoom} />
        </GlobalConfigContext.Provider>
    );
}

export default App;
