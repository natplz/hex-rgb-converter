import React from 'react';


//Props argument here is written using ES6 "object destructuring"
const Input = ( {id, value, style, handleFocus, handleChange} ) => (
  <div>
    <form onSubmit={ (e) => e.preventDefault() }>
      {/* <label htmlFor={label}>{label}</label> */}
      <input
        className="inputField"
        type="text"
        id={id}
        style={style}
        value={value}
        onFocus={ () => handleFocus(id) }
        onChange={ (e) => handleChange(id,e.target.value) }
      />
    </form>
  </div>
);
export default Input;
