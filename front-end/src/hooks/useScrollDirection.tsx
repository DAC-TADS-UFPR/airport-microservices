"use client";

import { useScroll } from "@use-gesture/react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const useScrollDirection = () => {
  const [direction, setDirection] = useState<number>(0);
  const [top, setTop] = useState<boolean>(false);
  const [p, setP] = useState<string>("");
  const path = usePathname();

  const scroll =
    typeof window !== "undefined"
      ? useScroll(
          (state) => {
            const [x, y] = state.direction;
            const [offx, offy] = state.offset;
            if (offy > 40) {
              setDirection(y);
            }
            if (offy < 150) {
              setTop(true);
            } else {
              setTop(false);
            }
          },
          { target: window }
        )
      : undefined;

  useEffect(() => {
    scroll;
    if (path != p) setDirection(0);
    setP(path);
  }, [direction, path]);

  return [direction, top];
};

export default useScrollDirection;
