import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Main from "./components/main";
import Speech from "./components/speech";
import Sample from "./components/sample";

function App() {
  return (
    <div className="App">
      <div>
        <Speech />
      </div>
    </div>
  );
}

export default App;
