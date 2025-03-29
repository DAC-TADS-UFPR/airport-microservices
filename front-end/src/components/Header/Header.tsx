"use client";
import "./Header.scss";
import { FC } from "react";
import { usePathname } from "next/navigation";
import ImgDefault from "../ImgDefault/ImgDefault";
import LinkDefault from "../LinkDefault/LinkDefault";

interface HeaderNavProps {}

const Header: FC<HeaderNavProps> = ({}) => {
  const pathname = usePathname();

  const options = pathname.includes("/admin") ? (
    <div className="header__nav">
      <div className="header__navLink header__navLink--mod">
        <span className="header__navLinkText">Olá, {`{admin}`}</span>
      </div>
      <LinkDefault href="/" className="header__navLink">
        <span className="header__navLinkText header__navLinkText--mod">Sair</span>
        <ImgDefault className="header__logo header__logo--mod" src={"/icons/exit.svg"} alt="Sair" />
      </LinkDefault>
    </div>
  ) : pathname.includes("/user") ? (
    <div className="header__nav header__nav--mod">
      <div className="header__navLink">
        <span className="header__navLinkText">Olá, {`{user}`}</span>
      </div>
      <LinkDefault href="/" className="header__navLink">
        <span className="header__navLinkText header__navLinkText--mod">Sair</span>
        <ImgDefault className="header__logo header__logo--mod" src={"/icons/exit.svg"} alt="Sair" />
      </LinkDefault>
    </div>
  ) : (
    <div className="header__nav">
      <LinkDefault href="/" className="header__navLink">
        <span className="header__navLinkText">Login</span>
      </LinkDefault>
      <LinkDefault href="/registrar" className="header__navLink">
        <span className="header__navLinkText">Registrar</span>
      </LinkDefault>
    </div>
  );

  return (
    <header className="header">
      <div className="header__containerHeader">
        <LinkDefault href="/" className="header__logoContainer">
          <ImgDefault className="header__logo" src={"/icons/logo.svg"} alt="Air TADS Logo" />
          <span className="header__title">AirTADS</span>
        </LinkDefault>
        {options}
      </div>
    </header>
  );
};

export default Header;
