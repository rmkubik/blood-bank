import { types } from "mobx-state-tree";

const SkillModel = types.model({
  name: types.string,
});

const SkillsModel = types.map(SkillModel);

export { SkillsModel };
