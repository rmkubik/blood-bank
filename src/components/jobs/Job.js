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
      <button>Tweak Resume, +1🕐</button>
      <button>Write Cover Letter, +1🕐</button>
      <button>Apply, +1🕐</button>
    </div>
  );
};

export default Job;
