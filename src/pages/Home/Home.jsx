import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Option from "../../components/Option/Option";
import StoryHolder from "../../components/StorieHolder/StoryHolder";
import Loading from "../../components/Loading/Loading";
import UploadBtn from "../../components/Button/TailUploadBtn";
import Post from "../../components/Post/Post";
import Side from "./Side/Side";
import { auth, db } from "../../utils/firebase";
import { AuthContextProvider } from "../../context/auth";
import { useHistory } from "react-router-dom";
import { createApi } from "unsplash-js";
import Modal from "../../components/Modal/Modal";
import Window from "../../components/Window/Window";

function Home() {
  const api = createApi({
    accessKey: "XIMULt5ue5Ps6Tm7TkKY1YGan2Bj_4K4ybUCE4f3mOE"
  });
  const [openOption, setOpenOption] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [dbPost, setdbPost] = useState([]);
  const [storyList, setStoryList] = useState([]);
  const [dataWindow, setDataWindow] = useState({
    title: "Not authenticated!",
    content: "Sorry it looks like you're not connected, try to login!",
    btntext: "Okey, thanks!"
  });
  let history = useHistory();

  const logout = () => {
    auth.signOut().then(() => alert("Sign out"));
  };

  useEffect(() => {
    auth.onAuthStateChanged(function(user) {
      if (!user) {
        console.log("Authenticated");
        setOpenModal(true);
        setTimeout(() => {
          history.push("/auth");
        }, 2000);
      }
    });
  }, []);

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    console.log("Loading data ......");
    db.collection("posts")
      .get()
      .then(querySnapshot => {
        console.log(querySnapshot);
        setLoadingData(false);
        let tempHolder = [];
        querySnapshot.forEach(doc => {
          tempHolder.push(doc.data());
        });
        setdbPost(tempHolder);
        setTimeout(getUnsplashData, 2000);
      });
  };

  const getUnsplashData = () => {
    api.search
      .getPhotos({ query: "cars", orientation: "landscape" })
      .then(result => {
        const dataRetrived = result.response.results;
        let storyList = [];
        dataRetrived.forEach(singleImage => {
          storyList.push({
            firstName: singleImage.user.first_name,
            profilePic: singleImage.user.profile_image.large
          });
        });
        setStoryList(storyList);
      })
      .catch(() => {});
  };

  const closeModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <AuthContextProvider>
      <div>
        <Modal openModal={openModal}>
          <Window dataWindow={dataWindow} />
        </Modal>
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
            onClick={e => e.stopPropagation()}
            className="block lg:flex lg:justify-between lg:px-32"
          >
            <div className="w-full lg:w-150 overflow-hidden mt-20">
              {loadingData ? (
                <Loading />
              ) : (
                <div className=" w-full flex   py-4 px-2 flex-nowrap mt-1 mb-1   border rounded bg-white story-container ">
                  {storyList?.map(persone => (
                    <StoryHolder
                      key={persone.firstName}
                      name={persone.firstName}
                      image={persone.profilePic}
                    />
                  ))}
                </div>
              )}
              <div>
                {dbPost?.map(persone => {
                  return (
                    <Post
                      likes={persone.totalLikes}
                      profileImg={persone.profilePic}
                      key={persone.id}
                      userName={persone.firstName}
                      imageUrl={persone.fullImage}
                      caption={persone.descreption}
                    />
                  );
                })}
              </div>
            </div>

            <div className="fixed z-100  bottom-4 w-auto lg:right-16 right-8   ">
              {" "}
              <div>
                <UploadBtn /*click={showUploadHadler} */ />
              </div>
            </div>
            <div>
              {storyList.length > 0 ? <Side sideProfile={storyList} /> : ""}
            </div>
          </section>
        </main>
      </div>
    </AuthContextProvider>
  );
}

export default Home;
