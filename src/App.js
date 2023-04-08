import { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GetName from './Name';
import GetAge from './Age';
import Profession from './Profession';
import Name from './Name61';
import Price from './Price61';
import Description from './Description61';


class Product extends Component{
  render(){
    return(
      <div>
        <Name name = {this.props.name}/> <Price price = {this.props.price}/> <Description description = {this.props.description}/>
      </div>
    )
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <p><GetName name ="Annie"/> is <GetAge age = {27}/> years old. She is a <Profession prof = "developer"/>.</p> */}
        {/*---lesson 61---*/}
        <div>
          <Product name="banabas" price="1$" description="Fresh bananas from Ecuador"/>
        </div>
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
