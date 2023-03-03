import "./App.css";

import { useState, useEffect } from "react";
import SideBar from "./components/sideBar/sideBar";
import MainPage from "./components/mainPage/mainPage";
//import FpsMeter from "./components/fpsMeter/fpsMeter";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SubPage from "./components/subPage/subPage";

// Fake database for static pages
import { fakeEel } from "./staticDB";

import GlobalConfigContext, {
    globalConfigDefault,
} from "./contexts/globalConfigContext";

export let eel = window.eel;
try {
    eel.set_host("ws://localhost:8080");
    toast.success("Conexão estabelecida");
    // Function exposed to the backend
    function toastError(msg) {
        toast.error(msg);
    }
    window.eel.expose(toastError, "toastError");

    // Function exposed to the backend
    function toastSuccess(msg) {
        toast.success(msg);
    }
    window.eel.expose(toastSuccess, "toastSuccess");
} catch {
    toast.error("Não foi possível conectar com o backend");
    eel = new fakeEel(); // Loading a fake db
    toast.info("Iniciando base de dados de testes");
}

const getMaterialList = async () => {
    try {
        const materialList = JSON.parse(await eel.get_material_list()());
        return materialList;
    } catch (error) {
        return [];
    }
};

function App() {
    const [globalConfig, setGlobalConfig] = useState(globalConfigDefault);
    const [materialList, setMaterialList] = useState([]);

    const pageList = ["Início", "Calibrar", "Controlar", "Configurar", "Sobre"];
    // options "Início", "Calibrar", "Controlar", "Config.", "Sobre"
    const [currentPage, setCurrentPage] = useState("Início");

    useEffect(() => {
        getMaterialList().then((response) => {
            setMaterialList(response);
        });
    }, []);

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
