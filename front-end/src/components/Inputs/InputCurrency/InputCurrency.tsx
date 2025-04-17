// InputCurrency.tsx
import "./InputCurrency.scss";
import { FC } from "react";
import CurrencyInput from "react-currency-input-field";

type InputProp = {
  id: string;
  label?: string;
  erroMsg: string;
  invalid?: boolean;
  variant?: "default" | "white";
  value: string;
  name: string;
  onChange: (e: any) => void;
};

const InputCurrency: FC<InputProp> = ({ id, label, name, erroMsg, invalid, variant = "default", value, onChange, ...props }) => {
  return (
    <div className={`inputCurrency ${invalid ? "inputCurrency--invalid" : ""} inputCurrency--${variant}`}>
      {label && (
        <label htmlFor={id} className="inputCurrency__label">
          {label}
        </label>
      )}
      <CurrencyInput
        id={id}
        className="inputCurrency__element"
        intlConfig={{ locale: "pt-BR", currency: "BRL" }}
        decimalsLimit={2}
        decimalScale={2}
        value={value}
        name={name}
        onValueChange={(value, name) => {
          // Remover caracteres inválidos
          const sanitizedValue = value?.replace(/[^\d.,]/g, "") || "";
          // Criar um evento sintético para manter a consistência
          const syntheticEvent = {
            target: {
              name: name,
              value: sanitizedValue,
            },
          };
          onChange(syntheticEvent);
        }}
        {...props}
      />
      <span className="inputCurrency__helpText">{invalid && erroMsg}</span>
    </div>
  );
};

export default InputCurrency;
