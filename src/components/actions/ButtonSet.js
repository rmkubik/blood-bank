import React from "react";
import * as classes from "./ButtonSet.module.scss";

const ButtonSet = ({ children }) => {
  return <div className={classes.buttonSet}>{children}</div>;
};

export default ButtonSet;
