import { TagCloud } from "react-tagcloud";
import { Component } from "react";

class SimpleCloud extends Component {
  state = { data: [] };

  componentDidMount() {
    const keyData = this.props.keyData;
    const resultData = [];
    keyData.map((each) => {
      resultData.push({ value: each, count: Math.random() * 1000 });
    });
    this.setState({ data: resultData });
    console.log("yes");
  }

  render() {
    const { data } = this.state;
    return (
      <div className="word-cloud-container">
        <div className="word-cloud">
          <TagCloud
            minSize={12}
            maxSize={35}
            tags={data}
            onClick={(tag) => alert(`'${tag.value}' was selected!`)}
          />
        </div>
      </div>
    );
  }
}

export default SimpleCloud;
