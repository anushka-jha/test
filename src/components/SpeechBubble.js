// src/components/SpeechBubble.js
import React from "react";

const SpeechBubble = ({ text, position }) => {
  const styles = {
    position: "absolute",
    top: position.top,
    left: position.left,
    border: "1px solid #000",
    padding: "8px",
    borderRadius: "8px",
    backgroundColor: "#fff",
  };

  return <div style={styles}>{text}</div>;
};

export default SpeechBubble;
