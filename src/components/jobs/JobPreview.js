import React from "react";
import * as classes from "./JobPreview.module.scss";

const JobPreview = ({ opening, isSelected }) => {
  return (
    <li
      className={
        classes.jobPreview + " " + (isSelected ? classes.selected : "")
      }
    >
      <h3>{opening.title}</h3>
      <p>
        <strong>{opening.company}</strong>
      </p>
    </li>
  );
};

export default JobPreview;
