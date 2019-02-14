export default {
  subscribers: [],
  subscribe: function (fn) {
    this.subscribers.push(fn);
  },
  fire: function (mutation) {
    this.subscribers.forEach(x => {
      x(mutation);
    });
  }
};
