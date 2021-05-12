import React from "react";

function OrComponent() {
   const bigContainerStyle = "flex justify-around align-center w-72"; 
   const headingStyle = "mb-4 text-center text-sm font-bold text-gray-500";
  return (
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
}

export default OrComponent;
