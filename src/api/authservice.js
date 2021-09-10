import { auth } from "../utils/firebase";

const AuthOperation = () => {
  const signUp = (email, password, displayName) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const updateProfile = (user, userName) => {
    return user.updateProfile({ displayName: userName });
  };

  const login = (email, passwod) => {
    return auth.signInWithEmailAndPassword(email, passwod);
  };

  return { signUp, updateProfile, login };
};


export default AuthOperation ;