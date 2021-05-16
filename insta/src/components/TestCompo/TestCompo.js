import React, { useEffect, useState, useContext } from "react";
import { db, storage } from "../../firebase";
import axios from "axios";
import TailInput from "../Input/TailInput";
import TailBtn from "../Button/TailBtn";
import firebase from "firebase";
import LoadinSm from "../Loading/LoadingSm";

function TestCompo({ user, fetchData }) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState(0);
  const [loadingState, setLoadingState] = useState(false);
  const [progressUpload, setProgress] = useState(null);
  const getDataFromServer = () => {
    db.collection("posts")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
        });
      });
  };
  const postDataToServer = (url) => {
    let tempData = {
      id: new Date().getTime(),
      descreption: caption,
      createAt: firebase.firestore.Timestamp.fromDate(new Date()),
      smallImage: "not data for now", // ! we don't have it
      firstName: user.displayName, // we have it
      fullImage: url, // we got it
      lastName: user.displayName, // we have it
      profilePic: "not data for now", // ! we dont have it
      username: user.displayName, // we have it
      totalLikes: 0, // we can fake it
      comments: {},
    };
    db.collection("posts")
      .add(tempData)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        setLoadingState(false);
        fetchData();
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  const handleUpload = () => {
    setLoadingState(true);
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log("Upload is paused");
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log("Upload is running");
            break;
          case firebase.storage.TaskState.ERROR:
            console.log("Error something went wrong !!");
            break;

          case firebase.storage.TaskState.CANCELED:
            console.log("The operation has cancelled !!");
            break;
          default:
            console.log("Default behavior");
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log("File available at", downloadURL);
          postDataToServer(downloadURL);
        });
      }
    );
  };

  const changeHandler = (e) => {
    setCaption(e.target.value);
  };
  const doneHandler = () => {
    // console.log("actince");
    handleUpload();
  };

  const getHandler = () => {
    getDataFromServer();
  };
  const fileChangeHandler = (e) => {
    setImage(e.target.files[0]);
    setImageName(e.target.files[0].name);
  };
  return (
    <div className="w-full h-full border rounded p-4  grid items-center place-items-center min-w-59 min-h-59 ">
      {loadingState ? (
        <LoadinSm />
      ) : (
        <div className=" relative flex justify-between flex-col mx-auto h-full">
          <div className="text-base font-semibold text-gray-500 text-center mb-1    border-b py-3">
            Uploading images 
          </div>
          <TailInput label="Caption " change={changeHandler} />
          <div className="relative w-64 mt-4 mb-4">
            {/* <button   className="bg-blue-400  hover:bg-indigo-dark text-white font-bold py-2 px-4 w-full inline-flex items-center">
              <svg
                fill="#FFF"
                height="18"
                viewBox="0 0 24 24"
                width="18"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
              </svg>
              <span className="ml-2">Please choose a picture </span>
            </button> */}
            <input
              className="cursor-pointer  border block opacity-1 w-full"
              type="file"
              name="vacancyImageFiles"
              onChange={fileChangeHandler}
              multiple
            />
          </div>

          {/* <TailBtn
            
            
            text="post"
          /> */}

          <div    className="text-base    font-bold text-blue-600 text-center py-3 border-t ">
            <button disabled={!imageName.length > 0} onClick={doneHandler} className="cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">upload</button>
          </div>
          {/* <TailBtn click={getHandler} text="get" /> */}
        </div>
      )}
    </div>
  );
}

export default TestCompo;
