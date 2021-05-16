import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "./containers/Auth/Auth/Auth";
import Home from "./containers/Home/Home";
import NotificationContext from "./notification-context";
import React, { useState } from "react";
import Test from "./containers/Test/Test"

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
          <Route path="/authentification" exact component={Auth}></Route>
          <Route path="/" exact component={Home}></Route>
          <Route path="/test" exact component={Test}></Route>
        </Switch>
      </NotificationContext.Provider>
    </Router>
  );
}

export default App;
