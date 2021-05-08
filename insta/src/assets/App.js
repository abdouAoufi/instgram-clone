import "./App.css";
import Post from "./components/Post/Post";
import * as assets from "./assets";
import HomeIcon from "@material-ui/icons/Home";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Avatar from "@material-ui/core/Avatar";
import React, { useState, useEffect } from "react";
import { db, auth } from "./firebase";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import ImageUpload from "./ImageUpload";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "auto",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    overflow: "hidden",
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [openSignIn, setOpenSignIN] = React.useState("");
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const [upload, setUpload] = useState(false);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timeStamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          })) // return data is matter
        );
      });
  }, []);

  useEffect(() => {
    const unsebscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log("we have user ");

        setUser(authUser);
      } else {
        setUser(null);
      }
    });
    return () => {
      unsebscribe();
    };
  }, [user]);

  const signIn = (e) => {
    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      alert(error.message);
    });
    setOpenSignIN(false);
  };
  const signUp = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        return response.user.updateProfile({ displayName: userName });
      })
      .catch((error) => alert(error.message));
  };
  return (
    <Router>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className={classes.paper} style={modalStyle}>
          <div className="block p-2 bg-white rounded-xl flex flex-col justify-center place-items-center">
            <p className="text-lg font-bold text-gray-400 text-center mb-4 ">
              Sign up
            </p>
            <form>
              <input
                value={userName}
                className="block px-4 py-2 border border-gray-300 rounded pl-2 mb-4"
                type="text"
                placeholder="user name"
                name="user name"
                onChange={(e) => setUserName(e.target.value)}
              />
              <input
                value={email}
                className="block px-4 py-2 border border-gray-300 rounded pl-2 mb-4"
                type="text"
                placeholder="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                value={password}
                className="block px-4 py-2 border border-gray-300 rounded pl-2 mb-4"
                type="password"
                placeholder="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                onClick={signUp}
                className="block w-32 m-auto px-4 py-2 border border-gray-300 rounded text-center"
              >
                Sign up
              </button>
            </form>
          </div>
        </div>
      </Modal>

      <Modal open={openSignIn} onClose={() => setOpenSignIN(false)}>
        <div className={classes.paper} style={modalStyle}>
          <div className="block p-2 bg-white rounded-xl flex flex-col justify-center place-items-center">
            <p className="text-lg font-bold text-gray-400 text-center mb-4 ">
              Log in
            </p>
            <form>
              <input
                value={email}
                className="block px-4 py-2 border border-gray-300 rounded pl-2 mb-4"
                type="text"
                placeholder="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                value={password}
                className="block px-4 py-2 border border-gray-300 rounded pl-2 mb-4"
                type="password"
                placeholder="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                onClick={signIn}
                className="block w-32 m-auto px-4 py-2 border border-gray-300 rounded text-center"
              >
                Log in
              </button>
            </form>
          </div>
        </div>
      </Modal>
      <Modal open={upload} onClose={() => setUpload(false)}>
        <div className={classes.paper} style={modalStyle}>
          <div>
            {user?.displayName ? (
              <ImageUpload userName={user.displayName} />
            ) : (
              <h3>sorry you need to log in !! </h3>
            )}
          </div>
        </div>
      </Modal>
      <div className=" bg-gray-50  ">
        {/* {heder} */}
        <div className="px-32 flex justify-between items-center py-3 border border-gray-200 bg-white">
          <a href="/">
            <img className="object-contain w-8" src={assets.logo} alt="logo" />
          </a>
          <div>
            <input
              type="text"
              placeholder="Search"
              className="border border-gray-200 rounded pl-8 py-1 outline-none "
            />
          </div>
          <div className="flex items-center">
            {/* home message local likes profile  */}
            <HomeIcon className=" text-gray-400 mr-6" />
            <ChatBubbleOutlineIcon className=" text-gray-400 mr-6" />
            <LocationOnIcon className=" text-gray-400 mr-6" />
            <FavoriteBorderIcon className=" text-gray-400 mr-6" />
            <Avatar className="mr-4" alt="Maissa" />
            {user ? (
              <Button
                onClick={() => {
                  auth.signOut();
                }}
              >
                Log out
              </Button>
            ) : (
              <div>
                <Button
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  Sign up
                </Button>
                <Button
                  onClick={() => {
                    setOpenSignIN(true);
                  }}
                >
                  Log in
                </Button>
              </div>
            )}
            {user ? (
              <Button
                onClick={() => {
                  setUpload(true);
                }}
              >
                Upload
              </Button>
            ) : null}
          </div>
        </div>
        {posts
          ? posts.map(({ id, post }) => {
              return (
                <Post
                  key={id}
                  userName={post.userName}
                  imageUrl={post.ImageUrl}
                  caption={post.caption}
                />
              );
            })
          : null}
      </div>
 
    </Router>
  );
}

export default App;
