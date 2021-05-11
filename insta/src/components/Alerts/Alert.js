import React , {useContext} from "react";
import NotificationContext  from "../../notification-context";  

const Alert = ({ color, display, text }) => {
  const notification = useContext(NotificationContext);
  return (
    <div
      className={
        " shadow-xl text-white  px-6 mx-4 rounded py-4  z-50 right-0 left-0 lg:w-150 w-5/6 mx-auto fixed top-20 bg-pop"
      }
    >
      <span className="text-xl inline-block mr-5 align-middle">
        <i className="fas fa-bell" />
      </span>
      <span className="inline-block align-middle mr-8">{text}</span>
      <button
        className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
        onClick={notification.displayNotification}
      >
        <span>×</span>
      </button>
    </div>
  );
};

export default Alert;