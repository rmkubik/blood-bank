import { types } from "mobx-state-tree";

const CharacterSkillModel = types.model({
  key: types.string,
  level: types.optional(types.number, 1),
});

const CharacterModel = types
  .model({
    rent: types.model({
      monthlyPayment: types.number,
    }),
    energy: types.model({
      current: types.number,
      max: types.number,
    }),
    blood: types.model({
      current: types.optional(types.number, 1400),
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
  })
  .views((self) => ({
    canPayEnergy(amount) {
      if (Math.sign(amount) !== -1) {
        // Any increase can always be paid
        return true;
      }

      return self.energy.current >= Math.abs(amount);
    },
    canPayBlood(amount) {
      if (Math.sign(amount) !== -1) {
        // Any increase can always be paid
        return true;
      }

      return self.blood.current >= Math.abs(amount);
    },
  }))
  .actions((self) => ({
    adjustRent(value) {
      self.rent += value;
    },
    adjustEnergy(value) {
      const newEnergy = self.energy.current + value;

      self.energy.current = Math.min(newEnergy, self.energy.max);
    },
    adjustBlood(value) {
      self.blood.current += value;
    },
  }));

export { CharacterModel };
