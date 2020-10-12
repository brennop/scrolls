import React from "react";

const Theme = ({ theme, onChange: handleChange }) => {
  const handleSelect = (event) => {
    const value = event.target.value;
    handleChange(value);
  };

  return (
    <>
      <label htmlFor="theme">Theme: </label>
      <select id="theme" value={theme} onChange={handleSelect}>
        <option value="default">Default</option>
        <option value="tomorrow">Tomorrow</option>
      </select>
    </>
  );
};

export default Theme;
