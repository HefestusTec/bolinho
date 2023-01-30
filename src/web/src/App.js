import logo from './logo.svg';
import './App.css';

export const eel = window.eel
try{
  eel.set_host( 'ws://localhost:8080' )

}catch{

}


async function printOne(){
  let returnValue = await eel.get_one()();
  alert(returnValue, 2);
}

printOne();

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
