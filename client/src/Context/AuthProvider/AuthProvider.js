import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth"
import app from '../../firebase/Firebase.config';



export const AuthContext = createContext();



const AuthProvider = ({ children }) => {
   const auth = getAuth(app);
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);
   const googleProvider = new GoogleAuthProvider();

   // Current User 
   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
         setUser(currentUser);
         setLoading(false);
      })
      return () => unsubscribe();
   }, [auth])


   // Create Account 
   const createAccountByEmail = (email, password) => {
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password);
   }

   //update User
   const updateUserProfile = (update) => {
      setLoading(true);
      return updateProfile(auth.currentUser, update);
   }


   // SignIn with popup 
   const popupSignIn = (provider) => {
      setLoading(true);
      return signInWithPopup(auth, provider);
   }


   // login 
   const userLogin = (email, password) => {
      setLoading(true);
      return signInWithEmailAndPassword(auth, email, password);
   }


   // Forgot password
   const resetPassword = (email) => {
      setLoading(true);
      return sendPasswordResetEmail(auth, email);
   }



   // logout 
   const userLogout = () => {
      setLoading(true);
      return signOut(auth);
   }

   const authInfo = { user, loading, setLoading, createAccountByEmail, userLogin, userLogout, updateUserProfile, popupSignIn, googleProvider, resetPassword }
   return (
      <AuthContext.Provider value={authInfo}>
         {children}
      </AuthContext.Provider>
   );
};

export default AuthProvider;