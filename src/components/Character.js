import { observer } from "mobx-react-lite";
import React from "react";
import { useRootStore } from "../models/Root";

const Character = observer(() => {
  const { character, skills } = useRootStore();

  console.log(skills.get("hauling").name);

  return (
    <div>
      <h2>Character</h2>
      <p>{character.name}</p>
      <p>Blood: {character.blood.current}</p>
      <p>Blood Type: {character.blood.type}</p>
      <p>Blood Quality: {character.blood.quality}</p>
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
    </div>
  );
});

export default Character;
