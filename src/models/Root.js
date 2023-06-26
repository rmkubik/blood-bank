import { types } from "mobx-state-tree";
import { createContext, useContext } from "react";
import { SkillsModel } from "./Skills";
import { CharacterModel } from "./Character";
import { InboxModel } from "./messages/Inbox";
import { JobsModel } from "./jobs/Jobs";
import { CompaniesModel } from "./companies/Companies";
import companies from "./companies/data";
import openings from "./jobs/data";
import templates from "./messages/templates";

const RootModel = types.model({
  character: CharacterModel,
  skills: SkillsModel,
  inbox: InboxModel,
  jobs: JobsModel,
  companies: CompaniesModel,
});

const rootStore = RootModel.create({
  character: {
    blood: {},
    name: "Randy",
    rent: {
      monthlyPayment: 1000,
    },
    energy: {
      current: 10,
      max: 10,
    },
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
      templates.thankYouForInterest,
      templates.thankYouForInterest,
      templates.thankYouForInterest,
      templates.thankYouForInterest,
    ],
  },
  jobs: {
    openings: Object.values(openings),
  },
  companies: {
    list: companies,
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
