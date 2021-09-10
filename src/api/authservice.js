import { auth } from "../utils/firebase";

export const register = () => {
  const signUp = (email, password, displayName) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const updateProfile = (user, userName) => {
    return user.updateProfile({ displayName: userName });
  };

  return { signUp, updateProfile };
};
