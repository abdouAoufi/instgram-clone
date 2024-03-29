import React from "react";

const Footer = (props) => {
  return (
      <div className={`mx-auto mb-4  w-full ${!props.type ? "text-center" : "text-left"}`}>
        <a href="/" className="text-xs font-normal text-gray-500 mr-3 ">
          About
        </a>
        <a href="/" className="text-xs font-normal text-gray-500 mr-3 ">
          Blog
        </a>
        <a href="/" className="text-xs font-normal text-gray-500 mr-3 ">
          Help
        </a>
        <a href="/" className="text-xs font-normal text-gray-500 mr-3 ">
          API
        </a>
        <a href="/" className="text-xs font-normal text-gray-500 mr-3 ">
          Terms
        </a>
        <a href="/" className="text-xs font-normal text-gray-500 mr-3 ">
          Privacy
        </a>
      <br/>

        <a href="/" className="text-xs font-normal text-gray-500 mr-3 ">
          Hashtags
        </a>
        <a href="/" className="text-xs font-normal text-gray-500 mr-3 ">
          Location
        </a>
        <a href="/" className="text-xs font-normal text-gray-500 mr-3 ">
          Top accounts
        </a>
      </div>
  );
};

export default Footer ;
