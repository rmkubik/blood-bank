import React from "react";
import { observer } from "mobx-react-lite";
import * as classes from "./inbox.module.scss";
import { useRootStore } from "../../models/Root";
import MessagePreview from "./MessagePreview";
import Message from "./Message";
import { compareDesc } from "date-fns";

const Inbox = observer(() => {
  const { inbox } = useRootStore();

  return (
    <div>
      <div className={classes.inbox}>
        <h2>Inbox</h2>
        <ul>
          {/* TODO: We need to create message unique IDs in the 
          root store so we can give them keys */}
          {inbox.messages
            .slice()
            .sort((a, b) => compareDesc(a.date, b.date))
            .map((message, index) => (
              <MessagePreview
                isSelected={inbox.selectedIndex === index}
                message={message}
                onClick={() => inbox.select(index)}
              />
            ))}
        </ul>
      </div>
      <Message message={inbox.messages[inbox.selectedIndex]} />
    </div>
  );
});

export default Inbox;
