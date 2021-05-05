import React, { Component } from "react";

export default class Login extends Component {
  render() {
    return (
        <div className="block p-2 bg-white rounded-xl flex flex-col justify-center place-items-center">
           <p className="text-lg font-bold text-gray-400 text-center mb-4 ">Login </p>
            <input
              className="block px-4 py-2 border border-gray-300 rounded pl-2 mb-4"
              type="text"
              placeholder="email"
              name="email"
            />
            <input
              className="block px-4 py-2 border border-gray-300 rounded pl-2 mb-4"
              type="password"
              placeholder="password"
              name="password"
            />

            <button className="block w-32 m-auto px-4 py-2 border border-gray-300 rounded text-center">
              Login
            </button>
        </div>
    );
  }
}
