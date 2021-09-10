import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Option from "../../components/Option/Option";
import StoryHolder from "../../components/StorieHolder/StoryHolder";
import Loading from "../../components/Loading/Loading";
import UploadBtn from "../../components/Button/TailUploadBtn";
import Slide from "./Side/Side";
import Side from "./Side/Side";

function Home() {
  const [openOption, setOpenOption] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const logout = () => {
    alert("Logout");
  };
  return (
    <div>
      {openOption ? (
        <div
          className="border fixed z-50 block top-0 right-0 w-full h-full lg:px-32 "
          onClick={() => {
            if (openOption) {
              setOpenOption(false);
            }
          }}
        >
          {" "}
          {openOption ? <Option logout={logout} /> : null}
        </div>
      ) : null}
      <Navbar showOptioin={() => setOpenOption(!openOption)} />
      <main>
        <section
          onClick={(e) => e.stopPropagation()}
          className="block lg:flex lg:justify-between lg:px-32"
        >
          <div className="w-full lg:w-150 mt-20">
            {loadingData ? (
              <Loading />
            ) : (
              <div className=" w-full flex  py-4 px-2 flex-nowrap mt-1 mb-1   border rounded bg-white story-container ">
                {/* {unsplashData?.map((persone) => ( */}
                <StoryHolder
                  key={"persone.id"}
                  name={"persone.firstName"}
                  image={"persone.profilePic"}
                />
                {/* ))} */}
              </div>
            )}
          </div>
          <div className="fixed z-100  bottom-4 w-auto lg:right-16 right-8   ">
            {" "}
            <div>
              <UploadBtn /*click={showUploadHadler} */ />
            </div>
          </div>
          <div>
            <Side />
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
