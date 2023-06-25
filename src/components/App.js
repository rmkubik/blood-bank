import React from "react";
import Character from "./Character";
import Inbox from "./inbox/Inbox";
import Jobs from "./jobs/Jobs";
import { RootContextProvider, rootStore } from "../models/Root";

const App = () => {
  return (
    <div
      style={{
        display: "grid",
        gridGap: "1rem",
        gridTemplateColumns: "auto 1fr 1fr",
      }}
    >
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
