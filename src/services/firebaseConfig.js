import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBCpMvpNYhuQAbHfkLbg09rQkTkfICDEEU',
  authDomain: 'henning-crud.firebaseapp.com',
  projectId: 'henning-crud',
  storageBucket: 'henning-crud.appspot.com',
  messagingSenderId: '1054552837217',
  appId: '1:1054552837217:web:25c36380c3a9bc77ffae20',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
