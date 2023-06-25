import { observer } from "mobx-react-lite";
import React from "react";
import { useRootStore } from "../../models/Root";
import * as classes from "./Jobs.module.scss";

const Jobs = observer(() => {
  const { jobs } = useRootStore();

  return (
    <div className={classes.jobs}>
      <h2>Jobs</h2>
      <ul>
        {jobs.openings.map((opening) => {
          return (
            <li>
              <h3>{opening.title}</h3>
              <p>
                <em>{opening.body.slice(0, 60)}...</em>
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
});

export default Jobs;
