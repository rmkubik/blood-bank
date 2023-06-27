import { types } from "mobx-state-tree";

const OpeningModel = types.model({
  title: types.string,
  company: types.string,
  body: types.string, // this is probably supposed to be an html document? maybe a ref to a react doc?
});

const JobsModel = types
  .model({
    openings: types.array(OpeningModel),
    selectedIndex: types.optional(types.number, 0),
  })
  .views((self) => ({
    get currentOpening() {
      return self.openings[self.selectedIndex];
    },
  }))
  .actions((self) => ({
    select: (index) => {
      self.selectedIndex = index;
    },
  }));

export { JobsModel };
