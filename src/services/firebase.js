import firebase from "firebase/app";
import "firebase/database";

export const app = firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  databaseURL: "https://scroll-232ac.firebaseio.com/",
});

export const db = app.database();
