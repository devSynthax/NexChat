import { useState, useEffect, useCallback } from 'react';

/**
 * useStorage - Manage localStorage or sessionStorage in React.
 * 
 * @param {string} key - The storage key.
 * @param {*} initialValue - The default value.
 * @param {Object} options
 * @param {'local'|'session'} options.type - Storage type: 'local' (default) or 'session'.
 * @param {number} options.expiresIn - Optional expiration time in milliseconds.
 * 
 * @returns {[any, Function, Function]} [value, setValue, removeValue]
 */
export function useStorage(key, initialValue, options = {}) {
  const isSession = options.type === 'session';
  const storage = typeof window !== 'undefined'
    ? (isSession ? window.sessionStorage : window.localStorage)
    : null;

  const readValue = useCallback(() => {
    if (!storage) return initialValue;

    try {
      const storedItem = storage.getItem(key);
      if (!storedItem) return initialValue;

      const parsed = JSON.parse(storedItem);

      // Check for expiration
      if (
        options.expiresIn &&
        parsed.timestamp &&
        Date.now() - parsed.timestamp > options.expiresIn
      ) {
        storage.removeItem(key);
        return initialValue;
      }

      return parsed.value !== undefined ? parsed.value : initialValue;
    } catch (err) {
      console.warn(`useStorage: Failed to read "${key}"`, err);
      return initialValue;
    }
  }, [key, initialValue, options.expiresIn, storage]);

  const [storedValue, setStoredValue] = useState(readValue);

  useEffect(() => {
    setStoredValue(readValue());
  }, [readValue]);

  const setValue = useCallback((value) => {
    if (!storage) return;

    try {
      const payload = {
        value,
        timestamp: options.expiresIn ? Date.now() : undefined,
      };
      storage.setItem(key, JSON.stringify(payload));
      setStoredValue(value);
    } catch (err) {
      console.warn(`useStorage: Failed to set "${key}"`, err);
    }
  }, [key, options.expiresIn, storage]);

  const removeValue = useCallback(() => {
    if (!storage) return;

    try {
      storage.removeItem(key);
      setStoredValue(initialValue);
    } catch (err) {
      console.warn(`useStorage: Failed to remove "${key}"`, err);
    }
  }, [key, initialValue, storage]);

  return [storedValue, setValue, removeValue];
}
