const store = {};

const get = (key) => {
  const entry = store[key];
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    delete store[key];
    return null;
  }
  return entry.value;
};

const set = (key, value, ttlSeconds = 60) => {
  store[key] = {
    value,
    expiresAt: Date.now() + ttlSeconds * 1000,
  };
};

// this is used to remove keys when data is updated or deleted
const invalidate = (key) => {
  delete store[key];
};

export default { get, set, invalidate };