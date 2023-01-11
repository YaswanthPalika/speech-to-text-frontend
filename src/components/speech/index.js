import React, { useState, useEffect } from "react";
import "./index.css"
import html2canvas from "html2canvas";
import { Bars } from "react-loader-spinner";
import { TagCloud } from "react-tagcloud";
import { FaMicrophone } from "react-icons/fa";
/**------------------------------------------------------------------this is the updated file------------------------------------------------------*/
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continuous = true
mic.interimResults = true
mic.lang = 'en-US'

const Speech = () => {
  const [keyData, setKeyData] = React.useState([])
  const [isListening, setIsListening] = useState(false)
  const [note, setNote] = useState(null)
  const [count,setCount] = useState(0)
  const [flag,setFlag] = useState(false)
  const [isLoading, setLoading] = React.useState(false)

  useEffect(() => {
    handleListen()
    if(count === 0){
       setTimeout(() => {
        setIsListening(true)
       }, 1000);
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

  const LoaderComponent = () => {
    return (<Bars
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="bars-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />)
  }

  const WordComponent = () => {
    return (
      <div>
        <div className="word-cloud1">
            <TagCloud 
              id="word-cloud"
              minSize={12}
              maxSize={35}
              tags={keyData}
              onClick={(tag) => alert(`'${tag.value}' was selected!`)}
            />
            </div>
            <div>
                  <button className="btn btn-primary"
                    onClick={()=>{
                      window.location.reload(true)
                    }}>reset</button>
                  <button className="btn btn-primary"
                    onClick={async()=>{
                      const element = document.getElementById('word-cloud'),
                      canvas = await html2canvas(element),
                      data = canvas.toDataURL('image/jpg'),
                      link = document.createElement('a');
                  
                      link.href = data;
                      link.download = 'speech-to-text-service.jpg';
                  
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}>download</button>
            </div>
      </div>
    )
  }


  return (
    <div className="main-box1">
      <h1>Speech to text service</h1>
      {
        flag === false ? 
          <div> 
            <div className="notes1">
              <p placeholder="speak your notes">{note}</p>
            </div>
            <div className="cons1">
              <div>
                {isLoading && <LoaderComponent/>}
              </div>
              <div className="button-container1">
                <button className="btn btn-primary"
                 onClick={()=>{
                  window.location.reload(true)
                }} >reset</button>
                <button className="btn btn-success" 
                  onClick={async()=>{
                    setLoading(true);
                    setCount(1)
                    setIsListening(false)
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
                    setFlag(true)
                  }}>submit</button>
              </div>
            </div>
              
          </div> 
          : 
          <div className="word-cloud-con">
              <WordComponent />
          </div>
      }
    </div>  );
};
export default Speech;
