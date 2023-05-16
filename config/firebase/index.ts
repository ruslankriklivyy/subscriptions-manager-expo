import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore } from '@firebase/firestore';
import { getStorage } from '@firebase/storage';
import firebase from 'firebase/app';
import 'firebase/database';
import Constants from 'expo-constants';

const firebaseConfig = {
  apiKey: Constants?.expoConfig?.extra?.FIREBASE_API_KEY,
  authDomain: Constants?.expoConfig?.extra?.FIREBASE_AUTH_DOMAIN,
  projectId: Constants?.expoConfig?.extra?.FIREBASE_PROJECT_ID,
  storageBucket: Constants?.expoConfig?.extra?.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: Constants?.expoConfig?.extra?.FIREBASE_MESSAGING_SENDER_ID,
  appId: Constants?.expoConfig?.extra?.FIREBASE_APP_ID,
};

export const firebaseApp = initializeApp(firebaseConfig);

export const storage = getStorage(firebaseApp);
export const db = initializeFirestore(firebaseApp, { experimentalAutoDetectLongPolling: true });
export const auth = getAuth(firebaseApp);

export default firebase;
