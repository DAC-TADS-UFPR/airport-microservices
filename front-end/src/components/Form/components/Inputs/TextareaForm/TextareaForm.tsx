import "./TextareaForm.scss";
import { FC } from "react";

type InputProp = React.ComponentProps<"textarea"> & {
  label: string;
  erroMsg: string;
  invalid?: boolean;
};
const TextareaForm: FC<InputProp> = ({
  id,
  label,
  erroMsg,
  invalid,
  ...props
}) => {
  return (
    <div className={`textareaForm  ${invalid ? "textareaForm--invalid" : ""}`}>
      <label
        htmlFor={id}
        className="textareaForm__label textareaForm__label--invalid"
      >
        {label}
      </label>
      <textarea
        className="textareaForm__element textareaForm__element--invalid"
        {...props}
        id={id}
      />
      <span className="textareaForm__helpText">{invalid && erroMsg}</span>
    </div>
  );
};
export default TextareaForm;
