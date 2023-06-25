import React from "react";

const JobPreview = ({ opening }) => {
  return (
    <li>
      <h3>{opening.title}</h3>
      <p>
        <strong>{opening.company}</strong>
      </p>
    </li>
  );
};

export default JobPreview;
