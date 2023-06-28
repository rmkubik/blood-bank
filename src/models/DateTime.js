import { types } from "mobx-state-tree";
import { addMinutes } from "date-fns";
import { EventsModel } from "./Events";

const DateTimeModel = types
  .model("DateTime", {
    current: types.Date,
  })
  .actions((self) => ({
    getDateHoursFromCurrent(hours) {
      return addMinutes(self.current, hours * 60);
    },
    adjustHour(hours) {
      // We're using addMinutes instead of addHours because
      // date-fns functions round their values to the nearest
      // integer.
      //
      // addMinutes lets us adjust an hour by 0.5 and then add it
      // as minutes.
      const newDate = self.getDateHoursFromCurrent(hours);

      self.current = newDate;
    },
  }));

export { DateTimeModel };
