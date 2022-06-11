const storageIO = {
  /**
   * Write an object per key to storage.
   * Values will be stringified to JSON.
   *
   * @param {object} values - values to write
   * @param {object} storage - sessionStorage or localStorage
   */
  write: (values, storage) => {
    Object
      .entries(values)
      .forEach(([key, value]) => {
        storage.setItem(key, JSON.stringify(value));
      });
  },

  /**
   * Returns JSON parsed value from storage
   *
   * @param {string} key - storage key
   * @param {object} storage - sessionStorage or localStorage
   * @returns {any}
   */
  get: (key, storage) => {
    try {
      return JSON.parse(storage.getItem(key));
    } catch (error) {
      return null;
    }
  },

  /**
   * Storage clear.
   *
   * @param {object} storage - sessionStorage or localStorage
   */
  clear: (storage) => {
    storage.clear();
  },
};

export const sessionService = {
  /**
   * Write object per key to session storage.
   * Values will be stringified to JSON.
   *
   * @param {object} values - values to write
   * @returns {void}
   */
  write: (values) => storageIO.write(values, sessionStorage),

  /**
   * Returns JSON parsed value from a session.
   *
   * @param {string} key - session key
   * @returns {any}
   */
  get: (key) => storageIO.get(key, sessionStorage),

  /**
   * Session clear.
   */
  clear: () => { storageIO.clear(sessionStorage); },

  /**
   * Returns JWT token.
   *
   * @returns {string|null}
   */
  getToken: () => storageIO.get('token', sessionStorage) || null,
};

export const localStorageService = {
  /**
   * Write object per key to local storage.
   * Values will be stringified to JSON.
   *
   * @param {object} values - values to write
   * @returns {void}
   */
  write: (values) => storageIO.write(values, localStorage),

  /**
   * Returns JSON parsed value from local storage.
   *
   * @param {string} key - storage key
   * @returns {any}
   */
  get: (key) => storageIO.get(key, localStorage),
};
