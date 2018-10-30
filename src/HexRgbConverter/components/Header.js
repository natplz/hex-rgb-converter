import React from 'react';

const Header = (props) => (
  <div className="header">
    <h3>hex &nbsp; {(props.currentField === props.leftField) ? "-->" : "<--"} &nbsp; rgb</h3>
  </div>
);
export default Header;