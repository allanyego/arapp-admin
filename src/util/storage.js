export async function setObject(key, value) {
  return new Promise((resolve, reject) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

export async function getObject(key) {
  return new Promise((resolve, reject) => {
    try {
      const value = JSON.parse(localStorage.getItem(key));
      resolve(value);
    } catch (error) {
      reject(error);
    }
  });
}

export async function clear() {
  return new Promise((resolve, reject) => {
    try {
      localStorage.clear();
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}
