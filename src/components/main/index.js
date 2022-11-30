import "./index.css";
import { Component } from "react";
import Dictaphone from "../speech/index";
//import SimpleCloud from "../wordcloud/index";

class Main extends Component {
  render() {
    return (
      <div>
        <Dictaphone />
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
