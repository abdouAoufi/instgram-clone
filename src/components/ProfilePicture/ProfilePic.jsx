import React from "react";

function ProfilePic(props) {
  let size =
    props.size === "medium"
      ? "w-10 h-10"
      : props.size === "big"
      ? "w-12 h-12"
      : "w-6 h-6";
  return (
    <div>
      <div className={size}>
        <img
          className="rounded-full shadow-sm"
          src={props.url}
          alt="user image"
        />
      </div>
    </div>
  );
}

export default ProfilePic;
