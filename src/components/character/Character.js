import { observer } from "mobx-react-lite";
import React from "react";
import { useRootStore } from "../../models/Root";
import Actions from "./Actions";

const Character = observer(() => {
  const { character, skills } = useRootStore();

  return (
    <div>
      <h2>Character</h2>
      <p>📆 Sunday, June 25th, 2023</p>
      <p>🕐 4:00 PM</p>
      <p>{character.name}</p>
      <h3>Stats</h3>
      <p>Blood: 🩸{character.blood.current}</p>
      <p>Blood Type: {character.blood.type}</p>
      <p>Blood Quality: {character.blood.quality}</p>
      <p>Rent: 🩸{character.rent.monthlyPayment}/mo.</p>
      <p>
        Energy: ⚡️{character.energy.current}/{character.energy.max}
      </p>
      <h3>Skills</h3>
      <ul>
        {character.skills.map((skill) => {
          const skillData = skills.get(skill.key);

          let levelString = "";

          // We start at index 1 so that a level 1
          // skill has no "+" indicator.
          for (let i = 1; i < skill.level; i += 1) {
            levelString += "+";
          }

          return (
            <li key={skill.key}>
              {skillData.name}
              {levelString}
            </li>
          );
        })}
      </ul>
      <Actions />
    </div>
  );
});

export default Character;
