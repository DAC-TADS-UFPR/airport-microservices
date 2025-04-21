"use client";
import "./InputPhone.scss";
import { FC } from "react";
import InputMask, { Props } from "react-input-mask";

type InputProp = Omit<Props, "mask"> & {
  label: string;
  erroMsg: string;
  invalid?: boolean;
  value: string | undefined;
  variant?: "default" | "white";
};

const InputPhone: FC<InputProp> = ({ id, label, value = "", erroMsg, invalid, variant = "default", ...rest }) => {
  return (
    <div className={`inputPhone ${invalid ? "inputPhone--invalid" : ""} inputPhone--${variant}`}>
      <label htmlFor={id} className="inputPhone__label inputPhone__label--invalid">
        {label}
      </label>
      {/* @ts-ignore */}
      <InputMask
        id={id}
        maskPlaceholder={null}
        mask={value?.length < 15 ? "(99) 9999-99999" : "(99) 99999-9999"}
        autoComplete="one-time-code"
        type="tel"
        value={value}
        className="inputPhone__element inputPhone__element--invalid"
        {...rest}
      />
      <span className="inputPhone__helpText">{invalid && erroMsg}</span>
    </div>
  );
};

export default InputPhone;
