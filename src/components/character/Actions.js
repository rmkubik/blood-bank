import React from "react";
import * as classes from "./Actions.module.scss";
import { useRootStore } from "../../models/Root";
import { observer } from "mobx-react-lite";

const Actions = observer(() => {
  const { takeAction, character } = useRootStore();

  return (
    <div className={classes.actions}>
      <h3>Actions</h3>
      <button onClick={() => takeAction("sleep")}>Sleep, +8🕐, +10⚡️</button>
      <button>Nap, +2🕐, +2⚡️</button>
      <button>Eat, +1🕐, +3⚡️, -20🩸</button>
      <button>Snack, +½🕐, +1⚡️, -5🩸</button>
      <button>Drive for BloodDash, +100🩸, -8⚡️, +10🕐</button>
    </div>
  );
});

export default Actions;
