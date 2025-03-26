import { useEffect, MutableRefObject, useState, useRef } from "react";

// The hook now takes a ref as an argument that is explicitly typed
export default function useClickOutside(): [
  boolean,
  (val: boolean | ((prev: boolean) => boolean)) => void,
  MutableRefObject<HTMLDivElement | null>
] {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): any {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        return setTimeout(() => setActive(false), 150);
      }
      return setActive(true);
    }

    if (active) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [ref, active]);

  return [active, setActive, ref];
}
