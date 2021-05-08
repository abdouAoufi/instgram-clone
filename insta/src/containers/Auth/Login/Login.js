import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as assets from "../../../assets";
import apps from "../.././../assets/images/d-app-store.jpg";
import play from "../.././../assets/images/d-play-store.jpg";
import { Footer } from "./Footer";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [info, setInfo] = useState(null);
  const hideForLogin = { display: isLogin ? "none" : "block" };
  const showForLogin = { display: isLogin ? "block" : "none" };
  const inputStyle =
    "w-72 text-sm block px-4 py-2 border border-gray-300 rounded pl-2 mb-2 outline-none";
  const headingStyle = "mb-4 text-center text-sm font-bold text-gray-500";
  const buttonStyle =
    "rounded text-white m-auto w-72 mb-4 py-1 px-4 text-base font-bold bg-blue-500";
  const dangetText = "text-xs font-normal text-red-500 mb-2";
  const windowStyle =
    "bg-white border border-gray-300 rounded w-5/6  mt-4 mb-2  p-4 flex flex-col justify-center place-items-center lg:w-96";
  const bigContainerStyle = "flex justify-around align-center w-72";
  const papaStyle =
    "bg-gray-100 flex flex-col justify-center place-items-center";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    setInfo(data);
  };
  if (info) {
    console.log(info.email, info.password);
  }
  const switchBetweenTask = () => {
    setIsLogin(!isLogin);
  };
  //  ! Mobile first

  const ORTAG = (
    <div className={bigContainerStyle}>
      <div
        className="w-full mr-2   mt-3 bg-gray-200"
        style={{ height: 1 }}
      ></div>
      <p className={headingStyle}> OR </p>
      <div className=" mt-3 w-full ml-2   bg-gray-200" style={{ height: 1 }}>
        {" "}
      </div>
    </div>
  );
  return (
    <div className={papaStyle}>
      {/* First window container */}
      <div className={windowStyle}>
        {/* logo */}
        <a href="/">
          <img src={assets.logoTypo} alt="logo" className="w-32 m-auto" />
        </a>
        {/* heading */}
        <p style={hideForLogin} className={headingStyle}>
          Sign up to see photos and videos <br /> from your fiends.
        </p>
        {/* login with facebook button  */}
        <button style={hideForLogin} className={buttonStyle}>
          Log in with Facebook
        </button>
        {/* or  */}
        {!isLogin ? ORTAG : null}

        {/* ? Input fields  */}
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input
                type="email"
                className={inputStyle}
                defaultValue=""
                {...register("email", {
                  required: {
                    value: true,
                    message: "Please Enter your Email ",
                  },
                  minLength: {
                    value: 5,
                    message: "Minimum length for email is 5  ",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: "It looks non valid email",
                  },
                })}
                placeholder="Email"
              />
              {errors.email && (
                <p className={dangetText}>{errors.email.message}</p>
              )}
            </div>
            <div style={hideForLogin}>
              <input
                className={inputStyle}
                type="text"
                {...register("fullName", {
                  required: {
                    value: true,
                    message: "Name field is required ",
                  },
                  pattern: {
                    value: /^[a-zA-Z]/,
                    message: "Please enter a valid name",
                  },
                  minLength: { value: 4, message: "Please enter a valid name" },
                })}
                placeholder="Full Name"
              />
              {errors.fullName && (
                <p className={dangetText}>{errors.fullName.message}</p>
              )}
            </div>

            <div style={hideForLogin}>
              <input
                className={inputStyle}
                type="text"
                {...register("userName", {
                  required: {
                    value: true,
                    message: "Username field is required ",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9]/,
                    message: "Please enter a valid username",
                  },
                  minLength: {
                    value: 5,
                    message: "Please enter a valid username",
                  },
                })}
                placeholder="Username"
              />
              {errors.userName && (
                <p className={dangetText}>{errors.userName.message}</p>
              )}
            </div>

            <div>
              <input
                className={inputStyle}
                type="password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password field is required ",
                  },

                  minLength: {
                    value: 8,
                    message: "Please enter a valid Password",
                  },
                })}
                placeholder="Password"
              />
              {errors.password && (
                <p className={dangetText}>{errors.password.message}</p>
              )}
            </div>
            <button type="submit" className={`${buttonStyle} mt-2`}>
              {isLogin ? "Log in" : "Sign Up "}
            </button>
          </form>
        </div>
        {/* or  */}
        {isLogin ? ORTAG : null}

        <p style={showForLogin} className={headingStyle}>
          Login with facebook
        </p>

        <a
          href="/"
          style={showForLogin}
          className=" mb-4 text-center font-normal text-sm w-3/4 text-gray-500 "
        >
          Forgot password
        </a>

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
      <p className="text-lg mt-4 mb-8   ">Get the app. </p>
      <div className="flex justify-between  mb-12">
        <a href="/">
          <img
            src={apps}
            className="w-32 h-10 object-fit mx-1"
            alt="Download on app store"
          />
        </a>
        <a href="/">
          <img
            src={play}
            className="w-32 h-10 object-fit mx-1 "
            alt="Download on play store"
          />
        </a>
      </div>

      {/* links */}
      <Footer />

      {/* Language copyRight */}
      <div className="flex justify-center mb-12">
        <a className="text-sm mx-4 text-gray-600" href="/">
          English
        </a>
        <a className="text-sm text-gray-600 " href="/">
          &copy; 2021 Instagram from Facebook{" "}
        </a>
      </div>
    </div>
  );
}

export default Login;
