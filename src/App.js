import React, { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/compat/auth";
import { useAuthState } from "./hooks";
import Channel from "./components/Channel";
import { ThemeSelector } from "./components/ThemeSelector";
import CommunityGuidelines from "./components/CommunityGuidelines";

firebase.initializeApp({
  apiKey: "AIzaSyDsMNXnHieoICvCV5F07jbaDbNU2A_IY5Q",
  authDomain: "girl-hack.firebaseapp.com",
  projectId: "girl-hack",
  storageBucket: "girl-hack.appspot.com",
  messagingSenderId: "126725322432",
  appId: "1:126725322432:web:18baf36e2ec4b231e29f25",
});

export const storage = firebase.storage();
export const auth = firebase.auth();

function App() {
  let [isOpen, setIsOpen] = useState(false);
  const { user, initializing } = useAuthState(firebase.auth());

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().useDeviceLanguage();
    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      console.log(error.message);
    }
  };

  const signInAnonymously = async () => {
    const provider1 = new firebase.auth().signInAnonymously();
    firebase.auth().useDeviceLanguage();
    try {
      await firebase.auth().signInWithPopup(provider1);
    } catch (error) {
      console.log(error.message);
    }
  };

  const signOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.log(error.message);
    }
  };

  const renderContent = () => {
    if (initializing) {
      return (
        <div className="flex items-center justify-center h-screen">
          <svg
            role="status"
            className="h-9 w-9 animate-spin mr-2 text-gray-200 dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      );
    }

    if (user) return <Channel user={user} />;

    return (
      <div className="flex items-center justify-center shadow-md h-screen">
        <div className="flex flex-col items-center justify-center max-w-xl w-full mx-4 p-8 rounded-md shadow-card bg-transparent transition-all">
          <h1 className="text-4xl font-light mb-6">iCan✊🏾</h1>
          <p className="mb-6 text-lg text-center font-light">
            Unity, Stregth, and Power
          </p>
          <h4 className="mb-6 text-sm font-italic flex items-center border-l-4 border-l-slate-400 pl-2 bg-slate-100 dark:bg-slate-800 py-2 rounded-r-md">
            “Women belong in all places where decisions are being made. It
            shouldn't be that women are the exception.” ― Ruth Bader Ginsburg
          </h4>
          <button
            onClick={signInWithGoogle}
            className="rounded shadow-button mb-1 pl-6 pr-8 py-3 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 dark:hover:bg-slate-700 text-gray-600 font-medium flex items-center gap-1 justify-center overflow-y-hidden focus:outline-none focus:ring focus:ring-red-500 focus:ring-opacity-75"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="20"
              height="20"
              viewBox="0 0 48 48"
              style={{ fill: "#000000" }}
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              ></path>
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              ></path>
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
            </svg>
            Sign in with Google
          </button>
          <button
            onClick={signInAnonymously}
            className="rounded shadow-button mt-1 pl-6 pr-8 py-3  bg-slate-50 text-gray-600 hover:bg-slate-100 dark:bg-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 dark:hover:bg-slate-700 font-medium flex items-center gap-1 justify-center overflow-y-hidden focus:outline-none focus:ring focus:ring-red-500 focus:ring-opacity-75"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-0.6 -0.6 241.2 241.2"
              width="20"
              height="20"
              className="fill-slate-600 dark:fill-slate-50"
            >
              <g opacity=".8">
                <path d="M121 0C53.9-.6-.6 53.9 0 121c.6 65.2 53.8 118.4 119 119 67.1.6 121.6-53.9 121-121C239.4 53.8 186.2.6 121 0zM90.5 59c.3-.9 1-1.5 2.2-1.2 2.2.5 19.9 4.3 19.9 4.3s36.8-5.6 38.1-5.9c1.1-.2 1.9.4 2.1 1.4.1.4 6.3 21.3 11.7 39.5H78.3C83.9 79.6 90.1 60 90.5 59zm85.9 103.3c-.8 12.2-10.7 22.1-22.9 22.9-14.3.9-26.1-10.4-26.1-24.5 0-.7 0-1.4.1-2.1-2-.7-4.2-1-6.4-1-2.3 0-4.5.4-6.7 1.1.1.7.1 1.3.1 2 0 14.1-11.8 25.4-26.1 24.5-12.2-.8-22.1-10.7-22.9-22.9-.8-14.2 10.5-26.1 24.5-26.1 10.2 0 19 6.3 22.7 15.2 2.7-.8 5.5-1.3 8.4-1.3 2.8 0 5.5.4 8.1 1.2 3.7-8.9 12.4-15.1 22.7-15.1 14.1 0 25.4 11.9 24.5 26.1zm23.4-34.3H42.4c-.2 0-.3-.3-.1-.4 5.2-2.7 35.4-17.6 79-17.6 43.7 0 73.5 14.8 78.6 17.6.2.1.1.4-.1.4z" />
                <circle cx="151.9" cy="160.8" r="17.4" />
                <circle cx="90.1" cy="160.8" r="17.4" />
              </g>
            </svg>
            Sign in Anonymously
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="flex flex-col h-full bg-white dark:bg-slate-900 dark:text-white">
        <header
          className="flex-shrink-0 sticky top-0 z-20 py-2 bg-slate-50 dark:bg-slate-800 flex items-center justify-between px-4 sm:px-8 shadow-md"
          style={{ height: "var(--topbar-height)" }}
        >
          <a href="/">Ican chat</a>
          <div className="flex items-center gap-2">
            <ThemeSelector className="relative z-10" />

            {user ? (
              <button
                onClick={signOut}
                className="uppercase text-xs font-medium text-red-500 hover:text-white tracking-wide hover:bg-red-500 bg-transparent rounded py-2 px-4 mr-4 focus:outline-none focus:ring focus:ring-red-500 focus:ring-opacity-75 transition-all"
              >
                Logout
              </button>
            ) : (
              <div className="w-10"></div>
            )}
          </div>
        </header>
        <div className="sticky top-10 text-slate-800 bg-pink-50 dark:bg-slate-800 dark:text-white font-light lg:font-normal text-xs text-center border-b dark:border-slate-600 border-gray-200 pt-3 pb-2 mb-4">
          This is an open space, talk freely and follow our{" "}
          <span
            onClick={() => setIsOpen(true)}
            className="text-xs text-sky-500 rounded-md cursor-pointer"
          >
            community guidelines!
          </span>
        </div>
        <main
          className="flex-1"
          style={{ maxHeight: "calc(100% - var(--topbar-height))" }}
        >
          {renderContent()}
        </main>

        <p className="sticky bottom-0 text-xs text-center pt-3 font-light  bg-slate-50 dark:bg-slate-800">
          © 2022 iCan.
        </p>
      </div>

      {isOpen && <CommunityGuidelines isOpen={isOpen} setIsOpen={setIsOpen} />}
    </>
  );
}

export default App;
