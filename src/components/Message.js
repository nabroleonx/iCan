import React from "react";
import PropTypes from "prop-types";
import { formatRelative } from "date-fns";
import { auth } from "../App";

const formatDate = (date) => {
  let formattedDate = "";
  if (date) {
    formattedDate = formatRelative(date, new Date());
    formattedDate =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }
  return formattedDate;
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Message = ({
  createdAt = null,
  text = "",
  displayName = "",
  photoURL = "",
  attachedImage,
  uid,
}) => {
  if (!text) return null;

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";
  return (
    <div
      className={classNames(
        messageClass === "sent" && "flex-row-reverse ml-auto",
        "max-w-sm my-2 overflow-hidden flex items-start"
      )}
    >
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
      <div
        className={classNames(
          messageClass === "sent"
            ? "bg-blue-200 rounded-l-lg rounded-br-lg"
            : "bg-slate-300 rounded-r-lg rounded-bl-lg",
          "p-3 dark:bg-slate-800 "
        )}
      >
        <div className="flex items-center mb-1">
          {
            <p className="text-sky-600 mr-2">
              {displayName === null ? "Anonymous User" : displayName}
            </p>
          }
        </div>
        {attachedImage !== null && (
          <div className="group aspect-w-10 aspect-h-7 block w-full overflow-hidden rounded-lg bg-gray-100">
            <img
              src={attachedImage}
              alt=""
              className="pointer-events-auto w-64 h-64 object-scale-down group-hover:opacity-75"
            />
          </div>
        )}
        <p>{text}</p>
        {createdAt?.seconds ? (
          <span className="text-xs text-gray-500 leading-none">
            {" "}
            {formatDate(new Date(createdAt.seconds * 1000))}
          </span>
        ) : null}
      </div>
    </div>
  );
};

Message.propTypes = {
  text: PropTypes.string,
  createdAt: PropTypes.shape({
    seconds: PropTypes.number,
  }),
  displayName: PropTypes.string,
  photoURL: PropTypes.string,
};

export default Message;
