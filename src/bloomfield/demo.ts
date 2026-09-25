import { createContext, useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
export const DemoContext = createContext({ hindi: false, toggle: () => {} });
export const useLanguage = () => useContext(DemoContext);
export function useStored<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem("bloomfield-demo:" + key);
      return raw ? JSON.parse(raw) : initial;
    } catch {
      return initial;
    }
  });
  const [storageError, setStorageError] = useState(false);
  useEffect(() => {
    try {
      localStorage.setItem("bloomfield-demo:" + key, JSON.stringify(value));
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
  }, [key, value]);
  return [value, setValue, storageError] as const;
}
export function useFilter(key = "category") {
  const [params, setParams] = useSearchParams();
  return [
    params.get(key) || "All",
    (v: string) =>
      setParams((p) => {
        if (v === "All" || !v) p.delete(key);
        else p.set(key, v);
        p.delete("page");
        return p;
      }),
  ] as const;
}
