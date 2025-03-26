"use client";
import { FC, InputHTMLAttributes, useRef } from "react";
import ReactInputMask from "react-input-mask";

import "./InputPhone.scss";
type InputProp = React.ComponentProps<"input"> & { label: string; erroMsg: string; invalid?: boolean };

const InputPhone: FC<InputProp> = ({ id, label, onChange, value, erroMsg, invalid, ...rest }) => {
  return (
    <div className={`InputPhone ${invalid ? "InputPhone--invalid" : ""}`}>
      <label htmlFor={id} className="InputPhone__label InputPhone__label--invalid">
        {label}
      </label>
      <ReactInputMask
        id={id}
        //@ts-ignore
        mask={value?.length < 15 ? "(99) 9999-99999" : "(99) 99999-9999"}
        disabled={false}
        maskPlaceholder={null}
        autoComplete="one-time-code"
        type="tel"
        onChange={onChange}
        value={value}
        className="InputPhone__element InputPhone__element--invalid"
      />
      <span className="InputPhone__helpText">{invalid && erroMsg}</span>
    </div>
  );
};

export default InputPhone;
