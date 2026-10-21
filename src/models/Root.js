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
import actions from "./actions/data";
import parseActionEffects from "./actions/parseActionEffects";
import { DateTimeModel } from "./DateTime";
import parseActionEvents from "./actions/parseActionEvents";
import fillTemplate from "./messages/fillTemplate";
import { v4 } from "uuid";
import { EventsModel } from "./Events";
import canActionCostsBePaid from "./actions/canActionCostsBePaid";
import pickRandomlyFromArray from "../utils/random/pickRandomlyFromArray";

const RootModel = types
  .model("Root", {
    character: CharacterModel,
    skills: SkillsModel,
    inbox: InboxModel,
    jobs: JobsModel,
    companies: CompaniesModel,
    dateTime: DateTimeModel,
    events: EventsModel,
  })
  .actions((self) => ({
    takeAction(actionKey) {
      const action = actions[actionKey];
      const effects = parseActionEffects(action);

      if (!canActionCostsBePaid(effects, self)) {
        console.log(`Cannot pay costs of action.`);
        return;
      }

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
            const [hours, templateKey] = rest;

            self.scheduleEvent({
              type: "message",
              date: self.dateTime.getDateHoursFromCurrent(parseInt(hours)),
              template: templateKey,
            });
            break;
          }
          case "applyToJob": {
            const delay = pickRandomlyFromArray([
              12, 24, 48, 48, 72, 72, 128, 128, 160, 160, 160,
            ]);
            // TODO: Pass in vars from the player to the application
            const { currentOpening } = self.jobs;
            const currentOpeningCompany = self.companies.list.get(
              currentOpening.company
            );
            const isSuccessful = currentOpeningCompany.handleApplication({});

            const templateKey = isSuccessful
              ? "scheduleInterview"
              : "thankYouForApplying";

            self.scheduleEvent({
              type: "message",
              date: self.dateTime.getDateHoursFromCurrent(delay),
              template: templateKey,
            });
            break;
          }
        }
      });

      const triggeredEvents = self.events.getEventsBefore(
        self.dateTime.current
      );

      triggeredEvents.forEach((event) => {
        const template = templates[event.template];
        const { currentOpening } = self.jobs;
        const currentOpeningCompany = self.companies.list.get(
          currentOpening.company
        );

        let from =
          currentOpeningCompany.contacts[template.from] ?? template.from;

        if (typeof from === "object") {
          from = from.email;
        }

        self.inbox.addMessage({
          subject: template.subject,
          // TODO: this does not work if the player has changed which company
          // is selected before they receive the email, we need to add this
          // information to the scheduled event.
          from,
          // TODO: Add extra context vars needed for scheduleInterviewTemplate
          body: fillTemplate(template.body, {
            playerName: "Randy",
            companyName: currentOpeningCompany.name,
            companyNameShort:
              currentOpeningCompany.shortName ?? currentOpeningCompany.name,
            roleName: currentOpening.role,
            jeanPrice: 80,
            recruiterGivenName:
              currentOpeningCompany.contacts.recruiter.givenName,
            recruiterFamilyName:
              currentOpeningCompany.contacts.recruiter.familyName,
          }),
          date: self.dateTime.current,
        });

        self.events.delete(event.id);
      });
    },
    scheduleEvent(event) {
      self.events.create(event, self.dateTime.current);
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
        id: v4(),
      },
      {
        ...templates.layOff,
        date: new Date("2023-06-25T15:00:00"),
        id: v4(),
      },
      {
        ...templates.spamGap,
        body: fillTemplate(templates.spamGap.body, { firstName: "Randy" }),
        date: new Date("2023-06-24T16:00:00"),
        id: v4(),
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
  events: {
    items: [],
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
