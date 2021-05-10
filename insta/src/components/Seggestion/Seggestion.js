import React from "react";
import ProfileHolder from "../ProfileHolder/ProfileHolder";
import * as assets from "../../assets";
import Footer from "../../containers/Auth/Login/Footer";

function Seggestion() {
  return (
    <div>
      <p className="font-bold text-sm text-gray-400 mb-4 ">
        Suggestions For You
      </p>
      <div className="mb-8">

      {assets.storiesData.slice(0,4).map((person) => (
        <ProfileHolder
          name={person.name}
          userName={person.userName}
          image={person.image}
          sugest={true}
        />
      ))}
      </div>

      <Footer />

      {/* Language copyRight */}
      <div className=" mb-12">
        <a className="text-sm mr-4 text-gray-600" href="/">
          English
        </a>
        <a className="text-sm text-gray-600 " href="/">
          &copy; 2021 Instagram from Facebook{" "}
        </a>
      </div>
      
    </div>
  );
}

export default Seggestion;
