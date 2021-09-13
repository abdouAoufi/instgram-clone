import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Option from "../../components/Option/Option";
import StoryHolder from "../../components/StorieHolder/StoryHolder";
import Loading from "../../components/Loading/Loading";
import UploadBtn from "../../components/Button/TailUploadBtn";
import ImageUploading from "../../components/Uploading/Uploading";
import Post from "../../components/Post/Post";
import Side from "./Side/Side";
import { categories } from "../../assets";
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
  const [openModalAuth, setOpenModalAuth] = useState(false);
  const [dbPost, setdbPost] = useState([]);
  const [storyList, setStoryList] = useState([]);
  const [uploading, setUpeloading] = useState(false);
  const [user, setUser] = useState(null);
  const [dataWindow, setDataWindow] = useState({
    title: "Not authenticated!",
    content: "Sorry it looks like you're not connected, try to login!",
    btntext: "Okey, thanks!"
  });
  let history = useHistory();

  const logout = () => {
    auth.signOut();
  };

  useEffect(() => {
    auth.onAuthStateChanged(function(fetchedUser) {
      if (!fetchedUser) {
        setOpenModalAuth(true);
        setTimeout(() => {
          history.push("/auth");
        }, 2000);
      }
      console.log(fetchedUser.displayName);
      setUser(fetchedUser);
      setUpeloading(true);
    });
  }, []);

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    db.collection("posts")
      .orderBy("createAt", "desc")
      .limit(20)
      .get()
      .then(querySnapshot => {
        setLoadingData(false);
        let tempHolder = [];
        querySnapshot.forEach(doc => {
          tempHolder.push(doc.data());
        });
        setdbPost(tempHolder);
        getUnsplashData();
      });
  };

  const getUnsplashData = () => {
    api.search
      .getPhotos({
        query: categories[Math.floor(Math.random() * categories.length)],
        orientation: "landscape"
      })
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

  const openUploadig = () => {
    setOpenModal(!openModal);
  };

  return (
    <AuthContextProvider>
      <div>
        <Modal openModal={openModal} click={openUploadig}>
          {user ? (
            <ImageUploading
              fetchData={() => {
                setOpenModal(false);
                fetchData();
              }}
              user={user}
            />
          ) : null}
        </Modal>
        <Modal openModal={openModalAuth}>
          <Window dataWindow={dataWindow} click={openUploadig} />
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
            <div className="w-full lg:w-150  mt-20">
              {loadingData ? (
                <Loading />
              ) : (
                <div className=" w-full flex overflow-scroll  py-4 px-2 flex-nowrap mt-1 mb-1   border rounded bg-white story-container ">
                  {storyList?.map(persone => (
                    <StoryHolder
                      key={persone.firstName}
                      name={persone.firstName}
                      url={persone.profilePic}
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
                <UploadBtn click={openUploadig} />
              </div>
            </div>
            <div>
              {storyList.length > 0 ? (
                <Side
                  logOut={logout}
                  userName={user.displayName}
                  sideProfile={storyList}
                />
              ) : (
                ""
              )}
            </div>
          </section>
        </main>
      </div>
      )
    </AuthContextProvider>
  );
}

export default Home;
