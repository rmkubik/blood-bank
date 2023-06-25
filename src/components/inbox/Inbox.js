import React from "react";
import { observer } from "mobx-react-lite";
import * as classes from "./inbox.module.scss";
import { useRootStore } from "../../models/Root";
import MessagePreview from "./MessagePreview";
import Message from "./Message";

const Inbox = observer(() => {
  const { inbox } = useRootStore();

  return (
    <div>
      <div className={classes.inbox}>
        <h2>Inbox</h2>
        <ul>
          {/* TODO: We need to create message unique IDs in the 
          root store so we can give them keys */}
          {inbox.messages.map((message, index) => (
            <MessagePreview
              isSelected={inbox.selectedIndex === index}
              message={message}
            />
          ))}
        </ul>
      </div>
      <Message message={inbox.messages[inbox.selectedIndex]} />
    </div>
  );
});

export default Inbox;
