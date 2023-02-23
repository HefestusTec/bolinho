import "./App.css";

import { useState, useEffect } from "react";
import SideBar from "./components/sideBar/sideBar";
import MainPage from "./components/mainPage/mainPage";
import FpsMeter from "./components/fpsMeter/fpsMeter";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SubPage from "./components/subPage/subPage";

import GlobalConfigContext, {
	globalConfigDefault,
} from "./contexts/globalConfigContext";

export const eel = window.eel;
try {
	eel.set_host("ws://localhost:8080");
	toast.success("Conexão estabelecida");
} catch {
	toast.error("Não foi possível conectar com o backend");
}

const getMaterialList = async () => {
	try {
		const materialList = JSON.parse(await eel.get_material_list()());
		return materialList;
	} catch (error) {
		return [];
	}
};

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

function App() {
	const [globalConfig, setGlobalConfig] = useState(globalConfigDefault);
	const [materialList, setMaterialList] = useState([]);

	// options "Início", "Calibrar", "Controlar", "Config.", "Sobre"
	const [currentPage, setCurrentPage] = useState("Início");

	useEffect(() => {
		getMaterialList().then((response) => {
			setMaterialList(response);
		});
	}, []);

	const toggleTheme = () => {
		if (globalConfig.theme === "dark") {
			setGlobalConfig({ ...globalConfig, theme: "light" });
			return;
		}
		setGlobalConfig({ ...globalConfig, theme: "dark" });
	};

	const createSubPage = () => {
		if (currentPage !== "Início")
			return (
				<SubPage
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
				/>
			);
	};

	return (
		<GlobalConfigContext.Provider value={[globalConfig, setGlobalConfig]}>
			<FpsMeter></FpsMeter>
			<div
				className="App"
				data_theme={globalConfig.theme}
				animation_speed={globalConfig.animationSpeed}
				animate_graph={globalConfig.animateGraph}
			>
				<SideBar
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
				/>
				<div className="content_area">
					<MainPage materialList={materialList} />
					{createSubPage()}
				</div>
				<button className="toggle_theme_button" onClick={toggleTheme}>
					THEME TEMP
				</button>
			</div>
			<ToastContainer className="toast_notify" transition={Zoom} />
		</GlobalConfigContext.Provider>
	);
}

export default App;
