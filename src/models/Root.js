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
import actions from "./actions";
import parseActionEffects from "./actions/parseActionEffects";
import { DateTimeModel } from "./DateTime";
import parseActionEvents from "./actions/parseActionEvents";
import fillTemplate from "./messages/fillTemplate";

const RootModel = types
  .model({
    character: CharacterModel,
    skills: SkillsModel,
    inbox: InboxModel,
    jobs: JobsModel,
    companies: CompaniesModel,
    dateTime: DateTimeModel,
  })
  .actions((self) => ({
    takeAction(actionKey) {
      const action = actions[actionKey];
      const effects = parseActionEffects(action);

      // TODO:
      // I think we want to hook in here
      // and do stuff like make the job applications
      // have effect?
      // I think job buttons modify attributes on the
      // job opening like itself?
      // tweakedResume: 1
      // tweakedResume: 2
      // coverLetter: true
      // applied: true
      //
      // Then maybe on a day rollover:
      // get all applied letters?
      // no?
      // we probably want a timestamp where we make
      // a bunch of rolls to see what happens?
      //
      // or maybe just every arbitrary value
      // is broadcasted via mst and any thing
      // that cares can observe a value, like time,
      // and do whatever the hell it wants...?

      effects.forEach(([affectedItem, value]) => {
        switch (affectedItem) {
          case "hour":
            self.dateTime.adjustHour(value);
            break;
          case "energy":
            self.character.adjustEnergy(value);
            break;
          case "blood":
            self.character.adjustBlood(value);
            break;
          case "rent":
            self.character.adjustRent(value);
            break;
        }
      });

      const events = parseActionEvents(action);
      events.forEach(([eventName, ...rest]) => {
        switch (eventName) {
          case "message": {
            const [time, templateKey] = rest;

            const template = templates[templateKey];
            const { currentOpening } = self.jobs;
            const currentOpeningCompany = self.companies.list.get(
              currentOpening.company
            );

            if (time === "now") {
              self.inbox.addMessage({
                subject: template.subject,
                from: currentOpeningCompany.contacts[template.from],
                body: fillTemplate(template.body, {
                  playerName: "Randy",
                  companyNameShort:
                    currentOpeningCompany.shortName ??
                    currentOpeningCompany.name,
                }),
                date: self.dateTime.current,
              });
            }
            break;
          }
        }
      });
    },
  }));

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
        ...templates.spamGap2,
        body: fillTemplate(templates.spamGap2.body, { firstName: "Randy" }),
        date: new Date("2023-06-25T16:00:00"),
      },
      {
        ...templates.layOff,
        date: new Date("2023-06-25T15:00:00"),
      },
      {
        ...templates.spamGap,
        body: fillTemplate(templates.spamGap.body, { firstName: "Randy" }),
        date: new Date("2023-06-24T16:00:00"),
      },
    ],
  },
  jobs: {
    openings: Object.values(openings),
  },
  companies: {
    list: companies,
  },
  dateTime: {
    current: new Date("2023-06-25T16:00:00"),
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
