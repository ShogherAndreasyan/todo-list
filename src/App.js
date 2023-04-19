import { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
// import GetName from './Name';
// import GetAge from './Age';
// import Profession from './Profession';
import Name from './Name61';
import Price from './Price61';
import Description from './Description61';


class Product extends Component{
  render(){
    return(
      <div>
        <Name name = {this.props.name}/> 
        <Price price = {this.props.price}/> 
        <Description description = {this.props.description}/>
      </div>
    )
  }
}

class App extends Component {
  state = {
    amd: 0,
    usdRate: 391,

    products: [
      {
        name: 'banana',
        price: '3',
        description: 'fruit1'
      },
      {
        name: 'apple',
        price: '2',
        description: 'fruit2'
      },
      {
        name: 'orange',
        price: '4',
        description: 'fruit3'
      },
    ]
  }

  inputChange = (event) =>{
    console.log(event.target.value);
    this.setState({
      amd: event.target.value,
    });
  };

  render(){
    const productComponents = this.state.products.map(el => {
      return(
        <Product
        key = {el.name}
        name = {el.name}
        price = {el.price}
        description = {el.description}
        />
      )
    });
  
    const usd = (this.state.amd / this.state.usdRate).toFixed(2)
    return (
      <div className="App">
          <div>
            {productComponents}
          </div>
  
          AMD: <input
            type='number'
            placeholder='AMD'
            onChange={this.inputChange}
          />
          <input type='text' value={usd} readOnly={true}/> :USD
      </div>
    );
  }
}

export default App;
