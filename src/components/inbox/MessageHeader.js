import { observer } from "mobx-react-lite";
import React from "react";
import { useRootStore } from "../../models/Root";
import * as classes from "./MessageHeader.module.scss";
import { format, isSameDay } from "date-fns";

const MessageHeader = observer(({ message }) => {
  const { dateTime } = useRootStore();

  return (
    <div className={classes.header}>
      <h3>{message.from}</h3>
      <span>
        {isSameDay(message.date, dateTime.current)
          ? format(message.date, "h:mm a")
          : format(message.date, "M/d/yy")}
      </span>
    </div>
  );
});

export default MessageHeader;
