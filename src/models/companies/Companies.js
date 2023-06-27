import { types } from "mobx-state-tree";

const CompanyModel = types.model({
  name: types.string,
  shortName: types.maybe(types.string),
  culture: types.model({
    desiredSkills: types.array(
      types.model({
        key: types.string,
        minLevel: types.number,
      })
    ),
    desiredStats: types.array(
      types.model({
        key: types.string,
        // TODO: make string qualities into a number
        // for easier usage elsewhere, just turn into
        // strings for display purposes.
        minValue: types.union(types.number, types.string),
      })
    ),
  }),
  // This modifier is multiplied by the chance a company
  // will extend an offer.
  // Therefore, a lower number is a harder to get into
  // company.
  // 1 is a base level.
  selectivityModifier: types.number,
  payRangeModifier: types.number, // low, med, high
  contacts: types.model({
    automation: types.string, // no-reply etc.
  }),
});

const CompaniesModel = types.model({
  list: types.map(CompanyModel),
});

export { CompaniesModel };
