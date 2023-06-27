import { types } from "mobx-state-tree";

const MessageModel = types.model({
  subject: types.string,
  from: types.string,
  body: types.string,
  date: types.Date,
});
// TODO: body should be a template ref, not body text
// TODO: each message needs a timestamp
// TODO: each message needs an id

const InboxModel = types
  .model({
    messages: types.array(MessageModel),
    selectedIndex: types.optional(types.number, 0),
  })
  .actions((self) => ({
    select: (index) => {
      self.selectedIndex = index;
    },
    addMessage: (message) => {
      self.messages.push(MessageModel.create(message));
    },
  }));

export { InboxModel };
