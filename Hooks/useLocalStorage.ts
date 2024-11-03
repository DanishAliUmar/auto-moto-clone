import { useState, useEffect } from "react";

function useLocalStorage(initialKey = "", initialValue = null) {
  const [keyName, setKeyName] = useState(initialKey);
  const [value, setValue] = useState(() => {
    if (initialKey) {
      const storedValue = localStorage.getItem(initialKey);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    }
    return initialValue;
  });

  useEffect(() => {
    if (keyName && value !== undefined) {
      localStorage.setItem(keyName, JSON.stringify(value));
    }
  }, [keyName, value]);

  // Function to set a local item with a specific key and value
  const setLocalItem = ({ key, value }) => {
    setKeyName(key);
    setValue(value);
  };

  // Function to get a local item by key without setting it
  const getLocalItem = (key) => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null;
  };

  return [value, setLocalItem, getLocalItem];
}

export default useLocalStorage