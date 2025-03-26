import "./ButtonTagNav.scss";
import React, { FC } from "react";

interface ButtonTagNavProps {
  className: string;
  data: { label: string };
  onClick: () => void;
}

const ButtonTagNav: FC<ButtonTagNavProps> = ({ className, data, onClick }) => {
  return (
    <button className={`buttonTagNav__link ${className}`} onClick={onClick}>
      {data.label}
    </button>
  );
};

export default ButtonTagNav;
