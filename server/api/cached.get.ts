export default defineCachedEventHandler(async (_event) => {
  return {
    date: Date.now(),
  };
}, {
  maxAge: 10,
  staleMaxAge: 30,
  swr: true,
  getKey: (event) => {
    return event.path;
  },
});
