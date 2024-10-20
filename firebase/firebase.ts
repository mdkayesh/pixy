import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  initializeAuth,
  getReactNativePersistence,
  Auth,
} from "firebase/auth";
import {
  Firestore,
  getFirestore,
  doc,
  DocumentReference,
  DocumentData,
  collection,
  CollectionReference,
} from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_API_URL,
  authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_MESUREMENT_ID,
};

// Initialize Firebase
// export const auth = getAuth(app);
let auth: Auth, app: FirebaseApp, db: Firestore;

if (Platform.OS !== "web") {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage),
    });
  } else {
    app = getApp();
    auth = getAuth(app);
  }
  db = getFirestore(app);
}

export { auth, db };
