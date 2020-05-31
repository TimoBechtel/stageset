let attached = false;
const scrollCallbacks = new Set();
const eventListener = (event) => {
  scrollCallbacks.forEach((callback) => {
    callback(event);
  });
};
const attach = () => {
  window.addEventListener('scroll', eventListener);
  attached = true;
};
const destroy = () => {
  window.removeEventListener('scroll', eventListener);
  attached = false;
};
export const scrollListener = {
  add(callback) {
    scrollCallbacks.add(callback);
    if (!attached) attach();
  },
  remove(callback) {
    scrollCallbacks.delete(callback);
    if (attached && scrollCallbacks.size === 0) destroy();
  },
};
