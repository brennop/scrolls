import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/firestore';
import hash from 'object-hash';

if (firebase.apps.length === 0) {
  firebase.initializeApp({
    apiKey: process.env.API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
  });
}

export const db = firebase.database();
export const firestore = firebase.firestore();

export const getPublished = (documentPath: string) =>
  firestore.collection('published').doc(documentPath).get();

export const publish = async (value: string, name: string) => {
  const documentPath = hash({ value, name }).slice(12);
  await firestore.collection('published').doc(documentPath).set({ value, name });
  return documentPath;
};
