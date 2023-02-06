import "./App.css";

import { useState } from "react";
import SideBar from "./components/sideBar/sideBar";
import MainPage from "./components/mainPage/mainPage";
//import FpsMeter from "./components/fpsMeter/fpsMeter";

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
	const [dataTheme, setDataTheme] = useState("");

	const toggleTheme = () => {
		if (dataTheme) {
			setDataTheme("");
			return;
		}
		setDataTheme("dark");
	};

	// TODO
	// To turn darkmode on <div className="App" data_theme={"dark"}>
	return (
		<div className="App" data_theme={dataTheme}>
			<SideBar />
			<div className="content_area">
				<MainPage />
			</div>
			<button className="toggle_theme_button" onClick={toggleTheme}>
				THEME TEMP
			</button>
		</div>
	);
}

export default App;
