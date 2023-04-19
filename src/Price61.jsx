import { Component } from 'react';

class Price extends Component{
  constructor(props){
    super(props);
    this.state={
      price: props.price + '$',
      usdRate: 391,
    }
  }

  changeCurrency = ()=>{
    let newPrice;
    newPrice = (this.state.price.includes('$')) ? 
    parseFloat(this.state.price) * this.state.usdRate + '֏':
    parseFloat(this.state.price) / this.state.usdRate + '$';
  
    this.setState({
      price: newPrice,
    })
  }
    render(){
      return(
        <div>
          <span>{this.state.price}</span>
          <button onClick={this.changeCurrency}>Change the currency</button>
        </div>
      )
    }
}

export default Price;

