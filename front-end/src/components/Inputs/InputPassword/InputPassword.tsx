"use client";
import "./InputPassword.scss";
import { FC, useState } from "react";

type InputProp = React.ComponentProps<"input"> & {
  label?: string;
  erroMsg: string;
  invalid?: boolean;
  variant?: "default" | "white";
};

const InputPassword: FC<InputProp> = ({ id, label, erroMsg, invalid, variant = "default", ...props }) => {
  const [show, setShow] = useState(false);

  return (
    <div className={`inputPassword ${invalid ? "inputPassword--invalid" : ""} inputPassword--${variant}`}>
      {label && (
        <label htmlFor={id} className="inputPassword__label">
          {label}
        </label>
      )}
      <div className="inputPassword__container">
        <input className="inputPassword__element" id={id} type={!show ? "password" : "text"} maxLength={4} {...props} />
        <figure className="inputPassword__iconContainer" onClick={() => setShow((prev) => !prev)}>
          <img className="inputPassword__icon" src={`/icons/${!show ? "EyeSlash.svg" : "EyeOpen.svg"}`} alt="Mostrar senha" />
        </figure>
      </div>
      {invalid && <span className="inputPassword__helpText">{erroMsg}</span>}
    </div>
  );
};

export default InputPassword;
