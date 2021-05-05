import React from "react";
import Avatar from "@material-ui/core/Avatar";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

// const urlImage = ""

const Post = ({ userName, imageUrl, caption }) => {
  return (
    <div className="w-1/3 h-auto bg-white max-w-31 m-auto border border-gray-300 my-8 rounded mb-8">
      <div className=" flex justify-between items-center py-2 px-2  ">
        <div className="flex justify-between items-center">
          <Avatar
            className="mr-3"
            src="https://images.unsplash.com/photo-1578616070222-50c4de9d5ade?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=656&q=80"
            alt="Maissa"
          />
          <p className="font-semibold">{userName}</p>
        </div>
        <a href="/">
          <MoreHorizIcon className="text-gray-400" />
        </a>
      </div>
      <div className="">
        <img className=" object-fit   w-full" src={imageUrl} alt="" />
      </div>
      <div className="px-2 py-4">
        <p className="text-sm">
          <strong className="text-sm">{userName} </strong> {caption}
        </p>
      </div>
    </div>
  );
};

export default Post;
