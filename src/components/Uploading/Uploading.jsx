import React, { useState } from "react";
import { db, storage } from "../../utils/firebase";
import TailInput from "../Input/TailInput";
import firebase from "firebase";
import LoadinSm from "../Loading/LoadingSm";

function TestCompo({ user, fetchData }) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState(0);
  const [loadingState, setLoadingState] = useState(false);

  const postDataToServer = (url) => {
    let tempData = {
      id: new Date().getTime(),
      descreption: caption,
      createAt: firebase.firestore.Timestamp.fromDate(new Date()),
      smallImage: "not data for now",
      firstName: user.displayName,
      fullImage: url,
      lastName: user.displayName,
      profilePic: "not data for now",
      username: user.displayName,
      totalLikes: 0,
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
          case firebase.storage.TaskState.PAUSED:
            console.log("Upload is paused");
            break;
          case firebase.storage.TaskState.RUNNING:
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
      (error) => {},
      () => {
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
    handleUpload();
  };

  const fileChangeHandler = (e) => {
    setImage(e.target.files[0]);
    setImageName(e.target.files[0].name);
  };
  return (
    <div className="w-full bg-white h-full border rounded p-4  grid items-center place-items-center min-w-59 min-h-59 ">
      {loadingState ? (
        <LoadinSm />
      ) : (
        <div className=" relative flex justify-between flex-col mx-auto h-full">
          <div className="text-base font-semibold text-gray-500 text-center mb-1    border-b py-3">
            Uploading images
          </div>
          <TailInput change={changeHandler} />
          <div className="relative w-64 mt-4 mb-4">
            <input
              className="cursor-pointer  border block opacity-1 w-full"
              type="file"
              name="vacancyImageFiles"
              onChange={fileChangeHandler}
              multiple
            />
          </div>
          <div className="text-base    font-bold text-blue-600 text-center py-3 border-t ">
            <button
              disabled={!imageName.length > 0}
              onClick={doneHandler}
              className="cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              upload
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TestCompo;
