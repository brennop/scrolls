import firebase from "firebase/app";
import "firebase/database";

if (firebase.apps.length === 0) {
  firebase.initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    databaseURL: "https://scroll-232ac.firebaseio.com/",
  });
}

export const db = firebase.database();
