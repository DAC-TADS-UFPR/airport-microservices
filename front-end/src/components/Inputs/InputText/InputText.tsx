import "./InputText.scss";
import { FC, ForwardedRef } from "react";

type InputProp = React.ComponentProps<"input"> & {
  label?: string;
  erroMsg?: string;
  invalid?: boolean;
  border?: boolean;
  variant?: "default" | "white";
  forwardRef?: ForwardedRef<HTMLInputElement>;
  button?: boolean;
  suffix?: string;
  buttonClick?: () => void;
  readOnly?: boolean;
};

const InputText: FC<InputProp> = ({
  id,
  label,
  erroMsg = "",
  invalid,
  variant = "default",
  border,
  forwardRef,
  button,
  buttonClick,
  suffix,
  readOnly,
  ...props
}) => {
  const numberInputOnWheelPreventChange = (e: any) => {
    e.target.blur();
    e.stopPropagation();
  };

  return (
    <div className={`inputText ${invalid ? "inputText--invalid" : ""} inputText--${variant}`}>
      <div className="inputText__header">
        {label && (
          <label htmlFor={id} className="inputText__label">
            {label}
          </label>
        )}
      </div>
      <div className={`inputText__element  inputText__element--${readOnly ? "readOnly" : ""} ${border ? "inputText__element--border" : ""}`}>
        <input className="inputText__input" {...props} disabled={props.disabled || readOnly} id={id} ref={forwardRef} />
        {suffix && <span className="inputText__suffix">{suffix}</span>}
      </div>

      {erroMsg && <span className="inputText__helpText">{invalid && erroMsg}</span>}
    </div>
  );
};

export default InputText;
