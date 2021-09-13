import React from "react";
import ProfilePic from "../ProfilePicture/ProfilePic";

function ProfileHolder(props) {
  return (
    <div className="flex justify-between   w-72 mx-auto mb-2 items-center py-1">
      <div className="flex items-center">
        <div className="mx-2 ">
          <ProfilePic url={props.imageUrl} size="medium" />
        </div>

        <div className="ml-2 mr-4">
          {props.sugest ? (
            <p className="font-semibold text-sm">{props.firstName}</p>
          ) : (
            <p className="font-semibold text-sm">user name</p>
          )}

          <p className="text-gray-400 font-normal text-sm">Suggested for you</p>
        </div>
      </div>

      <div>
        {props.sugest ? (
          <p className="font-bold text-sm text-blue-600 cursor-pointer  cursor-pointer ">
            follow
          </p>
        ) : (
          <p
            onClick={props.logOut}
            className="font-bold text-sm text-blue-600 cursor-pointer "
          >
            log out
          </p>
        )}
      </div>
    </div>
  );
}

export default ProfileHolder;
