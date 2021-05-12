import React from "react";
import Avatar from "../Avatar/Avatar";
import * as assets from "../../assets";

function ProfileHolder(props) {
  return (
    <div className="flex justify-between  mb-1 w-72 mx-auto  items-center py-2">
      <div className="flex items-center">
        <div className="mx-2 ">
          <Avatar
            name={props.namr}
            type={props.sugest ? null : "big"}
            imgUrl={props.image}
            alt={props.name}
          />
        </div>

        <div className="ml-2 mr-4">
          <p className="font-bold text-sm">{props.userName}</p>
          <p className="text-gray-400 font-normal text-sm">{props.name}</p>
        </div>
      </div>

      <div>
        {props.sugest ? (
          <p className="font-bold text-sm text-blue-600 cursor-pointer  cursor-pointer ">follow</p>
        ) : (
          <p onClick={props.logOut} className="font-bold text-sm text-blue-600 cursor-pointer ">log out</p>
        )}
      </div>
    </div>
  );
}

export default ProfileHolder;
