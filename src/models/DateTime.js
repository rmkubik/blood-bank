import { types } from "mobx-state-tree";
import { addMinutes } from "date-fns";

const DateTimeModel = types
  .model({
    current: types.Date,
  })
  .actions((self) => ({
    adjustHour(value) {
      // We're using addMinutes instead of addHours because
      // date-fns functions round their values to the nearest
      // integer.
      //
      // addMinutes lets us adjust an hour by 0.5 and then add it
      // as minutes.
      self.current = addMinutes(self.current, value * 60);
    },
  }));

export { DateTimeModel };
