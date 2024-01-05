import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDt0qh2VOfk1l838ufFTzyJxp8dmlYFc6U",
  authDomain: "blog-next-1d46f.firebaseapp.com",
  projectId: "blog-next-1d46f",
  storageBucket: "blog-next-1d46f.appspot.com",
  messagingSenderId: "803293990438",
  appId: "1:803293990438:web:cebd8ff09fe8849c7420e7",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;