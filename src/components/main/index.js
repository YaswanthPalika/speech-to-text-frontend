import "./index.css";
import { Component } from "react";
import Dictaphone from "../speech/index";
import Dictaphone1 from "../wordcloud/index";
//import SimpleCloud from "../wordcloud/index";

class Main extends Component {
  render() {
    return (
      <div>
        <Dictaphone1 />
        {/*<div className="word-cloud-container">
          <div className="word-cloud">
            <SimpleCloud />
          </div>
        </div> */}
      </div>
    );
  }
}

export default Main;
