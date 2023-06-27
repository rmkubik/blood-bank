import React from "react";
import * as classes from "./Message.module.scss";
import ButtonSet from "../actions/ButtonSet";
import MessageHeader from "./MessageHeader";
import ActionButton from "../actions/ActionButton";

const Message = ({ message }) => {
  return (
    <div className={classes.message}>
      <MessageHeader message={message} />
      <p>
        <strong>{message.subject}</strong>
      </p>
      <p>{message.body}</p>
      <ButtonSet>
        {message.actions?.map((action) => (
          <ActionButton action={action} />
        ))}
        <button>Delete</button>
      </ButtonSet>
    </div>
  );
};

export default Message;
