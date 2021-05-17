import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// firebase init - add your own config here
const firebaseConfig = {
  apiKey: "AIzaSyA9XYXCI9aEnisoLv_152AYHFJu63Q-jTE",
  authDomain: "ggstreaming-d7c7c.firebaseapp.com",
  projectId: "ggstreaming-d7c7c",
  storageBucket: "ggstreaming-d7c7c.appspot.com",
  messagingSenderId: "251639121924",
  appId: "1:251639121924:web:fbc8c88d56a9685bc98d51",
  measurementId: "G-SN8GZKWWJ6",
};
firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const auth = firebase.auth();

// collection references
const usersCollection = db.collection("users");
const platformsCollection = db.collection("platforms");
const accountsCollection = db.collection("accounts");

// storage
const storage = firebase.storage();
const storageRef = storage.ref("id");
const storagePlatformsLogos = storageRef.child("platforms/logos");

// export utils/refs
export {
  db,
  auth,
  usersCollection,
  platformsCollection,
  accountsCollection,
  storagePlatformsLogos,
};
