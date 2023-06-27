import React from "react";
import * as classes from "./Job.module.scss";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../../models/Root";
import ButtonSet from "../actions/ButtonSet";
import ActionButton from "../actions/ActionButton";

const Job = observer(({ opening }) => {
  const { companies } = useRootStore();
  const company = companies.list.get(opening.company);

  return (
    <div className={classes.job}>
      <h3>{opening.title}</h3>
      <p>
        <strong>{company?.name ?? opening.company}</strong>
      </p>
      <p>{opening.body}</p>
      <ButtonSet>
        <ActionButton action="tweakResume" />
        <ActionButton action="writeCoverLetter" />
        <ActionButton action="applyToJob" />
      </ButtonSet>
    </div>
  );
});

export default Job;
