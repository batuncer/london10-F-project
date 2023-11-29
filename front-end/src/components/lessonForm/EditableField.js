import React, { useState } from "react";
import "./form.css";
import { colors } from "@mui/material";

const EditableField = ({ options }, name, type) => {
  const [isInputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const handleDoubleClick = () => {
    setInputVisible(!isInputVisible);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleBlur = () => {
    setInputVisible(false);
  };

  return (
    <div className="input-line">
      {isInputVisible ? (
        <input
          type={type}
          name={name}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <select
          className="editable_field"
          value={selectedOption}
          onChange={handleSelectChange}
          onDoubleClick={handleDoubleClick}
        >
          <option
            value=""
            style={{ color: "rgba(128, 128, 128, 0.5)", fontSize: "10px" }}
          >
            Select or press "+" to add an option
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
      <button className="plusButton" type="button" onClick={handleDoubleClick}>
        {isInputVisible ? "➖" : "➕"}
      </button>
    </div>
  );
};

export default EditableField;
