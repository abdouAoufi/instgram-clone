import React from "react";

function Window(props) {
  return (
    <div
      className={`bg-white  w-65  min-h-59 outline-none border-0 rounded-xl lg:w-100 `}
    >
      <div className="flex justify-between flex-col mx-auto h-full">
        <div className="text-base font-semibold text-gray-500 text-center     border-b py-3">
          {props.dataWindow.title}
        </div>
        <div className="text-base font-normal text-gray-600  px-4   py-6  ">
          {" "}
          {props.dataWindow.content}
        </div>
        <div className="text-sm   font-semibold text-blue-600 text-center py-3 border-t ">
          <span onClick={() => props.setOpen(false)} className="cursor-pointer">
          {props.dataWindow.btntext}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Window;
