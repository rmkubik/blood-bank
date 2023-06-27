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
                key={message.id}
                isSelected={inbox.isSelected(message)}
                message={message}
                onClick={() =>
                  inbox.isSelected(message)
                    ? inbox.select(undefined)
                    : inbox.select(message.id)
                }
              />
            ))}
        </ul>
      </div>
      {inbox.selectedMessage && <Message message={inbox.selectedMessage} />}
    </div>
  );
});

export default Inbox;
