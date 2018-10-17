import React from 'react';

const Header = (props) => (
  <div className="header">
    <h3>{props.title}</h3>
  </div>
);
Header.defaultProps = {
  title: "<Title Goes Here>"
}
export default Header;