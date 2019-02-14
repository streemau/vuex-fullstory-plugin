export default function createPlugin(fullstory, sanitizer = (action => action)) {
  return store => {
    store.subscribe(mutation => {
      const sanitized = sanitizer(mutation);

      if (sanitized) {
        fullstory.log('mutation', sanitized);
      }
    });
  };
}
