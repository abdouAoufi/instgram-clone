import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { storage, db } from "./firebase";
import firebase from "firebase";

function ImageUpload({ userName }) {
  const [caption, setCaption] = useState([]);
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState("");

  const handleChange = (event) => {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  console.log(progress)
  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
        alert(error.message);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
               timeStamp : firebase.firestore.FieldValue.serverTimestamp(),
              //   timeStamp: firebase.fireStore.FieldValue.serverTimestamp(),
              caption: caption,
              ImageUrl: url,
              userName: userName,
            });
          });
        setProgress(0);
        setCaption("");
        setImage(null);
      }
    );
  };

  return (
    <div className="w-72 border border-gray-300 rounded-lg  p-4 bg-white">
      <h1 className="text-lg mb-2 font-bold text-left">image upload</h1>
      <progress className="block mb-2" value={progress} max="100" />
      <input
        className="block px-4 py-2 border border-gray-300 rounded pl-2 mb-4"
        type="text"
        placeholder="Enter a caption "
        value={caption}
        onChange={(event) => setCaption(event.target.value)}
      />
      <input
        className="block mb-2"
        type="file"
        onChange={handleChange}
        placeholder="choose fole "
      />
      <Button className="block mb-2 " onClick={handleUpload}>
        upload
      </Button>
    </div>
  );
}

export default ImageUpload;
