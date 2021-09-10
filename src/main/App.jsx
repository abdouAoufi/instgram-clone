import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Auth from "../pages/Auth/Auth";
import Home from "../pages/Home/Home";
import NotificationContext from "../context/notification";
import React, { useState } from "react";
import Limited from "../pages/Limited/Limited";

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
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/auth" exact>
            <Auth />
          </Route>
          <Route>
            <Limited />
          </Route>
        </Switch>
      </NotificationContext.Provider>
    </Router>
  );
}

export default App;
