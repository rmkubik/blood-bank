function parseActionEvents(action) {
  const { events: eventsRaw } = action;

  if (!eventsRaw) {
    return [];
  }

  const events = eventsRaw.map((eventRaw) => eventRaw.split(" "));

  return events;
}

export default parseActionEvents;
