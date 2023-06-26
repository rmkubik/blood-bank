import parseActionEffects from "./parseActionEffects";
import symbols from "./symbols/index.yaml";

function formatActionText(action) {
  const actionEffects = parseActionEffects(action)
    .map(([affectedValue, value]) => {
      var formatter = new Intl.NumberFormat("en-US", {
        style: "decimal",
        signDisplay: "always",
      });

      return `${formatter.format(value)}${symbols[affectedValue]}`;
    })
    .join(", ");

  return `${action.name}, ${actionEffects}`;
}

export default formatActionText;
