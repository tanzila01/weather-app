import logo from "./logo.svg";
import "./App.css";
import Home from "./container/Home";
import Header from "./component/Header";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Navigate,
  Routes,
} from "react-router-dom";
import Forcast from "./component/Forcast";

function App() {
  return (
    <Router>
      <Header />
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
        <Routes>
          <Route exact path="/forcast" element={<Forcast />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
