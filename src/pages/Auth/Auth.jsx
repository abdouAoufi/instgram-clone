import React, { useState, useContext, useEffect } from "react";
import * as assets from "../../assets";
import Footer from "../../components/Footer/Footer";
import Login from "./Auth/Login/Login";
import Register from "./Auth/Register/Register";
import Download from "../../components/Download/GetApp";
import NotificationContext from "../../context/notification";
// import { auth } from "../../utils/firebase";

function Auth(props) {
  const container_classes = "flex justify-around align-center w-72";
  const heading_classes = "mb-4 text-center text-sm font-bold text-gray-500";
  const [isLogin, setIsLogin] = useState(true);
  const hideForLogin = { display: isLogin ? "none" : "block" };
  const showForLogin = { display: isLogin ? "block" : "none" };
  const headingStyle = "mb-4 text-center text-sm font-bold text-gray-500";
  const buttonStyle =
    "rounded text-white m-auto w-65 mb-4 py-1 px-4 text-base font-bold bg-blue-300";
  const windowStyle =
    "bg-white lg:border lg:border-gray-300 rounded shadow  w-full  md:w-8/12 mx-2  md:mt-4 mb-2  py-4 flex flex-col justify-center place-items-center lg:w-96";
  const papaStyle = " flex flex-col justify-center place-items-center";
  const switchBetweenTask = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className={papaStyle}>
      <div className={windowStyle}>
        <img src={assets.logoTypo} alt="logo" className="w-32 m-auto" />
        <p style={hideForLogin} className={headingStyle}>
          Sign up to see photos and videos <br /> from your fiends.
        </p>
        <button style={hideForLogin} className={buttonStyle}>
          Log in with Facebook
        </button>
        {!isLogin ? (
          <div className={container_classes}>
            <div
              className="w-full mr-2   mt-3 bg-gray-200"
              style={{ height: 1 }}
            ></div>
            <p className={heading_classes}> OR </p>
            <div
              className=" mt-3 w-full ml-2   bg-gray-200"
              style={{ height: 1 }}
            >
              {" "}
            </div>
          </div>
        ) : null}

        <div>{isLogin ? <Login /> : <Register />}</div>
        {isLogin ? (
          <div className={container_classes}>
            <div
              className="w-full mr-2   mt-3 bg-gray-200"
              style={{ height: 1 }}
            ></div>
            <p className={heading_classes}> OR </p>
            <div
              className=" mt-3 w-full ml-2   bg-gray-200"
              style={{ height: 1 }}
            >
              {" "}
            </div>
          </div>
        ) : null}

        <p
          style={showForLogin}
          className={`${headingStyle} cursor-pointer hover:underline`}
        >
          Login with facebook
        </p>

        <p
          style={showForLogin}
          className=" mb-4 text-center font-normal text-sm w-3/4 text-gray-500 cursor-pointer hover:underline"
        >
          Forgot password
        </p>

        <p
          style={hideForLogin}
          className="text-center font-light text-sm w-3/4 text-gray-500 "
        >
          By signing up , you agree to our{" "}
          <span className="text-gray-600 font-bold ">Terms, Data Policy </span>
          and <span className="text-gray-600 font-bold ">Cookies Policy.</span>
        </p>
      </div>

      <div style={hideForLogin} className={windowStyle}>
        <p className="text-center py-2">
          Have an account?
          <span
            onClick={switchBetweenTask}
            className="text-blue-400 cursor-pointer font-bold"
          >
            {" "}
            Log in
          </span>
        </p>
      </div>

      <div style={showForLogin} className={windowStyle}>
        <p className="text-center py-2">
          Don't have an account?{" "}
          <span
            onClick={switchBetweenTask}
            className="text-blue-400 cursor-pointer font-bold"
          >
            Sign up
          </span>
        </p>
      </div>
      <p className="text-lg mt-4 mb-6   ">Get the app. </p>
      <Download />
      <div>
        <Footer />
      </div>

      <div className="flex justify-center mb-12">
        <a className="text-xs mx-4 text-gray-600" href="/">
          English
        </a>
        <a className="text-xs text-gray-600 " href="/">
          &copy; 2021 Instagram from Facebook{" "}
        </a>
      </div>
    </div>
  );
}

export default Auth;
