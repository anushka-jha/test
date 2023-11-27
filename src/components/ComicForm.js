// src/components/ComicForm.js
import React, { useState } from "react";

const ComicForm = ({ onSubmit }) => {
  const [textInputs, setTextInputs] = useState(Array(10).fill(""));

  const handleInputChange = (index, value) => {
    const newInputs = [...textInputs];
    newInputs[index] = value;
    setTextInputs(newInputs);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(textInputs);
  };

  return (
    <form onSubmit={handleSubmit}>
      {textInputs.map((text, index) => (
        <div key={index}>
          <label>{`Panel ${index + 1}: `}</label>
          <input
            type="text"
            value={text}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
        </div>
      ))}
      <button type="submit">Generate Comic</button>
    </form>
  );
};

export default ComicForm;
