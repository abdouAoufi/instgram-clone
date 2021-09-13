import React, { useEffect } from "react";
import ProfileHolder from "../ProfileHolder/ProfileHolder";
import Footer from "../../components/Footer/Footer";

function Seggestion(props) {
  const listProfile = [];
  props.listProfile.forEach((p, i) => {
    if (i <= 4) listProfile.push(p);
  });
  console.log(listProfile);
  return (
    <div>
      <p className="font-bold text-sm text-gray-400 my-4  ">
        Suggestions For You
      </p>
      <div className="">
        {listProfile.map(profile => {
          console.log(profile.profilePic);
          return (
            <ProfileHolder
              sugest
              firstName={profile.firstName}
              imageUrl={profile.profilePic}
            />
          );
        })}
      </div>
      <div className="mx-2 mt-4">
        <Footer type={true} />
        <a className="text-xs mr-4 text-gray-600" href="/">
          English
        </a>
        <a className="text-xs text-gray-600 " href="/">
          &copy; 2021 Instagram from Facebook{" "}
        </a>
      </div>
    </div>
  );
}

export default Seggestion;
