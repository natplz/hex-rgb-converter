import React from 'react';
import Header from './Header';
import Input from './Input';
import Arrow from './Arrow';
import Button from './Button';

export default class HexRgbConverter extends React.Component {

  hexLabel = "Hex";
  rgbLabel = "RGB";
  hexRef = React.createRef();
  rgbRef = React.createRef();

  state = {
    currentField: this.hexLabel,
    hexValue: "",
    rgbValue: ""
  };


  //Change current field to the one where the user is typing
  handleCurrentField = (currentField) => {
    this.setState((prevState) => {
      if (currentField != prevState.currentField) {
        return { currentField };
      }
    });
  };

  handleConvert = () => {
    if (this.state.currentField === this.hexLabel) { this.convertHex(); }
    else { this.convertRgb(); }
  };

  convertHex = () => {
    /* Sanitize here */
    const hexCode = this.hexRef.returnValue();
    const rVal = parseInt(hexCode.substr(0,2), 16);
    const gVal = parseInt(hexCode.substr(2,2), 16);
    const bVal = parseInt(hexCode.substr(4,2), 16);

    this.setState(() => ({ rgbValue: `rgb(${rVal},${gVal},${bVal})` }) );
  };

  convertRgb = () => {
    /* Sanitize*/
    let rgbCode = this.rgbRef.returnValue();

    //Remove whitespace
    rgbCode = rgbCode.replace(/\s+/g,'');

    const vals = rgbCode.split(',');

    vals.forEach((val,index,array) => {
      val = val.replace(/\D/g,''); //Remove non-digit characters
      val = parseInt(val,10);
      val = val.toString(16).toUpperCase();
      if(val.length < 2 ) { val = "0" + val; } //Pad to two-digit hex number
      array[index] = val;
    });

    const rVal = vals[0];
    const gVal = vals[1];
    const bVal = vals[2];
    this.setState(() => ({ hexValue: "#" + rVal + gVal + bVal }) );

  };


  render() {
    return (
      <div>
        <Header title="RGB to Hex Converter"/>
        <div className="outer-container">
          <div className="inner-container">
            <Input
              label={this.hexLabel}
              output={this.state.hexValue}
              ref={instance => { this.hexRef = instance } }
              handleCurrentField={this.handleCurrentField}
            />
            <Arrow/>
            <Input
              label={this.rgbLabel}
              output={this.state.rgbValue}
              ref={instance => { this.rgbRef = instance } }
              handleCurrentField={this.handleCurrentField}
            />
          </div>
          <Button handleConvert={this.handleConvert}/>
        </div>
      </div>
    );
  }
}
/* TO DO:
 * Make mutable text inputs (https://reactjs.org/docs/forms.html#controlled-components)
 * 
 * Make arrow flip
 * Sanitize inputs
 * Stop page refresh when I type in a form and hit "enter"
 * Style
 *
 * https://www.webpagefx.com/web-design/hex-to-rgb/
 */



















