import React from "react";
import Avatar from "../Avatar/Avatar";

function StoryHolder(props) {
  return (
    <div className=" inline-block  cursor-pointer text-center mx-1 max-h-24">
      <div  className="mx-auto p-1 inline-block border-2 border-red-500 overflow-hidden border-radius-50 rounded-full " >
        <Avatar type={"big"} imgUrl={props.image} />
      </div>

      <p className="w-16 mx-auto font-normal text-black text-sm text-center overflow-hidden ">{props.name}</p>
    </div>
  );
}

export default StoryHolder;
