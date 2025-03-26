import "./CheckBoxDefault.scss";
import { FC } from "react";

type InputProp = React.ComponentProps<"input"> & {
  label?: string;
  erroMsg: string;
  invalid?: boolean;
};

const CheckBoxDefault: FC<InputProp> = ({
  id,
  label,
  erroMsg,
  invalid,
  ...props
}) => {
  return (
    <div
      className={`checkBoxDefault ${invalid ? "checkBoxDefault--invalid" : ""}`}
    >
      <div className="checkBoxDefault__container">
        <input
          className="checkBoxDefault__element checkBoxDefault__element--invalid"
          id={id}
          {...props}
        />
        {label && (
          <label
            htmlFor={id}
            className={`checkBoxDefault__label  ${
              invalid ? "checkBoxDefault__label--invalid" : ""
            }`}
          >
            {label}
          </label>
        )}
      </div>
      <span className={`checkBoxDefault__helpText `}>{invalid && erroMsg}</span>
    </div>
  );
};

export default CheckBoxDefault;
