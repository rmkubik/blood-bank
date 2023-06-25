import { types } from "mobx-state-tree";
import { createContext, useContext } from "react";
import { SkillsModel } from "./Skills";
import { CharacterModel } from "./Character";
import { InboxModel } from "./Inbox";

const RootModel = types.model({
  character: CharacterModel,
  skills: SkillsModel,
  inbox: InboxModel,
});

const rootStore = RootModel.create({
  character: {
    blood: {},
    name: "Randy",
    skills: [
      {
        key: "hauling",
        level: 2,
      },
      {
        key: "resumeWriting",
        level: 1,
      },
      {
        key: "groveling",
        level: 3,
      },
      {
        key: "woodWorking",
        level: 2,
      },
    ],
  },
  skills: {
    hauling: {
      name: "Hauling",
    },
    resumeWriting: {
      name: "Resume Writing",
    },
    groveling: {
      name: "Groveling",
    },
    woodWorking: {
      name: "Wood Working",
    },
  },
  inbox: {
    messages: [
      {
        subject: "Thank you for your interest",
        from: "no-reply@blood4america.com",
        body: `Hi Randy,

        Thank you for your interest in B4A and the time you spent applying to the position. At this time, the position has been filled.
        
        We encourage you to continue to keep an eye on the career website for future openings and reapply.
        
        Best,
        The B4A Talent Acquisition Team`,
      },
      {
        subject: "Thank you for your interest",
        from: "no-reply@blood4america.com",
        body: `Hi Randy,

        Thank you for your interest in B4A and the time you spent applying to the position. At this time, the position has been filled.
        
        We encourage you to continue to keep an eye on the career website for future openings and reapply.
        
        Best,
        The B4A Talent Acquisition Team`,
      },
      {
        subject: "Thank you for your interest",
        from: "no-reply@blood4america.com",
        body: `Hi Randy,

        Thank you for your interest in B4A and the time you spent applying to the position. At this time, the position has been filled.
        
        We encourage you to continue to keep an eye on the career website for future openings and reapply.
        
        Best,
        The B4A Talent Acquisition Team`,
      },
    ],
  },
});

const RootStoreContext = createContext(rootStore);
const RootContextProvider = RootStoreContext.Provider;

function useRootStore() {
  const store = useContext(RootStoreContext);

  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider");
  }

  return store;
}

export { rootStore, RootContextProvider, useRootStore };
