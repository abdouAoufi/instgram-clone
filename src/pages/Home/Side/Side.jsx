import React from "react";
import ProfileHolder from "../../../components/ProfileHolder/ProfileHolder";
import Seggestion from "../../../components/Seggestion/Seggestion";

function Side(props) {
  console.log(props.sideProfile);
  return (
    <div className=" hidden w-80 mx-8 pt-8  px-2  lg:block mt-16  ">
      <ProfileHolder />
      <Seggestion listProfile={props.sideProfile} />
    </div>
  );
}

export default Side;
