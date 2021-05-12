import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./containers/Auth/Login/Login";
import Home from "./containers/Home/Home";
import Alert from "./components/Alerts/Alert";
import NotificationContext from "./notification-context";
import React, { useState } from "react";

function App() {
  const [showNotification, setShowNotification] = useState(false);

  const displayNotification = () => {
    setShowNotification(!showNotification);
  };

  return (
    <Router>
      <NotificationContext.Provider
        value={{
          status: showNotification,
          displayNotification: displayNotification,
          
        }}
      >
        
          {/* <Login /> */}
        <Home />
      </NotificationContext.Provider>
    </Router>
  );
}

export default App;
