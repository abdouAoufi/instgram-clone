import React, { useState, useContext, useEffect } from "react";
import * as assets from "../../../assets";
import Footer from "./Footer";
import FormLogin from "./FormLogin";
import FormSigUp from "./FormSignUP";
import GetApp from "./GetApp";
import OrComponent from "./OrComponent";
import Alert from "../../../components/Alerts/Alert";
import NotificationContext from "../../../notification-context";
import { auth } from "../../../firebase";

function Auth(props) {
  const [notifTxt, setNotifTxt] = useState("Error something went wrong !");
  const [isLogin, setIsLogin] = useState(true);
  const [userSignIn , setUserSignIn] = useState(false);
  const hideForLogin = { display: isLogin ? "none" : "block" };
  const showForLogin = { display: isLogin ? "block" : "none" };
  const headingStyle = "mb-4 text-center text-sm font-bold text-gray-500";
  const buttonStyle =
    "rounded text-white m-auto w-65 mb-4 py-1 px-4 text-base font-bold bg-blue-300";
  const windowStyle =
    "bg-white lg:border lg:border-gray-300 rounded shadow  w-full  md:w-8/12 mx-2  md:mt-4 mb-2  py-4 flex flex-col justify-center place-items-center lg:w-96";
  const papaStyle =
    " flex flex-col justify-center place-items-center";

  // ! Redirect if the user logged in
  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        displayNotification("User already logged in !");
        setTimeout(() => {
          props.history.replace("/");
        }, 1000);
      } else {
        // setUserSignIn(true); // that means the user is signin  
      }
    });
  }, [userSignIn]);

  const showinfo = ({ email, password, fullName }) => {
    if (isLogin) {
      signIn(email, password);
    } else {
      signUp(email, password, fullName);
    }
  };

  const signIn = (email, passwod) => {
    console.log("Sign in .....");
    auth
      .signInWithEmailAndPassword(email, passwod)
      .then((userCredential) => {
        // Signed in
        let user = userCredential.user;
        setUserSignIn(true);
        // ...
      })
      .catch((error) => {
        let errorMessage = error.message;
        displayNotification(errorMessage);
      });
  };

  const signUp = (email, password, displayName) => {
    // ! SIGN UP
    console.log("Sign up .....");

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        let user = userCredential.user;
        updateProfile(user, displayName);
      })
      .catch((error) => {
        let errorMessage = error.message;
        displayNotification(errorMessage);
      });
  };
  const notification = useContext(NotificationContext);

  const updateProfile = (user, userName) => {
    user
      .updateProfile({ displayName: userName })
      .then((response) => {
        setUserSignIn(true);
      })
      .catch((error) => {
        alert("failed");
      });
  };
  const switchBetweenTask = () => {
    setIsLogin(!isLogin);
  };

  const displayNotification = (text) => {
    setNotifTxt(text);
    notification.displayNotification();
  };
  //  ! Mobile first

  console.log("Rerendring .....");
  return (
    <div className={papaStyle}>
      {notification.status ? <Alert text={notifTxt} /> : null}
      <div className={windowStyle}>
        <img src={assets.logoTypo} alt="logo" className="w-32 m-auto" />
        <p style={hideForLogin} className={headingStyle}>
          Sign up to see photos and videos <br /> from your fiends.
        </p>
        <button
          onClick={displayNotification.bind(this, "This feature not aviable ")}
          style={hideForLogin}
          className={buttonStyle}
        >
          Log in with Facebook
        </button>
        {!isLogin ? <OrComponent /> : null}

        <div>
          {isLogin ? (
            <FormLogin info={showinfo} />
          ) : (
            <FormSigUp info={showinfo} />
          )}
        </div>
        {isLogin ? <OrComponent /> : null}

        <p
          style={showForLogin}
          className={`${headingStyle} cursor-pointer hover:underline`}
          onClick={displayNotification.bind(this, "This feature not aviable ")}
        >
          Login with facebook
        </p>

        <p
          onClick={displayNotification.bind(this, "This feature not aviable ")}
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
      {/* app store and play store */}
      <p className="text-lg mt-4 mb-6   ">Get the app. </p>
      <GetApp />
      <div>
        <Footer />
      </div>

      {/* Language copyRight */}
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
