import { types } from "mobx-state-tree";

const MessageModel = types.model({
  subject: types.string,
  from: types.string,
  body: types.string, // this is probably supposed to be an html document? maybe a ref to a react doc?
});

const InboxModel = types.model({
  messages: types.array(MessageModel),
  selectedIndex: types.optional(types.number, 0),
});

export { InboxModel };
