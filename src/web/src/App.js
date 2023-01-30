import "./App.css";
import SideBar from "./components/sideBar";

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
	return (
		<div className="App">
			<SideBar></SideBar>
			<div>content</div>
		</div>
	);
}

export default App;
