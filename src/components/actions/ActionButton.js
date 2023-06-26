import { observer } from "mobx-react-lite";
import React from "react";
import { useRootStore } from "../../models/Root";
import formatActionText from "../../models/actions/formatActionText";
import actions from "../../models/actions";

const ActionButton = observer(({ action }) => {
  const { takeAction } = useRootStore();

  return (
    <button onClick={() => takeAction(action)}>
      {formatActionText(actions[action])}
    </button>
  );
});

export default ActionButton;
