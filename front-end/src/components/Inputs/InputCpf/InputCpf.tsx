"use client";
import "./InputCpf.scss";
import { FC } from "react";
import InputMask, { Props } from "react-input-mask";

type InputProp = Omit<Props, "mask"> & {
  label: string;
  erroMsg: string;
  invalid?: boolean;
  variant?: "default" | "white";
};

const InputCpf: FC<InputProp> = ({ id, label, erroMsg, invalid, variant = "default", ...rest }) => {
  return (
    <div className={`inputCpf ${invalid ? "inputCpf--invalid" : ""} inputCpf--${variant}`}>
      <label htmlFor={id} className="inputCpf__label inputCpf__label--invalid">
        {label}
      </label>
      {/* @ts-ignore */}
      <InputMask
        id={id}
        mask="999.999.999-99"
        maskPlaceholder={null}
        autoComplete="one-time-code"
        type="text"
        className="inputCpf__element inputCpf__element--invalid"
        {...rest}
      />
      <span className="inputCpf__helpText">{invalid && erroMsg}</span>
    </div>
  );
};

export default InputCpf;
