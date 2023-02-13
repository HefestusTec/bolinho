import "./App.css";

import { useState, useEffect } from "react";
import SideBar from "./components/sideBar/sideBar";
import MainPage from "./components/mainPage/mainPage";
//import FpsMeter from "./components/fpsMeter/fpsMeter";

import GlobalConfigContext, {
	globalConfigDefault,
} from "./contexts/globalConfigContext";

export const eel = window.eel;
try {
	eel.set_host("ws://localhost:8080");
} catch {}

async function printOne() {
	const returnValue = JSON.parse(await eel.get_material_list()());
	alert(returnValue, 2);
}

const getMaterialList = async () => {
	try {
		const materialList = JSON.parse(await eel.get_material_list()());
		console.log(materialList);
		return materialList;
	} catch (error) {
		return [];
	}
};

printOne();

function App() {
	const [globalConfig, setGlobalConfig] = useState(globalConfigDefault);
	const [materialList, setMaterialList] = useState([]);

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
	return (
		<GlobalConfigContext.Provider value={[globalConfig, setGlobalConfig]}>
			<div className="App" data_theme={globalConfig.theme}>
				<SideBar />
				<div className="content_area">
					<MainPage materialList={materialList} />
				</div>
				<button className="toggle_theme_button" onClick={toggleTheme}>
					THEME TEMP
				</button>
			</div>
		</GlobalConfigContext.Provider>
	);
}

export default App;
