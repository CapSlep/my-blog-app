import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { initializeApp } from "firebase/app";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsouJ6YVYnjOXz3v9lU4fZn78yssVQ6m0",
  authDomain: "my-blog-app-a0721.firebaseapp.com",
  projectId: "my-blog-app-a0721",
  storageBucket: "my-blog-app-a0721.firebasestorage.app",
  messagingSenderId: "37480092373",
  appId: "1:37480092373:web:a4dbdadc6647cc58e2885c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
