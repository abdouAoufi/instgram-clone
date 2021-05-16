import React, { useEffect } from "react";
import ProfileHolder from "../ProfileHolder/ProfileHolder";
import Footer from "../../containers/Auth/Auth/Footer";

function Seggestion(props) {
  useEffect(() => {});
  return (
    <div>
      <p className="font-bold text-sm text-gray-400 my-4  ">
        Suggestions For You
      </p>
      <div className="">
        {props.data?.slice(0, 5).map((person) => (
          <ProfileHolder
            key={person.id}
            name={person.firstName}
            userName={person.userName}
            image={person.smallImage}
            sugest={true}
          />
        ))}
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
