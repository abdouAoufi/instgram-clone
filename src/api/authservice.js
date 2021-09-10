import { auth } from "../utils/firebase";

export const register = (cridentials) => {
  const signUp = (email, password, displayName) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        let user = userCredential.user;
        updateProfile(user, displayName);
      })
      .catch((error) => {
        let errorMessage = error.message;
        displayNotification(errorMessage);
      });
  };

  const updateProfile = (user, userName) => {
    user
      .updateProfile({ displayName: userName })
      .then((response) => {})
      .catch((error) => {
        alert("failed");
      });
  };
};
