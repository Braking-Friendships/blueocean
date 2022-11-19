import React, { useState, useEffect, useContext } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, updateEmail, updatePassword } from 'firebase/auth';

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};


export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const signup = async (email, password, userType) => {
    let user = await createUserWithEmailAndPassword(auth, email, password);
    let currUser = user.user;
    let response = {
      email: currUser.email,
      firebaseId: currUser.uid,
      userType: userType
    }
    if (currUser) {
      setCurrentUser(response);
      return response;
    }
  };

  const login = async (email, password) => {
    let user = await signInWithEmailAndPassword(auth, email, password)
    let currUser = user.user;
    let response = {
      email: currUser.email,
      firebaseId: currUser.uid
    }
    if (currUser) {
      setCurrentUser(response);
      return response;
    }
  };

  const logout = () => {
    return signOut(auth);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const updateUserEmail = (email) => {
    return updateEmail(currentUser, email);
  };

  const updateUserPassword = (password) => {
    return updatePassword(currentUser, password);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateUserEmail,
    updateUserPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};