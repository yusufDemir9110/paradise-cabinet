import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCT_drBWCd3FA4AWnRx5V8X8s43MY8lvkk",
  authDomain: "paradisecabinet-779ca.firebaseapp.com",
  projectId: "paradisecabinet-779ca",
  storageBucket: "paradisecabinet-779ca.appspot.com",
  messagingSenderId: "567937109639",
  appId: "1:567937109639:web:e1784303b370fb4d407222",
  measurementId: "G-N6LTS42N0T",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

const storage = getStorage(app);

export default db;
export { auth, provider, storage };
