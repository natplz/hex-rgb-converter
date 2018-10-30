import React from 'react';
import Header from './Header';
import Input from './Input';

export default class HexRgbConverter extends React.Component {

  hexLabel = "Hex";
  rgbLabel = "RGB";

  state = {
    currentField: this.hexLabel,
    hexValue: "#",
    rgbValue: "rgb(",
    pageStyle: {
      background: '#FDC8C8',
      color: 'black'
    },
    inputStyle: {
      color: 'black',
      borderBottom: '1px solid black'
    }
  };


  //Make user-selected field the current field
  handleCurrentField = (currentField) => {
    this.setState((prevState) => {
      if (currentField != prevState.currentField) {
        return { currentField };
      }
    });
  };

  handleChange = (id,value) => {
    //Set state, and then call attemptConvert
    let attribute="";
    if (id === this.hexLabel) {
      attribute = "hexValue";
    } else {
      attribute = "rgbValue";
    }
    this.setState(
      () => ({ [attribute]: value }),
      () => this.attemptConvert() 
    );
  }

  //Attempt to convert user-input
  attemptConvert = () => {
    if (this.state.currentField === this.hexLabel) { this.convertHex(); }
    else { this.convertRgb(); }
  };


  //Attempt to convert user-entered Hex value into valid RGB value
  convertHex = () => {
    //Hex code must start with '#'
    let hexCode = this.state.hexValue;
    if (hexCode.substr(0,1) !== '#') { return; }

    //Hex code must be six characters long
    hexCode = hexCode.substr(1);
    if (hexCode.length !== 6) { return; }

    //Hex code must convert to valid RGB
    const rVal = parseInt(hexCode.substr(0,2), 16);
    const gVal = parseInt(hexCode.substr(2,2), 16);
    const bVal = parseInt(hexCode.substr(4,2), 16);
    if ( isNaN(rVal) || isNaN(gVal) || isNaN(bVal) ) { return; }

    this.setState(() => ({ rgbValue: `rgb(${rVal},${gVal},${bVal})` }) );
    this.setStyle(rVal, gVal, bVal, "#"+hexCode);
  };


  //Attempt to convert user-entered RGB value into valid Hex value
  convertRgb = () => {
    let rgbCode = this.state.rgbValue;

    //Remove whitespace
    rgbCode = rgbCode.replace(/\s+/g,'');

    //Rgb code must start with 'rgb(' and end with ')'
    if (rgbCode.substr(0,4) !== 'rgb(' || !rgbCode.endsWith(')') ) { return; }
    rgbCode = rgbCode.substr(4);
    rgbCode = rgbCode.substr(0,rgbCode.length-1);

    //Rgb code must have three numeric values
    const vals = rgbCode.split(',');
    if (vals.length !== 3) { return; }

    //Loop through Rgb triplets
    let invalidTriplet = false;
    let hexArray = [];
    vals.forEach((val,index,array) => {

      //Each rgb triplet must be a legit number
      val = parseInt(val,10);
      if (isNaN(val)) { invalidTriplet = true; }
      if (val < 0 || val > 255 ) { invalidTriplet = true; }

      //Convert to hex, pad to two digits, and save in separate Hex array
      val = val.toString(16).toUpperCase();
      if(val.length < 2 ) { val = "0" + val; }
      hexArray[index] = val;
    });
    if (invalidTriplet === true) { return; }

    const hexVal = "#" + hexArray[0] + hexArray[1] + hexArray[2];
    this.setState(() => ({ hexValue: hexVal }) );

    //Pass base-10 rgb values to setStyle
    this.setStyle(vals[0],vals[1],vals[2],hexVal);
  };


  //Styles page around a given color.
  //No input-validation performed: by the time this function is called, validation should already be complete.
  //Arguments:
  //  - rVal, gVal, bVal - rgb values between 0 and 255 of a color
  //  - hexVal - full hexcode of the same color, including '#' prefix
  setStyle(rVal,gVal,bVal,hexVal) {

    //Calculate label color based on w3 accessibility forumula for determining color brightness: https://www.w3.org/TR/AERT/#color-contrast
    let labelColor = "white";
    const brightness = ( (rVal * 299) + (gVal * 587) + (bVal * 114) ) / 1000;
    if (brightness > 127 ) {
      labelColor = "black";
    }

    //Set background color, text color, input color
    this.setState(() => ({ pageStyle: {background: hexVal, color: labelColor} }) );
    this.setState(() => ({ inputStyle: {color: labelColor, borderBottom: `1px solid ${labelColor}` } }) );
  }
  


  render() {
    return (
      <div className="page" style={this.state.pageStyle}>
        <Header
          leftField={this.hexLabel}
          currentField={this.state.currentField}
        />
        <div className="outer-container">
          <div className="inner-container">
            <Input
              id={this.hexLabel}
              value={this.state.hexValue}
              style={this.state.inputStyle}
              handleFocus={this.handleCurrentField}
              handleChange={this.handleChange}
            />
            <Input
              id={this.rgbLabel}
              value={this.state.rgbValue}
              style={this.state.inputStyle}
              handleFocus={this.handleCurrentField}
              handleChange={this.handleChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

/* BUGS:
 * For some reason, hex duplet of "FL" is passing through parseInt and being set as a number
 *
 */



















