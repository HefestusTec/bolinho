import "./App.css";

import { useState, useEffect } from "react";
import SideBar from "./components/sideBar/sideBar";
import MainPage from "./components/mainPage/mainPage";
//import FpsMeter from "./components/fpsMeter/fpsMeter";

import { Experiment, Material, DataPoint } from "./classes";

import GlobalConfigContext, {
	globalConfigDefault,
} from "./contexts/globalConfigContext";

export const eel = window.eel;
try {
	eel.set_host("ws://localhost:8080");
} catch {}

async function printOne() {
	let returnValue = await eel.get_one()();
	alert(returnValue, 2);
}

const getMaterialList = async () => {
	const getRandomInt = (min, max) => {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
	};

	const makeRandomData = () => {
		let randData = [];
		for (let i = 0; i < getRandomInt(5, 30); i++) {
			randData.push(new DataPoint(i * 5, getRandomInt(5, 30)));
		}
		return randData;
	};

	try {
		const materialList = await eel.get_material_list()();
		return materialList;
	} catch (error) {
		const materialList = [
			new Material(
				"Aço 1",
				"Mineradora São João",
				12,
				[
					new Experiment(
						"Retângulo 20 x 20",
						makeRandomData(),
						"Comprado por José"
					),
				],
				0
			),
			new Material(
				"Ferro",
				"Vale",
				2,
				[
					new Experiment(
						"Cilindro 10 x 10",
						makeRandomData(),
						"Comprado por Ana"
					),
				],
				1
			),
		];
		return materialList;
	}
};

printOne();

function App() {
	const [globalConfig, setGlobalConfig] = useState(globalConfigDefault);
	const [materialList, setMaterialList] = useState();

	useEffect(() => {
		getMaterialList().then((response) => {
			setMaterialList(response);
		});
	}, []);

	const toggleTheme = () => {
		// For debug
		setMaterialList((materialList) => [...materialList, new Material()]);

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
