import * as firebase from 'firebase';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCMBOGeTn0ZNUxvnae5kVxt2oyrum6wWg4",
  authDomain: "adopt-it.firebaseapp.com",
  projectId: "adopt-it",
  storageBucket: "adopt-it.appspot.com",
  messagingSenderId: "952859484794",
  appId: "1:952859484794:web:7c546f0f38f3e260b3d1c3"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const storage = firebase.storage();

export { storage, firebase as default };