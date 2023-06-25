import React from "react";
import * as classes from "./Job.module.scss";

const Job = ({ opening }) => {
  return (
    <div className={classes.job}>
      <h3>{opening.title}</h3>
      <p>
        <strong>{opening.company}</strong>
      </p>
      <p>{opening.body}</p>
    </div>
  );
};

export default Job;
