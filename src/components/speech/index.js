import React from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Bars } from "react-loader-spinner";
import { TagCloud } from "react-tagcloud";
import { FaMicrophone } from "react-icons/fa";

const Dictaphone = () => {
  const [keyData, setKeyData] = React.useState([]);
  const [isMicOff, setMicOff] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);


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
    <div className="project">
      {/**mic */}
      {isMicOff && listening ? (
        <div>
          <button
            className="btn2"
            onClick={() => {
              SpeechRecognition.stopListening();
              setMicOff(false);
            }}
          >
            <div className="pulse-ring"></div>
            <FaMicrophone />
          </button>
        </div>
      ) : (
        <div>
          <button
            className="btn1"
            onClick={() => {
              SpeechRecognition.startListening();
              setMicOff(true);
            }}
          >
            <FaMicrophone />
          </button>
        </div>
      )}

      <div className="btn-container">
        <button
          className="btn btn-outline-primary"
          onClick={() => {
            resetTranscript();
            setKeyData([]);
          }}
        >
          Reset
        </button>
        <button
          className="btn btn-outline-success"
          onClick={async () => {
            setLoading(true);
            let details = { data: transcript };
            //https://speech-server-qnen.onrender.com
            const url = "http://localhost:8000/";
            details = JSON.stringify(details);
            const options = {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
              body: details,
            };
            //console.log(options);
            const response = await fetch(url, options);
            const data = await response.json();
            let result = data.split(",");
            const l = result.length;
            result = result.slice(1, l - 1);
            //console.log(result);
            let resultData = [];
            // eslint-disable-next-line
            result.map((each) => {
              resultData.push({ value: each, count: Math.random() * 1000 });
            });
            //console.log(resultData);
            setKeyData(resultData);
            setLoading(false);
          }}
        >
          submit
        </button>
      </div>

      <p className="input-para">
        {" "}
        <br /> <br /> {transcript}
      </p>
      <div className="word-cloud-container">
        {isLoading && (
          <Bars
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        )}
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
