function canActionCostsBePaid(effects, root) {
  return effects.every(([affectedItem, value]) => {
    switch (affectedItem) {
      case "hour":
        // Time costs can always be paid
        return true;
      case "energy":
        return root.character.canPayEnergy(value);
      case "blood":
        return root.character.canPayBlood(value);
      case "rent":
        // Rent can always be adjusted
        return true;
    }
  });
}

export default canActionCostsBePaid;
