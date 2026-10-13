import { useEffect, useState } from "react";

// Like useState, but the value is saved in localStorage and restored on reload
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved !== null ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage can be blocked (e.g. private browsing); the site still works without it
    }
  }, [key, value]);

  return [value, setValue];
}
