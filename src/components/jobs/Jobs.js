import { observer } from "mobx-react-lite";
import React from "react";
import { useRootStore } from "../../models/Root";
import * as classes from "./Jobs.module.scss";
import JobPreview from "./JobPreview";
import Job from "./Job";

const Jobs = observer(() => {
  const { jobs } = useRootStore();

  return (
    <div>
      <div className={classes.jobs}>
        <h2>Jobs</h2>
        <ul>
          {jobs.openings.map((opening, index) => (
            // TODO: Jobs should have ids for usage as keys in
            // the data model
            <JobPreview
              opening={opening}
              isSelected={jobs.selectedIndex === index}
            />
          ))}
        </ul>
      </div>
      <Job opening={jobs.openings[jobs.selectedIndex]} />
    </div>
  );
});

export default Jobs;
