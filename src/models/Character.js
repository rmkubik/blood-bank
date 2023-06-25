import { types } from "mobx-state-tree";

const CharacterSkillModel = types.model({
  key: types.string,
  level: types.optional(types.number, 1),
});

const CharacterModel = types.model({
  blood: types.model({
    current: types.optional(types.number, 10),
    type: types.optional(
      types.enumeration(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
      "A+"
    ),
    quality: types.optional(
      types.enumeration([
        "⭐️",
        "SSS+++",
        "SSS++",
        "SSS+",
        "SSS",
        "SS",
        "S",
        "A++",
        "A+",
        "A",
        "B",
        "C",
        "D",
        "F",
        "F-",
        "F--",
        "F---",
        "F----",
        "Z",
        "🗑️",
        "💩",
      ]),
      "C"
    ),
  }),
  name: types.string,
  skills: types.array(CharacterSkillModel),
});

export { CharacterModel };
