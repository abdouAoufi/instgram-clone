import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./containers/Auth/Login/Login";
import Home from "./containers/Home/Home";

 

 

function App() {

  return (
    <Router>
      {/* <Login /> */}
      <Home />
    </Router>
  );
}

export default App;
