import { Component } from 'react';

class Description extends Component{
    render(){
      console.log(this.props.description);
      return(
        <span>{this.props.description}</span>
      )
    }
}

export default Description;