function parseActionEffects(action) {
  const { effects: effectsRaw } = action;

  const effects = effectsRaw
    .map((effectRaw) => effectRaw.split(" "))
    .map(([name, value]) => [name, parseFloat(value)]);

  return effects;
}

export default parseActionEffects;
