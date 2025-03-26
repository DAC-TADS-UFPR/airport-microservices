"use client";

import React, { FC, useEffect } from "react";
import { usePathname } from "next/navigation";
import useBlockScroll from "@/hooks/useScrollBlock";
import useScrollDirection from "@/hooks/useScrollDirection";

interface HeaderContainerProps {
  children: React.ReactNode;
  open: boolean;
  dropdown: string;
  setOpen: (val: boolean | ((prev: boolean) => boolean)) => void;
  setDropdown: (val: string | ((prev: string) => string)) => void;
}

const HeaderContainer: FC<HeaderContainerProps> = ({
  children,
  open,
  dropdown,
  setOpen,
  setDropdown,
}) => {
  const [direction, top] = useScrollDirection();
  const path = usePathname();

  useBlockScroll(open);

  useEffect(() => {
    setOpen(false);
    setDropdown("");
  }, [path]);

  return (
    <header
      className={`header ${
        direction === 1
          ? "header__scroll--down"
          : direction === 0
          ? "header__clean"
          : top
          ? "header__top"
          : "header__scroll--up"
      } ${open ? "header__open--menu" : ""} ${
        dropdown === "search" ? "header__open--search" : ""
      }`}
    >
      {children}
    </header>
  );
};

export default HeaderContainer;
