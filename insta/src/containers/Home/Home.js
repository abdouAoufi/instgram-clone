import React, { useState, useEffect, useContext } from "react";
import { createApi } from "unsplash-js";
import Navbar from "../../components/Navbar/Navbar";
import StoryHolder from "../../components/StorieHolder/StoryHolder";
import * as assets from "../../assets";
import "./Home.css";
import Post from "../../components/Post/Post";
import ProfileHolder from "../../components/ProfileHolder/ProfileHolder";
import Seggestion from "../../components/Seggestion/Seggestion";
import NotificationContext from "../../notification-context";
import Alert from "../../components/Alerts/Alert";
import CostumModal from "../../components/Modal/Modal";
import Loading from "../../components/Loading/Loading";
import Option from "../../components/Option/Option";
import { auth } from "../../firebase";

const api = createApi({
  accessKey: "XIMULt5ue5Ps6Tm7TkKY1YGan2Bj_4K4ybUCE4f3mOE",
});
// CREATE ARRAY LIST HOLDS OBJECTS {description , created_at , urls}
const Home = (props) => {
  const [refrechHome, setRefrechHome] = useState(true);
  const [userName, setUserName] = useState("");
  const [userLogin, setUserLogin] = useState(false);
  const [titleModalText, seTitleModalText] = useState("welcome");
  const [insideModalText, setInsideleModalText] = useState(assets.textWelcome);
  const [btnModalText, setBtnModalText] = useState("Okey thanks");
  const [open, setOpen] = useState(false);
  const [openOption, setOpenOption] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [data, setPhotosResponse] = useState(null);
  const [notifTxt, setNotifTxt] = useState("Welcome ...! ");
  const notification = useContext(NotificationContext);
  const randomIndex = Math.floor(Math.random() * assets.categories.length);
  const randomCategory = assets.categories[randomIndex];

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        console.log(user);
        setUserName(user.displayName);
        setUserLogin(true);
        setOpen(true);
      } else {
        console.log("USER IS LOGGED OUT");
        logOutHndler();
        setUserLogin(false);
      }
    });
  }, []);

  useEffect(() => {
    if (userLogin) {
      api.search
        .getPhotos({ query: randomCategory, orientation: "landscape" })
        .then((result) => {
          const dataRetrived = result.response.results;
          let finalData = [];
          dataRetrived.forEach((singleImage) => {
            let tempData = {
              id: singleImage.id,
              descreption: singleImage.alt_description,
              createAt: singleImage.created_at,
              fullImage: singleImage.urls.regular,
              smallImage: singleImage.urls.small,
              userName: singleImage.user.instagram_username,
              firstName: singleImage.user.first_name,
              lastName: singleImage.user.last_name,
              profilePic: singleImage.user.profile_image.large,
              totalLikes: singleImage.user.total_likes,
              comments: {},
            };
            finalData.push(tempData);
          });
          setLoadingData(false);
          setPhotosResponse(finalData);
        })
        .catch(() => {});
    }
  }, [userLogin, refrechHome]);

  const refrechHomeHandler = () => {
    setRefrechHome(!refrechHome);
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

  return (
    <div>
      {openOption ? (
        <div
          className="fixed z-50 top-0   right-0  w-full h-full lg:px-32 "
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
      <CostumModal
        open={open}
        setOpen={() => setOpen(!open)}
        textInside={insideModalText}
        title={titleModalText}
        btnText={btnModalText}
      />
      {notification.status ? <Alert text={notifTxt} /> : null}
      <Navbar
        refresh={refrechHomeHandler}
        showOptioin={clickOpenOption}
        showNotification={displayNotification}
      />

      {/* stories */}
      <main>
        <section
          onClick={(e) => e.stopPropagation()}
          className="block lg:flex lg:justify-between lg:px-32"
        >
          {/* // ! FIRST BIG PARRENT  */}
          <div className="w-full lg:w-150 mt-20">
            {/* stories */}
            {loadingData ? (
              <Loading />
            ) : (
              <div
                onClick={displayNotification.bind(
                  this,
                  "Stories not aviable now !"
                )}
                className=" w-full flex  py-4 px-2 flex-nowrap mt-1 mb-1 border  border rounded bg-white story-container "
              >
                {data?.map((persone) => (
                  <StoryHolder
                    key={persone.id}
                    name={persone.firstName}
                    image={persone.profilePic}
                  />
                ))}
              </div>
            )}

            {/* feeds */}
            {data?.map((persone) => {
              // console.log(persone.description);
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
          {/* // ! SECOND BIG PARENT */}

          <div className=" hidden w-80 mx-8  pt-8  px-2  lg:block mt-16  ">
            {userLogin ? (
              <div className="relative">
                {/* side bar information */}
                {/* Profile insperctor */}
                <div className="fixed">
                  <ProfileHolder
                    logOut={logOutHndler}
                    name={userName}
                    userName={userName}
                    image={assets.profilePic}
                  />
                  <Seggestion data={data} />
                </div>

                {/* suggestion */}
              </div>
            ) : null}
          </div>
        </section>
      </main>
      {/* maincontainer */}
    </div>
  );
};

export default Home;
