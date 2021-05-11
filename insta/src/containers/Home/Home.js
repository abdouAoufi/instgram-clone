import React, { useState, useEffect, useContext } from "react";
import { createApi } from "unsplash-js";
import Navbar from "../../components/Navbar/Navbar";
import StoryHolder from "../../components/StorieHolder/StoryHolder";
import * as assets from "../../assets";
import "./Home.css";
import Post from "../../components/Post/Post";
import ProfileHolder from "../../components/ProfileHolder/ProfileHolder";
import Seggestion from "../../components/Seggestion/Seggestion";
import Footer from "../Auth/Login/Footer";
import NotificationContext from "../../notification-context";
import Alert from "../../components/Alerts/Alert";

const api = createApi({
  accessKey: "XIMULt5ue5Ps6Tm7TkKY1YGan2Bj_4K4ybUCE4f3mOE",
});

// CREATE ARRAY LIST HOLDS OBJECTS {description , created_at , urls}
const Home = () => {
  const [data, setPhotosResponse] = useState(null);
  const [notifTxt, setNotifTxt] = useState("Error something went wrong !");
  const notification = useContext(NotificationContext);
  const randomIndex = Math.floor(Math.random() * assets.categories.length);
  const randomCategory = assets.categories[randomIndex];
  useEffect(() => {
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
        setPhotosResponse(finalData);
      })
      .catch(() => {});
  }, []);

  const displayNotification = (text) => {
    setNotifTxt(text);
    notification.displayNotification();
  };

  return (
    <div className="relative">
      {notification.status ? <Alert text={notifTxt} /> : null}

      <Navbar showNotification={displayNotification} />
      {/* stories */}
      <section className="block lg:flex lg:justify-between lg:px-32">
        {/* // ! FIRST BIG PARRENT  */}
        <div className="w-full lg:w-150 mt-20">
          {/* stories */}
          <div onClick={displayNotification.bind(this , "Stories not aviable now !")} className=" w-full flex  py-4 px-2 flex-nowrap mt-1 mb-1 border  border rounded bg-white story-container ">
            {data?.map((persone) => (
              <StoryHolder
                key={persone.id}
                name={persone.firstName}
                image={persone.profilePic}
              /> 
            ))}
          </div>
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
          <div className="relative">
            {/* side bar information */}
            {/* Profile insperctor */}
            <div className="fixed">
              <ProfileHolder
                name="Aoufi abderahmanee"
                userName="Abd__ou"
                image={assets.profilePic}
              />
              <Seggestion data={data} />
            </div>

            {/* suggestion */}
          </div>
        </div>
      </section>
      {/* maincontainer */}
    </div>
  );
};

export default Home;
