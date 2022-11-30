import React from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import SimpleCloud from "../wordcloud/index";
import { TagCloud } from "react-tagcloud";

const Dictaphone = () => {
  const [keyData, setKeyData] = React.useState([]);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      <p>Microphone: {listening ? "on" : "off"}</p>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <button
        onClick={async () => {
          let details = { data: transcript };

          const url = "http://localhost:8000/";
          details = JSON.stringify(details);
          const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: details,
          };
          //console.log(options);
          const response = await fetch(url, options);
          const data = await response.json();
          let result = data.split(",");
          const l = result.length;
          result = result.slice(1, l - 1);
          console.log(result);
          let resultData = [];
          result.map((each) => {
            resultData.push({ value: each, count: Math.random() * 1000 });
          });
          console.log(resultData);
          setKeyData(resultData);
        }}
      >
        submit
      </button>
      <p className="input-para">
        {" "}
        <br /> your input <br /> {transcript}
      </p>
      <div className="word-cloud-container">
        <div className="word-cloud">
          <TagCloud
            minSize={12}
            maxSize={35}
            tags={keyData}
            onClick={(tag) => alert(`'${tag.value}' was selected!`)}
          />
        </div>
      </div>
    </div>
  );
};
export default Dictaphone;
