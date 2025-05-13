import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import {getDatabase,ref,set} from "firebase/database"

const firebaseContext = createContext(null);
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: "campustrade-dd09a.firebasestorage.app",
  messagingSenderId: "428356662749",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  databaseURL:"https://campustrade-dd09a-default-rtdb.firebaseio.com"
};

export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db=getDatabase(app)

export const UseFirebase = () => useContext(firebaseContext);

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe(); // cleanup listener on unmount
  }, []);

  const signupUserWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signinUserWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const addUser=(name,userId,section,year,email,photo)=>{
    return set(ref(db, 'users/' + name), {
    Id:userId,
    Name:name,
    Section:section,
    PassYear: year,
    Email: email,
    PhotoURL: photo
  });
  }
  return (
    <firebaseContext.Provider value={{ signupUserWithEmailAndPassword, signinUserWithEmailAndPassword,addUser,user }}>
      {props.children}
    </firebaseContext.Provider>
  );
};
