import React from "react";

const Message = ({ type, text }) => {
  if (!text) return null;

  const styles = {
    success: "bg-green-100 text-green-700 border-green-400",
    error: "bg-red-100 text-red-700 border-red-400",
    warning: "bg-yellow-100 text-yellow-700 border-yellow-400",
  };

  return (
    <div
      className={`border-l-4 p-3 rounded-md my-4 ${styles[type]}`}
      role="alert"
    >
      {text}
    </div>
  );
};

export default Message;
