import React from 'react';

export default class Input extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: this.props.output};
    this.handleCurrentField = this.handleCurrentField.bind(this);
  }

  componentDidUpdate() {
    /*alert(`this.state.value: ${this.state.value}`);
    alert(`this.props.output: ${this.props.output}`);
    if (this.state.value != this.props.output) {
      this.setState(() => ({ value: this.props.output }) );
    }*/
  }


  handleCurrentField(e) {
    e.persist();
    this.setState(() => ({ value: e.target.value.toUpperCase() }) );
    this.props.handleCurrentField(this.props.label);
  }

  returnValue = () => {
    return document.getElementById(this.props.label).value;
  }

  render() {
    return (
      <div>
        <form>
          <label htmlFor={this.props.label}>{this.props.label}</label>
          <input
            type="text"
            id={this.props.label}
            value={this.props.output}
            onChange={this.handleCurrentField}
          />
        </form>
      </div>
    );
  }
}








/*import React from 'react';

export default class Input extends React.Component {


  handleCurrentField = () => {
    this.props.handleCurrentField(this.props.label);
  }

  returnValue = () => {
    return document.getElementById(this.props.label).value;
  }

  render() {
    return (
      <div>
        <form>
          <label htmlFor={this.props.label}>{this.props.label}</label>
          <input
            type="text"
            id={this.props.label}
            value={this.props.output}
            onChange={this.handleCurrentField}
          />
        </form>
      </div>
    );
  }
}*/
