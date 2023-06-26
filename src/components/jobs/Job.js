import React from "react";
import * as classes from "./Job.module.scss";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../../models/Root";
import ButtonSet from "../actions/ButtonSet";

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
        <button>Tweak Resume, +1🕐, -1⚡️</button>
        <button>Write Cover Letter, +1🕐, -1⚡️</button>
        <button>Apply, +1🕐, -1⚡️</button>
      </ButtonSet>
    </div>
  );
});

export default Job;
