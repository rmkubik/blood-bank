import React from "react";
import * as classes from "./Message.module.scss";

const Message = ({ message }) => {
  return (
    <div className={classes.message}>
      <h3>{message.from}</h3>
      <p>
        <strong>{message.subject}</strong>
      </p>
      <p>{message.body}</p>
    </div>
  );
};

export default Message;
