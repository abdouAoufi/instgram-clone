import React, { useState, useEffect, useContext } from "react";
import { createApi } from "unsplash-js";
import Navbar from "../../components/Navbar/Navbar";
import StoryHolder from "../../components/StorieHolder/StoryHolder";
import * as assets from "../../assets";
import "./Home.css";
import Post from "../../components/Post/Post";
import ProfileHolder from "../../components/ProfileHolder/ProfileHolder";
import Seggestion from "../../components/Seggestion/Seggestion";
import NotificationContext from "../../context/notification";
import Alert from "../../components/Alerts/Alert";
import CostumModal from "../../components/Modal/Modal";
import Loading from "../../components/Loading/Loading";
import Option from "../../components/Option/Option";
import { auth, db } from "../../utils/firebase";
import TestCompo from "../../components/TestCompo/TestCompo";
import ContModal from "../../components/Modal/ContModal";
import UploadBtn from "../../components/Button/TailUploadBtn";



const api = createApi({
  accessKey: "XIMULt5ue5Ps6Tm7TkKY1YGan2Bj_4K4ybUCE4f3mOE",
});
const Home = (props) => {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [userLogin, setUserLogin] = useState(false);
  const [titleModalText, seTitleModalText] = useState("welcome");
  const [insideModalText, setInsideleModalText] = useState(assets.textWelcome);
  const [btnModalText, setBtnModalText] = useState("Okey thanks");
  const [open, setOpen] = useState(false);
  const [openOption, setOpenOption] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [data, setCollectionData] = useState([]);
  const [notifTxt, setNotifTxt] = useState("Welcome ...! ");
  const [fireBaseData, setFireBaseData] = useState([]);
  const [unsplashData, setUnsplashData] = useState([]);
  const [uploadWindow, setUploadWindow] = useState(false);
  const [refreshFireBase, setRefreshFireBase] = useState(false);
  const [refreshUnsplash, setRefreshUnsplash] = useState(false);
  const notification = useContext(NotificationContext);
  const randomIndex = Math.floor(Math.random() * assets.categories.length);
  let randomCategory = assets.categories[randomIndex];

  // useEffect(() => {
  //   auth.onAuthStateChanged(function (user) {
  //     if (user) {
  //       setUser(user);
  //       setUserName(user.displayName);
  //       setUserLogin(true);
  //       setOpen(true);
  //     } else {
  //       logOutHndler();
  //       setUserLogin(false);
  //     }
  //   });
  // }, []);

  // useEffect(() => {
  //   db.collection("posts")
  //     .orderBy("createAt", "desc")
  //     .get()
  //     .then((querySnapshot) => {

  //       setLoadingData(false);
  //       let tempHolder = [];
  //       querySnapshot.forEach((doc) => {
  //         console.log(doc.data())
  //         tempHolder.push(doc.data());
  //       });
  //       setFireBaseData(tempHolder);
  //     });
  // }, [userLogin, refreshFireBase]);

  // useEffect(() => {
  //   if (userLogin) {
  //     api.search
  //       .getPhotos({ query: randomCategory, orientation: "landscape" })
  //       .then((result) => {
  //         const dataRetrived = result.response.results;
  //         let finalData = [];
  //         dataRetrived.forEach((singleImage) => {
  //           let tempData = {
  //             id: singleImage.id,
  //             descreption: singleImage.alt_description,
  //             createAt: singleImage.created_at,
  //             fullImage: singleImage.urls.regular,
  //             smallImage: singleImage.urls.small,
  //             userName: singleImage.user.instagram_username,
  //             firstName: singleImage.user.first_name,
  //             lastName: singleImage.user.last_name,
  //             profilePic: singleImage.user.profile_image.large,
  //             totalLikes: singleImage.user.total_likes,
  //             comments: {},
  //           };
  //           finalData.push(tempData);
  //         });
  //         // setLoadingData(false);
  //         setUnsplashData(finalData);
  //       })
  //       .catch(() => {});
  //   }
  // }, [userLogin, refreshUnsplash]);

  // useEffect(() => {
  //   if (unsplashData.length > 0) {
  //     setCollectionData([...fireBaseData].concat(unsplashData));
  //   }
  // }, [unsplashData, fireBaseData]);

  const refrechHomeHandler = () => {
    setRefreshUnsplash(!refreshUnsplash);
  };
  const displayNotification = (text) => {
    setNotifTxt(text);
    notification.displayNotification();
  };

  const clickOpenOption = () => {
    setOpenOption(!openOption);
  };

  const logOutHndler = () => {
    displayModal("Log out", "You have to sign in again !", "Log in");
    auth.signOut();
    setTimeout(() => {
      props.history.push("/authentification");
    }, 2000);
  };

  const displayModal = (title, text, btnText) => {
    setOpen(true);
    seTitleModalText(title);
    setInsideleModalText(text);
    setBtnModalText(btnText);
  };

  const showUploadHadler = () => {
    setUploadWindow(true);
  };

  const fetchNewData = () => {
    setRefreshFireBase(!refreshFireBase);
  };

  return (
    <div>
      {openOption ? (
        <div
          className="fixed z-50 block top-0 right-0 w-full h-full lg:px-32 "
          onClick={() => {
            if (openOption) {
              setOpenOption(false);
            }
          }}
        >
          {" "}
          {openOption ? <Option click={logOutHndler} /> : null}
        </div>
      ) : null}
      <div className="fixed z-100  bottom-4 w-auto lg:right-16 right-8   ">
        {" "}
        <div>
          <UploadBtn click={showUploadHadler} />
        </div>
      </div>
      <CostumModal
        open={open}
        setOpen={() => setOpen(!open)}
        textInside={insideModalText}
        title={titleModalText}
        btnText={btnModalText}
      />

      <ContModal
        open={uploadWindow}
        setOpen={() => setUploadWindow(!uploadWindow)}
      >
        <TestCompo user={user} fetchData={fetchNewData} />
      </ContModal>

      {notification.status ? <Alert text={notifTxt} /> : null}
      <Navbar
        refresh={refrechHomeHandler}
        showOptioin={clickOpenOption}
        showNotification={displayNotification}
      />
      <main>
        {/* <section
          onClick={(e) => e.stopPropagation()}
          className="block lg:flex lg:justify-between lg:px-32"
        >
          <div className="w-full lg:w-150 mt-20">
            {loadingData ? (
              <Loading />
            ) : (
              <div
                onClick={displayNotification.bind(
                  this,
                  "Stories not aviable now !"
                )}
                className=" w-full flex  py-4 px-2 flex-nowrap mt-1 mb-1   border rounded bg-white story-container "
              >
                {unsplashData?.map((persone) => (
                  <StoryHolder
                    key={persone.id}
                    name={persone.firstName}
                    image={persone.profilePic}
                  />
                ))}
              </div>
            )}
            {data?.map((persone) => {
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
          <div className=" hidden w-80 mx-8  pt-8  px-2  lg:block mt-16  ">
            
              <div className="relative">
                <div className="fixed">
                  <ProfileHolder
                    logOut={logOutHndler}
                    name={userName}
                    userName={userName}
                    image={assets.profilePic}
                  />
                  <Seggestion data={unsplashData} />
                </div>
              </div>
            
          </div>
        </section> */}
      </main>
    </div>
  );
};

export default Home;
