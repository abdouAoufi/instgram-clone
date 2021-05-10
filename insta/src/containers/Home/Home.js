import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import StoryHolder from "../../components/StorieHolder/StoryHolder";
import * as assets from "../../assets";
import "./Home.css";
import Post from "../../components/Post/Post";
import ProfileHolder from "../../components/ProfileHolder/ProfileHolder";
import Seggestion from "../../components/Seggestion/Seggestion";
import Footer from "../Auth/Login/Footer"

const Home = () => {
  return (
    <div>
      <Navbar />
      {/* stories */}
      <section className="block lg:flex lg:justify-between lg:px-32">
        {/* // ! FIRST BIG PARRENT  */}
        <div className="w-full lg:w-3/4  ">
        {/* stories */}
        <div className=" w-full flex  py-4 px-2 flex-nowrap mt-1 mb-1 border rounded bg-white story-container ">
          {assets.storiesData.map((persone) => (
            <a href="/"> <StoryHolder name={persone.name} image={persone.image} /> </a>
          ))}
        </div>
        {/* feeds */}
        {assets.storiesData.map((persone) => (
          <Post
            userName={persone.name}
            imageUrl={persone.image}
            caption={persone.caption}
          />
        ))}
        </div>
        {/* // ! SECOND BIG PARENT */}
        <div className=" hidden w-80 mx-8  pt-12  px-2  lg:block   ">
          {/* side bar information */}
          {/* Profile insperctor */}
          <ProfileHolder name="Aoufi abderahmanee" userName="Abd__ou" image={assets.profilePic} />

          {/* suggestion */}
          <Seggestion />


        </div>
      </section>
      {/* maincontainer */}
    </div>
  );
};

export default Home;
