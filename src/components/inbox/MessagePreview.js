import React from "react";
import * as classes from "./MessagePreview.module.scss";

const MessagePreview = ({ message, isSelected, onClick }) => {
  return (
    <li
      className={
        classes.messagePreview + " " + (isSelected ? classes.selected : "")
      }
      onClick={onClick}
    >
      <h3>{message.from}</h3>
      <p>
        <strong>{message.subject}</strong>
      </p>
      <p>
        <em>{message.body.slice(0, 60)}...</em>
      </p>
    </li>
  );
};

export default MessagePreview;
