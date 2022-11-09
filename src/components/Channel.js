import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import firebase from "firebase/compat/app";
import Message from "./Message";
import {
  CameraIcon,
  FaceSmileIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { useUploadFile } from "react-firebase-hooks/storage";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { auth, storage } from "../App";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const Channel = ({ user = null }) => {
  const db = firebase.firestore();
  const messagesRef = db.collection("messages");
  const [messages] = useCollectionData(
    messagesRef.orderBy("createdAt", "desc").limit(100),
    { idField: "id" }
  );

  const [newMessage, setNewMessage] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);

  const inputRef = useRef();
  const imgRef = useRef();
  const bottomListRef = useRef();

  const { uid, displayName, photoURL } = user;

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  useEffect(() => {
    bottomListRef.current.scrollIntoView();
  }, [messages]);

  const [uploadFile] = useUploadFile();
  const [selectedFile, setSelectedFile] = useState(null);
  const ref = storage.ref(`${auth.currentUser.uid}/${Date.now()}`);

  const handleOnChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const trimmedMessage = newMessage.trim();
    let downloadURL = null;
    if (selectedFile) {
      await uploadFile(ref, selectedFile);
      downloadURL = await ref.getDownloadURL();
      setSelectedFile(null);
      setNewMessage("");
    }

    if (trimmedMessage) {
      messagesRef
        .add({
          text: trimmedMessage,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          uid,
          displayName,
          photoURL,
          attachedImage: downloadURL,
        })
        .then(() => {
          setNewMessage("");
        });
    }
  };

  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setNewMessage(newMessage + emoji);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="overflow-auto scrollbar-hide h-full">
        <div className="max-w-screen-lg mx-auto mb-6">
          <ul>
            {console.log(messages)}
            {messages &&
              messages
                ?.sort((first, second) =>
                  first?.createdAt?.seconds <= second?.createdAt?.seconds
                    ? -1
                    : 1
                )
                ?.map((message) => (
                  <li key={message.id}>
                    <Message {...message} />
                  </li>
                ))}
          </ul>
          <div ref={bottomListRef} />
        </div>
      </div>
      <div className="sticky bottom-6">
        <div className="flex items-start space-x-4  bg-slate-50 dark:bg-slate-800 max-w-screen-lg mx-auto rounded-md px-4 py-3 ">
          <div className="flex-shrink-0">
            <img
              src={
                photoURL === null || photoURL === null
                  ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKTEOTGyB45XruYcwTSoDzUFb7XFOJtYVMQC8m_QOU&s"
                  : photoURL
              }
              alt="Profile avatar"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKTEOTGyB45XruYcwTSoDzUFb7XFOJtYVMQC8m_QOU&s";
              }}
              className="rounded-full w-11 h-11 ml-4 mr-4"
            />
          </div>
          <div className="min-w-0 flex-1">
            {selectedFile !== null && (
              <div className="mb-3 flex py-1 px-1 space-x-3 border border-gray-500 rounded-md">
                <img
                  className="h-20 w-20 object-cover rounded-sm cursor-pointer"
                  src={URL.createObjectURL(selectedFile)}
                  alt=""
                />
                <div className="w-full rounded-lg flex items-center justify-between overflow-hidden">
                  <div className="flex-1 min-w-0">
                    <span className="absolute inset-0" aria-hidden="true" />
                    <div className="flex text-xs gap-3">
                      <p>{selectedFile.name}</p>
                    </div>
                    <p className="text-xs truncate">
                      {(selectedFile.size / 1024).toFixed(1)} Kb
                    </p>
                  </div>
                  <div className="flex items-center justify-center">
                    <span
                      className="mr-2 hover:text-gray-500 cursor-pointer"
                      onClick={() => setSelectedFile(null)}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </div>
            )}
            {showEmojis && (
              <div className="py-3">
                <Picker data={data} onEmojiSelect={addEmoji} />
              </div>
            )}
            <form onSubmit={handleOnSubmit} className="relative">
              <div className="rounded-lg border border-gray-500 shadow-sm focus-within:border-pink-500">
                <textarea
                  rows={3}
                  className="block bg-transparent w-full border-0 py-3 focus:ring-0 sm:text-sm"
                  placeholder="Type your message here..."
                  ref={inputRef}
                  value={newMessage}
                  onChange={handleOnChange}
                />
                <div className="py-2" aria-hidden="true">
                  <div className="py-px">
                    <div className="h-9" />
                  </div>
                </div>
              </div>

              <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
                <div className="flex items-center space-x-5">
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      id="imgUpload"
                      ref={imgRef}
                      hidden
                      onInput={(e) => {
                        console.log("inside event");
                        const file = e.target.files
                          ? e.target.files[0]
                          : undefined;
                        setSelectedFile(file);
                        e.target.value = null;
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => imgRef.current.click()}
                      className="-m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500"
                    >
                      <CameraIcon className="h-5 w-5" aria-hidden="true" />
                      <span className="sr-only">Attach a file</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowEmojis(!showEmojis)}
                      className="-m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500"
                    >
                      <span>
                        <FaceSmileIcon
                          className={classNames(
                            showEmojis && "text-pink-500",
                            "h-5 w-5 flex-shrink-0"
                          )}
                          aria-hidden="true"
                        />
                        <span className="sr-only"> Add your mood </span>
                      </span>
                    </button>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <button
                    type="submit"
                    disabled={!newMessage}
                    className={classNames(
                      !newMessage && "cursor-not-allowed opacity-75",
                      "inline-flex disabled: items-center rounded-md border border-transparent bg-pink-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                    )}
                  >
                    Send
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

Channel.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string,
    displayName: PropTypes.string,
    photoURL: PropTypes.string,
  }),
};

export default Channel;
