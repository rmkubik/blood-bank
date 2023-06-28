import { addMinutes, isBefore, isEqual } from "date-fns";
import { types } from "mobx-state-tree";
import { v4 } from "uuid";

const EventModel = types
  .model("Event", {
    id: types.identifier,
    date: types.Date,
  })
  .actions((self) => ({
    trigger() {
      console.log(`Event ${self.id} triggered`);
    },
  }));

const MessageEventModel = types.compose(
  "MessageEvent",
  types.model({
    type: types.literal("message"),
    template: types.string,
  }),
  EventModel
);

const EventModels = types.union(MessageEventModel);

const EventsModel = types
  .model({ items: types.array(EventModels) })
  .actions((self) => ({
    create(event, currentDate) {
      // const eventDate = addMinutes(currentDate, 180); // TODO: pull this from event.time

      if (event.type === "message") {
        self.items.push(
          EventModels.create({
            id: v4(),
            type: "message",
            date: event.date,
            template: event.template,
          })
        );
      }
    },
    getEventsBefore(date) {
      return self.items.filter(
        (event) => isBefore(event.date, date) || isEqual(event.date, date)
      );
    },
    delete(id) {
      self.items = self.items.filter((item) => item.id !== id);
    },
  }));

export { EventsModel };
