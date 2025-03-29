"use client";
import "./InputMasks.scss";
import { FC } from "react";
import InputMask, { Props } from "react-input-mask";

type InputProp = Omit<Props, "mask"> & {
  label: string;
  erroMsg: string;
  invalid?: boolean;
  variant?: "default" | "white";
  version: "card" | "cvv" | "cep" | "crn";
};

const InputMasks: FC<InputProp> = ({ id, label, erroMsg, invalid, variant = "default", version, ...rest }) => {
  const mask = (type: "card" | "cvv" | "cep" | "crn") => {
    const obj = {
      card: "9999-9999-9999-9999",
      cvv: "999",
      cep: "99999-999",
      crn: "999999-9",
    };
    return obj[type];
  };

  return (
    <div className={`inputMasks ${invalid ? "inputMasks--invalid" : ""} inputMasks--${variant}`}>
      <label htmlFor={id} className="inputMasks__label inputMasks__label--invalid">
        {label}
      </label>
      {/* @ts-ignore */}
      <InputMask
        maskPlaceholder={null}
        autoComplete="one-time-code"
        type="tel"
        className="inputMasks__element inputMasks__element--invalid"
        mask={mask(version)}
        {...rest}
      />
      {erroMsg && <span className="inputMasks__helpText">{invalid && erroMsg}</span>}
    </div>
  );
};

export default InputMasks;
