import "./App.css";

import { useState } from "react";
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
	let returnValue = await eel.get_one()();
	alert(returnValue, 2);
}

printOne();

function App() {
	const [globalConfig, setGlobalConfig] = useState(globalConfigDefault);

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
					<MainPage />
				</div>
				<button className="toggle_theme_button" onClick={toggleTheme}>
					THEME TEMP
				</button>
			</div>
		</GlobalConfigContext.Provider>
	);
}

export default App;
