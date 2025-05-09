import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { createContext ,useContext} from "react";

const firebaseContext=createContext(null)

const firebaseConfig = {
  apiKey:  process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId:  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: "campustrade-dd09a.firebasestorage.app",
  messagingSenderId: "428356662749",
  appId:  process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

export const UseFirebase=()=> useContext(firebaseContext)

export const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
const user=auth.currentUser

export const FirebaseProvider = (props)=>{
  const signupUserWithEmailAndPassword =(email,password) =>{
    return createUserWithEmailAndPassword(auth,email,password)
  }

  const signinUserWithEmailAndPassword=(SigninEmail,SigninPassword) =>{
    return signInWithEmailAndPassword(auth,SigninEmail,SigninPassword)
  }
  return <firebaseContext.Provider value={{signupUserWithEmailAndPassword,signinUserWithEmailAndPassword}}>{props.children}</firebaseContext.Provider>
}
