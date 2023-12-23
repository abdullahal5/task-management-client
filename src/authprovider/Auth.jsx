import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyCjtYbbEehJ4WjnPTvgUG3zZ43eP1LjpwA",
  authDomain: "job-task-ec7fd.firebaseapp.com",
  projectId: "job-task-ec7fd",
  storageBucket: "job-task-ec7fd.appspot.com",
  messagingSenderId: "577323951214",
  appId: "1:577323951214:web:b8933a11251d247bc9b27f",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
