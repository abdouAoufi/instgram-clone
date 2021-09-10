import { auth } from "../../utils/firebase";
import { AuthContext } from "../../context/auth";
import { useContext } from "react";

export const logginChecker = () => {
  auth.onAuthStateChanged(function (user) {
    if (user) {
      setUser(user);
      setUserName(user.displayName);
      setUserLogin(true);
      setOpen(true);
    } else {
      logOutHndler();
      setUserLogin(false);
    }
  });
};
