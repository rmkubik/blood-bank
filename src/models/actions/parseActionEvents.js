function parseActionEvents(action) {
  const { events: eventsRaw } = action;

  const events = eventsRaw.map((eventRaw) => eventRaw.split(" "));

  return events;
}

export default parseActionEvents;
