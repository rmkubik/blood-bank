import React from "react";
import * as classes from "./Actions.module.scss";

const Actions = () => {
  return (
    <div className={classes.actions}>
      <h3>Actions</h3>
      <button>Sleep, +8🕐, +10⚡️</button>
      <button>Nap, +2🕐, +2⚡️</button>
      <button>Eat, +1🕐, +2⚡️, -12🩸</button>
      <button>Snack, +½🕐, +1⚡️, -4🩸</button>
    </div>
  );
};

export default Actions;
