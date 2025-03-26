import "./InputForm.scsss";
import { FC } from "react";

type InputProp = React.ComponentProps<"input"> & {
  label?: string;
  erroMsg: string;
  invalid?: boolean;
};

const InputForm: FC<InputProp> = ({
  id,
  label,
  erroMsg,
  invalid,
  ...props
}) => {
  return (
    <div className={`inputForm ${invalid ? "inputForm--invalid" : ""}`}>
      {label && (
        <label
          htmlFor={id}
          className="inputForm__label inputForm__label--invalid"
        >
          {label}
        </label>
      )}
      <input
        className="inputForm__element inputForm__element--invalid"
        id={id}
        {...props}
      />
      <span className={`inputForm__helpText `}>{invalid && erroMsg}</span>
    </div>
  );
};
export default InputForm;
