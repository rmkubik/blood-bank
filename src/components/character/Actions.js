import React from "react";
import * as classes from "./Actions.module.scss";
import { useRootStore } from "../../models/Root";
import { observer } from "mobx-react-lite";
import ActionButton from "../actions/ActionButton";
import ButtonSet from "../actions/ButtonSet";

const Actions = observer(() => {
  const { takeAction, character } = useRootStore();

  return (
    <div className={classes.actions}>
      <h3>Actions</h3>
      <ButtonSet>
        <ActionButton action="sleep" />
        <ActionButton action="nap" />
        <ActionButton action="eat" />
        <ActionButton action="snack" />
        <ActionButton action="driveBloodDash" />
      </ButtonSet>
    </div>
  );
});

export default Actions;
