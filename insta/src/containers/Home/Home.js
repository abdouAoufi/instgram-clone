import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import StoryHolder from "../../components/StorieHolder/StoryHolder";
import * as assets from "../../assets";
import './Home.css'

const Home = () => {
  return (
    <div>
      <Navbar />
      {/* stories */}
      <section>
        {/* stories */}
        <div className=" w-full flex border py-2 flex-nowrap mt-1 rounded bg-white story-container lg:w-1/2"  >
          {assets.storiesData.map((persone) => (
            <StoryHolder name={persone.name} image={persone.image} />
          ))}
        </div>
      </section>
      {/* maincontainer */}
    </div>
  );
};

export default Home;
