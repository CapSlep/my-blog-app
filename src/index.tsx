import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { FirestoreContext } from "./contexts";

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

// Initialize Cloud Firestore and get a reference to the service
const firebaseDB = getFirestore(app);

console.log(firebaseDB.toJSON());

const queryClient = new QueryClient(); //create a new instance of query client

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <FirestoreContext.Provider value={firebaseDB}>
        <App />
      </FirestoreContext.Provider>
      <ReactQueryDevtools></ReactQueryDevtools>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
