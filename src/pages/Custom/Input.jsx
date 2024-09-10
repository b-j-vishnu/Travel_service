import React from "react";

const Input = ({ className, type, ref, divElement, placeholder, id, name }) => {
  return (
    <div className={divElement}>
      <input
        className={className}
        id={id}
        ref={ref}
        name={name}
        placeholder={placeholder}
        type={type}
      ></input>
    </div>
  );
};

export default Input;
