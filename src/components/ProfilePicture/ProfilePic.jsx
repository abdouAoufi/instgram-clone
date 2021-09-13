import React from "react";

function ProfilePic(props) {
  let size =
    props.size === "medium"
      ? "w-10 h-10"
      : props.size === "big"
      ? "w-12 h-12"
      : "w-4 h-4";
  return (
    <div>
      <div className={size}>
        <img
          className="rounded-full shadow-sm"
          src={
            props?.url ||
            "https://st4.depositphotos.com/3864435/27060/i/600/depositphotos_270605520-stock-photo-default-avatar-profile-icon-grey.jpg"
          }
          alt="user image"
        />
      </div>
    </div>
  );
}

export default ProfilePic;
