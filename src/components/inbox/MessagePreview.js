import React from "react";
import { format, isSameDay } from "date-fns";
import { observer } from "mobx-react-lite";
import * as classes from "./MessagePreview.module.scss";
import { useRootStore } from "../../models/Root";
import MessageHeader from "./MessageHeader";

const MessagePreview = observer(({ message, isSelected, onClick }) => {
  const { dateTime } = useRootStore();

  return (
    <li
      className={
        classes.messagePreview + " " + (isSelected ? classes.selected : "")
      }
      onClick={onClick}
    >
      <MessageHeader message={message} />
      <p>
        <strong>{message.subject}</strong>
      </p>
      <p>
        <em>{message.body.slice(0, 60)}...</em>
      </p>
    </li>
  );
});

export default MessagePreview;
