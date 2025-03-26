"use client";
import React, { FC } from "react";
import useScrollDirection from "@/hooks/useScrollDirection";

interface AncorContainerProps {
  children: any; // Define your props here if needed
}

const AncorContainer: FC<AncorContainerProps> = ({ children }) => {
  const [direction, top] = useScrollDirection();
  return (
    <>
      <div
        className={`navBarAnchor ${
          direction === 1
            ? "scroll-down"
            : direction === 0
            ? "clean"
            : top
            ? "top"
            : "scroll-up"
        }`}
      >
        {children}
      </div>
    </>
  );
};

export default AncorContainer;
