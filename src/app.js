import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './Counter/Counter';
import VisibilityToggle from './VisibilityToggle/VisibilityToggle';
import HexRgbConverter from './HexRgbConverter/components/HexRgbConverter';
import 'normalize.css/normalize.css'

//Swap out style file + component to change program
import './HexRgbConverter/styles/styles.scss';
ReactDOM.render(<HexRgbConverter/>,document.getElementById("app"));