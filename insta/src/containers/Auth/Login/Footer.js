import React from "react";

const Footer = () => {
  const fontSize = "text-sm"
  return (
      <div className="mx-auto mb-4  w-full ">
        <a href="/" className="text-xs font-normal text-gray-600 mr-3 ">
          About
        </a>
        <a href="/" className="text-xs font-normal text-gray-600 mr-3 ">
          Blog
        </a>
        <a href="/" className="text-xs font-normal text-gray-600 mr-3 ">
          Help
        </a>
        <a href="/" className="text-xs font-normal text-gray-600 mr-3 ">
          API
        </a>
        <a href="/" className="text-xs font-normal text-gray-600 mr-3 ">
          Terms
        </a>
        <a href="/" className="text-xs font-normal text-gray-600 mr-3 ">
          Privacy
        </a>
      <br/>

        <a href="/" className="text-xs font-normal text-gray-600 mr-3 ">
          Hashtags
        </a>
        <a href="/" className="text-xs font-normal text-gray-600 mr-3 ">
          Location
        </a>
      </div>
  );
};

export default Footer ;
