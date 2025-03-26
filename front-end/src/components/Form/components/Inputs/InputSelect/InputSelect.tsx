import "./InputSelect.scss";
import { FC } from "react";

type InputProp = React.ComponentProps<"select"> & {
  label: string;
  erroMsg: string;
  invalid?: boolean;
  optionDefault?: string;
  optionsSelect: string[];
  id: string;
};

const InputSelect: FC<InputProp> = ({
  id,
  label,
  erroMsg,
  invalid,
  optionsSelect,
  optionDefault,
  ...props
}) => {
  return (
    <div className={`inputSelect ${invalid ? "invalid" : ""}`}>
      <label htmlFor={id} className="inputSelect__label">
        {label}
        {props?.required ? "*" : ""}
      </label>
      <span className="inputSelect__wrapperSelect">
        <select
          className={`inputSelect__element ${
            props?.value ? "" : "inputSelect__element--disabled"
          }`}
          name={label}
          id={id}
          {...props}
        >
          <option value="" className="inputSelect__option " disabled>
            {optionDefault || "Selecione uma opção"}
          </option>
          {optionsSelect?.length > 0 &&
            optionsSelect.map((item: any, i: number) => (
              <option className="inputSelect__option" key={i} value={item}>
                {item}
              </option>
            ))}
        </select>
      </span>
      <span className="inputSelect__helpText">{invalid && erroMsg}</span>
    </div>
  );
};

export default InputSelect;
