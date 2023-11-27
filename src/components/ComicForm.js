// src/components/ComicForm.js
import React, { useState } from "react";

const ComicForm = ({ onSubmit, status }) => {
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
    <>
      {textInputs.map((text, index) => (
        <div key={index}>
          <label>{`Panel ${index + 1}: `}</label>
          <input
            type="text"
            value={text}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
          {status[index] && <span class="loader"></span>}
        </div>
      ))}
      <button onClick={handleSubmit}>Generate Comics</button>
    </>
  );
};

export default ComicForm;
