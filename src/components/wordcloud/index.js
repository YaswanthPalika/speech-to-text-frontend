import React, { useState, useEffect } from "react";

import { Bars } from "react-loader-spinner";
import { TagCloud } from "react-tagcloud";
import { FaMicrophone } from "react-icons/fa";
/**------------------------------------------------------------------this is the main file------------------------------------------------------*/
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continuous = true
mic.interimResults = true
mic.lang = 'en-US'

const Dictaphone1 = () => {
  const [keyData, setKeyData] = React.useState([])
  const [isListening, setIsListening] = useState(false)
  const [note, setNote] = useState(null)
  const [count,setCount] = useState(0)
  const [isLoading, setLoading] = React.useState(false)

  useEffect(() => {
    handleListen()
    if(count === 0){
       setTimeout(() => {
        setIsListening(true)
       }, 3000);
      setCount(1)
    }
  }, [isListening])

  const handleListen = () => {
    if (isListening) {
      mic.start()
      mic.onend = () => {
        console.log('continue...')
      }
    } else {
      mic.stop()
      mic.onend = () => {
        console.log('Stopped Mic on Click')
      }
    }
    mic.onstart = () => {
      console.log('Mics on')
    }

    mic.onresult = event => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
      console.log(transcript)
      setNote(transcript)
      mic.onerror = event => {
        console.log(event.error)
      }
    }
  }



  return (
    <div className="project">
      {/**mic */}
      {isListening ? (
        <div>
          <button
            className="btn2"
            onClick={() => {
              setIsListening(false)
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
              setIsListening(true)
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
            setNote(null)
            setKeyData([]);
            setIsListening(false)
          }}
        >
          Reset
        </button>
        <button
          className="btn btn-outline-success"
          onClick={async () => {
            setLoading(true);
            let details = { data: note };
            //https://speech-server-qnen.onrender.com
            const url = "https://speech1.onrender.com/service";
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
            console.log(options);
            const response = await fetch(url, options)
            const data = await response.json()
            console.log(data.data)
            const x = data.data
            let result = x.split(",")
            const l = result.length
            result = result.slice(1, l - 1)
            console.log(result);
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
        <br /> <br /> {note}
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
export default Dictaphone1;
