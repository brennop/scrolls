import firebase from 'firebase/app';
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

export const firestore = firebase.firestore();

interface PersistedDocument {
  data: firebase.firestore.Blob;
}

export const getDocument = async (documentPath: string): Promise<Uint8Array> => {
  return firestore
    .collection('documents')
    .doc(documentPath)
    .get()
    .then((snapshot) => {
      if (snapshot.exists) {
        const document = snapshot.data() as PersistedDocument;
        if (document.data?.toUint8Array) {
          return document.data.toUint8Array();
        }
      }
      return null;
    });
};

export const setDocument = (documentPath: string, value: Uint8Array) => {
  const data = firebase.firestore.Blob.fromUint8Array(value);
  firestore.collection('documents').doc(documentPath).set({ data });
};

export const getPublished = (documentPath: string) =>
  firestore.collection('published').doc(documentPath).get();

export const publish = async (value: string, name: string) => {
  const documentPath = hash({ value, name }).slice(12);
  await firestore.collection('published').doc(documentPath).set({ value, name });
  return documentPath;
};
