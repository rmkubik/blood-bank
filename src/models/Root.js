import { types } from "mobx-state-tree";
import { createContext, useContext } from "react";
import { SkillsModel } from "./Skills";
import { CharacterModel } from "./Character";
import { InboxModel } from "./Inbox";
import { JobsModel } from "./Jobs";

const RootModel = types.model({
  character: CharacterModel,
  skills: SkillsModel,
  inbox: InboxModel,
  jobs: JobsModel,
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
  jobs: {
    openings: [
      {
        title: "Looking for Skeleton-Obsessed Necromancer",
        // TODO: Companies should have a model and this should
        // reference them instead of being just a string
        company: "Bone Tech",
        body: `
        Bone Tech, a leading player in the carcass consumption industry is seeking a new First-Level Necromancer to join its dynamic team.

        This key magic user will be responsible for driving the company's necromantic energy strategy, optimizing bone growth, and expanding the company's carcass consumer base.

        If you are a strategic thinker with a passion for driving exceptional results in a fast-moving environment, we want to hear from you!
        `,
      },
      {
        title: "Need a First-Level Thrall",
        company: "Vampyre Industrial",
        body: "",
      },
      {
        title: "Wanted: Reanimation legal specialist",
        company: "Mortimer, Gargamel & Associates",
        body: "",
      },
      {
        title: "Jr. Thrall opening",
        company: "Bone Tech",
        body: "",
      },
      {
        title: "Mid level Back-house Thrall position",
        company: "Corpse Management Inc.",
        body: "",
      },
      {
        title: "Blood pump operation specialist needed",
        company: "Blood Incubators of America",
        body: "",
      },
      {
        title: "Min wage, blood bagger needed ASAP",
        company: "le Fay Mart",
        body: "",
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
