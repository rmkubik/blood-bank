import React from "react";
import Character from "./character/Character";
import Inbox from "./inbox/Inbox";
import Jobs from "./jobs/Jobs";
import { RootContextProvider, rootStore } from "../models/Root";
import * as classes from "./App.module.scss";
import "normalize.css";

const App = () => {
  return (
    <div className={classes.app}>
      <Character />
      <Inbox />
      <Jobs />
    </div>
  );
};

const withProviders = (WrappedComponent) => {
  return () => {
    return (
      <RootContextProvider value={rootStore}>
        <WrappedComponent />
      </RootContextProvider>
    );
  };
};

export default withProviders(App);
