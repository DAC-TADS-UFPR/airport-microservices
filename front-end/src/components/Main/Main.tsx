"use client";
import { FC, ReactNode } from "react";
import { useVisibleSection } from "@/hooks/useSectionActive";

const MainDefault: FC<{ id: string; children: ReactNode }> = ({ id, children }) => {
  useVisibleSection("section", "isElementFullyVisible", "active");

  return <main id={id}>{children}</main>;
};

export default MainDefault;
