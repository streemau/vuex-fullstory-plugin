function hasFullstory() {
  return !!(window.FS && window.FS.log);
}

export default function createPlugin(sanitizer = (action => action)) {
  return store => {
    store.subscribe(mutation => {
      if (hasFullstory()) {
        const sanitized = sanitizer(mutation);

        if (sanitized) {
          window.FS.log('mutation', sanitized);
        }
      }
    });
  };
}
