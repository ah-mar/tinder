import * as React from "react";
import * as WebBrowser from "expo-web-browser";
import { ResponseType } from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
  signOut,
} from "firebase/auth";
import { getConfig } from "./getConfig";

// Initialize Firebase
const app = initializeApp(getConfig());

const db = getFirestore(app);
const auth = getAuth(app);

function doSignOut() {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log("Signout successfull");
    })
    .catch((error) => {
      // An error happened.
      console.log("an error happened");
    });
}

function doSignIn() {}

export { app, db, auth, doSignOut };
