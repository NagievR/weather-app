import React, { useEffect, useState } from "react";

const useLocalStorage = <T>(key: string, value: T) => {
  const [storedValue, setStoredValue] = useState<T>();

  const getStoredValue = () => {
    const storedValue = localStorage.getItem(key);
    const value = storedValue ? JSON.parse(storedValue) : null;
    setStoredValue(value)
  };

  useEffect(() => {
    getStoredValue();
  }, [key]);

  useEffect(() => {
    console.log()
  }, [value]);

  return [storedValue, ];
};

export default useLocalStorage;
