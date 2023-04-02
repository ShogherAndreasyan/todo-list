import logo from './logo.svg';
import './App.css';
import GetName from './Name';
import GetAge from './Age';
import Profession from './Profession';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p><GetName name ="Annie"/> is <GetAge age = {27}/> years old. She is a <Profession prof = "developer"/>.</p>
        
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
