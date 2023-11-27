import React, { useState, useRef } from "react";
import "./App.css";
import axios from "axios";
import ComicForm from "./components/ComicForm";
import ComicPanel from "./components/ComicPanel";
import SpeechBubble from "./components/SpeechBubble";


const makeApiCall = async (data) => {
  data = {"inputs" : data}
  console.log("called api");
  const response = await fetch(
      "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
      {
          headers: {
              "Accept": "image/png",
              "Authorization": "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM",
              "Content-Type": "application/json"
          },
          method: "POST",
          body: JSON.stringify(data),
      }
  );
  console.log("response", response);
  const result = await response.blob();
  const imageURL = URL.createObjectURL(result);
  return imageURL;
};

const App = () => {
  const [speechBubbles, setSpeechBubbles] = useState([]);
  const [showComicForm, setShowComicForm] = useState(false);
  const [status, setStatus] = useState(Array(10).fill(false));

  // make images an array of 10
  const [ComicImages, setComicImages] = useState(Array(10).fill(""));
  console.log("ComicImages", ComicImages);
  const comicFormRef = useRef(null);
  const bg_img =
    "https://file.notion.so/f/f/131d7e41-d82d-418c-9dda-51f55df96d2e/ed6247f0-c23e-435f-8a9c-eb9316996a1d/DALLE_2023-11-07_18.16.09_-_Craft_a_sophisticated_and_premium_image_that_represents_a_Comic_Creator_Web_App._Picture_an_ultra-modern_and_luxurious_artists_workspace_featuring.png?id=45dabf01-cc50-4d0a-9f65-d33cf7a522ae&table=block&spaceId=131d7e41-d82d-418c-9dda-51f55df96d2e&expirationTimestamp=1701165600000&signature=9MoqaSveiX-rJ3NXEUDgJX-fW7ZhyifkdUOLh4gm5iE&downloadName=DALL%C2%B7E+2023-11-07+18.16.09+-+Craft+a+sophisticated+and+premium+image+that+represents+a+%27Comic+Creator+Web+App%27.+Picture+an+ultra-modern+and+luxurious+artist%27s+workspace%2C+featuring.png";

  const handleComicSubmit = async (textInputs) => {
    try {
      console.log("textInputs", textInputs);

      textInputs.map(async (text, index) => {
        if(!text) return;
        let stat = [...status];
        stat[index] = true;
        setStatus(stat);
        console.log("loading");
        const imageURL = await makeApiCall(text);
        stat[index] = false;
        setStatus(stat);
        console.log("Unloading");
        images = [...ComicImages];
        images[index] = imageURL;
        setComicImages(images);
      });
    } catch (error) {
      console.error("Error generating comic:", error.message);
    }
  };

  const handleStartMaking = () => {
    setShowComicForm(true);
  };

  return (
    <div>
      <>
        <header className="app-header">
          <img src={bg_img} alt="Dashtoon Logo" className="logo" />
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
          <img src={bg_img} alt="Cover Image" className="cover-img" />
        </section>
        <section className="features-section">
          {ComicImages.map((image, index) => {
            if (image) {
              return (
                <>
                  <h1>Panel {index + 1}</h1>
                  <img src={image} alt="Comic Image" className="comic-img" />;
                </>
              );
            }
          })}
        </section>
        <>
          {showComicForm && (
            <section ref={comicFormRef} className="comic-form-section">
              <ComicForm onSubmit={handleComicSubmit} status={status}/>
            </section>
          )}
        </>
      </>
    </div>
  );
};

export default App;
