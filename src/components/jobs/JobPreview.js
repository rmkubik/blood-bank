import React from "react";
import * as classes from "./JobPreview.module.scss";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../../models/Root";

const JobPreview = observer(({ opening, isSelected }) => {
  const { companies } = useRootStore();
  const company = companies.list.get(opening.company);

  return (
    <li
      className={
        classes.jobPreview + " " + (isSelected ? classes.selected : "")
      }
    >
      <h3>{opening.title}</h3>
      <p>
        <strong>{company?.name ?? opening.company}</strong>
      </p>
    </li>
  );
});

export default JobPreview;
