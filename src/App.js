import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./components/main";

function App() {
  return (
    <div className="App">
      <div>
        <Router>
          <Routes>
            <Route exact path="/" element={<Main />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
