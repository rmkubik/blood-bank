import { types } from "mobx-state-tree";
import { v4 } from "uuid";

const MessageModel = types.model({
  id: types.identifier,
  subject: types.string,
  from: types.string,
  body: types.string,
  date: types.Date,
  actions: types.array(types.string),
});
// TODO: body should be a template ref, not body text

const InboxModel = types
  .model({
    messages: types.array(MessageModel),
    selectedId: types.maybe(types.string),
  })
  .views((self) => ({
    get selectedMessage() {
      return self.messages.find((message) => message.id === self.selectedId);
    },
    isSelected(message) {
      if (!self.selectedMessage) {
        return false;
      }

      return self.selectedMessage.id === message.id;
    },
  }))
  .actions((self) => ({
    select: (id) => {
      self.selectedId = id;
    },
    addMessage: (message) => {
      self.messages.push(MessageModel.create({ ...message, id: v4() }));
    },
  }));

export { InboxModel };
