import React, { useState } from "react";
import { useForm } from "react-hook-form";

const emailReg =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const inputStyle =
  "w-72 text-sm block px-4 py-2 border border-gray-300 rounded pl-2 mb-2 outline-none";
const dangetText = "text-xs font-normal text-red-500 mb-2";
const buttonStyle =
  "rounded text-white m-auto w-72 mb-4 py-1 px-4 text-base font-bold bg-blue-500";

function FormLogin(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    props.info(data);
  };

  return (
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
                value: emailReg,
                message: "It looks non valid email",
              },
            })}
            placeholder="Email"
          />
          {errors.email && <p className={dangetText}>{errors.email.message}</p>}
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
        <button
          onClick={handleSubmit(onSubmit)}
          className={`${buttonStyle} mt-2`}
        >
          Log in
        </button>
      </form>
    </div>
  );
}

export default FormLogin;
