import React from "react";

const notificationContext = React.createContext({
  status: false,
  displayNotification: () => {},
});

export default notificationContext;
