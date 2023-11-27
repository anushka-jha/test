import React, { useState, useRef } from "react";
import "./App.css";
import axios from "axios";
import ComicForm from "./components/ComicForm";
import ComicPanel from "./components/ComicPanel";
import SpeechBubble from "./components/SpeechBubble";

const App = () => {
  const [comicPanels, setComicPanels] = useState([]);
  const [speechBubbles, setSpeechBubbles] = useState([]);
  const [showComicForm, setShowComicForm] = useState(false);
  const comicFormRef = useRef(null);

  const handleComicSubmit = async (textInputs) => {
    try {
      // Make API call with textInputs and get comic image URLs
      const imageUrls = await makeApiCall(textInputs);

      // Update comic panels state
      setComicPanels(imageUrls);

      // Optional: Add speech bubbles
      const newSpeechBubbles = textInputs.map((text, index) => ({
        text,
        position: { top: "50px", left: `${index * 100 + 20}px` },
      }));
      setSpeechBubbles(newSpeechBubbles);

      // Move to the next section after generating the comic
      setShowComicForm(false);

      // Scroll to the ComicForm section
      comicFormRef.current.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.error("Error generating comic:", error.message);
    }
  };

  const handleStartMaking = () => {
    // Show the ComicForm section
    setShowComicForm(true);
  };

  return (
    <div>
      <header className="app-header">
        <img
          src={process.env.PUBLIC_URL + "/images/dashtoon-logo.jfif"}
          alt="Dashtoon Logo"
          className="logo"
        />
        <div>
          <h1>DASHTOON</h1>
          <p>The World's Best Comics Have a New Home</p>
        </div>
      </header>
      <section className="tagline-section">
        <div className="tagline-content">
          <p className="tagline">Express your ideas and stories in comics.</p>
          <button onClick={handleStartMaking}>Start Making</button>
          {/* <button>Start Making</button> */}
        </div>
        <img
          src={process.env.PUBLIC_URL + "/images/cover-img.jpg"}
          alt="Cover Image"
          className="cover-img"
        />
      </section>
      {showComicForm && (
        <section ref={comicFormRef} className="comic-form-section">
          <ComicForm onSubmit={handleComicSubmit} />
          <div className="comic-display">
            {comicPanels.map((imageUrl, index) => (
              <ComicPanel key={index} imageUrl={imageUrl} />
            ))}
            {speechBubbles.map((bubble, index) => (
              <SpeechBubble
                key={index}
                text={bubble.text}
                position={bubble.position}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

// const makeApiCall = async (textInputs) => {
//   const apiUrl =
//     "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud"; // Replace with your actual backend API URL

//   try {
//     const response = await axios.post(
//       apiUrl,
//       {
//         inputs: textInputs.join("\n"),
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     if (response.status !== 200) {
//       console.error("Error generating comic. Status:", response.status);
//       throw new Error("Error generating comic");
//     }

//     return response.data.imageUrls;
//   } catch (error) {
//     console.error("Error generating comic:", error.message);
//     throw new Error("Error generating comic");
//   }
// };

const makeApiCall = async (textInputs) => {
  const apiUrl =
    "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud"; // Replace with your actual backend API URL
  const apiKey =
    "VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM";

  try {
    const response = await axios.post(
      apiUrl,
      { inputs: textInputs.join("\n") },
      {
        headers: {
          Accept: "image/png",
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    if (response.status !== 200) {
      console.error("Error generating comic. Status:", response.status);
      throw new Error("Error generating comic");
    }

    const imageBytes = await response.arrayBuffer();
    const imageBlob = new Blob([imageBytes], { type: "image/png" });
    const imageURL = URL.createObjectURL(imageBlob);
    return imageURL;
  } catch (error) {
    console.error("Error generating comic:", error.message);
    throw new Error("Error generating comic");
  }
};

export default App;
