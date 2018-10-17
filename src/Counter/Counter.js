import React from 'react';

export default class Counter extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.handleAddOne = this.handleAddOne.bind(this);
    this.handleSubtractOne = this.handleSubtractOne.bind(this);
    this.handleReset = this.handleReset.bind(this);
    
    //Set default state object to contain all the objects we want to track
    this.state = {
      count: 0
    };
  }
  
  componentDidMount() {
    const count = parseInt(localStorage.getItem("count"), 10);
    if (!isNaN(count)) {
      this.setState(() => ({ count }) );
    }
  }
  
  componentDidUpdate(prevProps, prevState) {
    
    //If count changed, write to localStorage
    if(prevState.count !== this.state.count) {
      localStorage.setItem("count", this.state.count);
    }
  }
  
  handleAddOne() {
    
    //this.setState takes as a parameter one function. That function gets passed the previous state as a parameter, and needs to return some updates to make to the state
    this.setState((prevState) => {
      
      //This syntax means "return an object that I am creating here", I think
      return {
        count: prevState.count + 1
      };
    });
  }

  handleSubtractOne() {
    this.setState((prevState) => {
      return {
        count: prevState.count - 1
      };
    });
  }
  

  handleReset() {
    this.setState(() => ({ count: 0 }) );
  }
  
  render() {
    return (
      <div>
        <h1>Count: {this.state.count}</h1>
        <button onClick={this.handleAddOne}>+1</button>
        <button onClick={this.handleSubtractOne}>-1</button>
        <button onClick={this.handleReset}>Reset</button>
      </div>
    );
  }
}
