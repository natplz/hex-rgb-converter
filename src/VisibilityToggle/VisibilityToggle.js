import React from 'react';

export default class VisibilityToggle extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.handleToggleVisibility = this.handleToggleVisibility.bind(this);
    
    this.state = {
      visibility: false,
      descriptor: "Show Details"
    };
  }
  
  handleToggleVisibility() {
    this.setState((prevState) => {
      
      //Toggle button description
      let newDesc = "Show Details";
      if (prevState.descriptor === "Show Details") {
        newDesc = "Hide Details";
      }
      return {
        //Toggle visibility
        visibility: !prevState.visibility,
        descriptor: newDesc
      };
    });
  }
  
  render() {
    return (
      <div>
        <h1>Visibility Toggle</h1>
        <button onClick={this.handleToggleVisibility}>
          {this.state.descriptor}
        </button>
        <p>{this.state.visibility && `These are the super secret details!`}</p>
      </div>
    )
  }
}