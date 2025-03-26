"use client";
import "./Header.scss";
import { FC, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getHeader } from "@/data/config/api";
import useClickOutside from "@/hooks/useClickOutside";
import HeaderContainer from "./components/HeaderContainer";

interface HeaderNavProps {
  header: any;
  search: any;
}

const Header: FC<HeaderNavProps> = ({ header, search }) => {
  const { data } = useQuery({
    queryKey: ["getHeader"],
    queryFn: getHeader,
    initialData: header,
  });
  const [open, setOpen, container] = useClickOutside();
  const [dropdown, setDropdown] = useState<string>("");

  useEffect(() => {
    !open && setDropdown("");
  }, [open]);

  const handleMenuClick = (title: string) => {
    setDropdown(
      (prev) => (setOpen(prev !== title), prev === title ? "" : title)
    );
  };

  return (
    <HeaderContainer {...{ open, setOpen, dropdown, setDropdown }}>
      <div className="header__overlay" />
      <div className="header__containerHeader" ref={container}>
        <div className="header__containerTitle">
          <span className="header__title">Template Start</span>
        </div>
      </div>
    </HeaderContainer>
  );
};

export default Header;
