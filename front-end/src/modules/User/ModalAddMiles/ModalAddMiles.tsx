import "./ModalAddMiles.scss";
import { FC } from "react";
import { useForm } from "@/hooks/useForm";
import { useModalCenter } from "@/components/Modal/ModalCenter/ModalCenter";
import InputCurrency from "@/components/Inputs/InputCurrency/InputCurrency";
import ButtonDefault from "@/components/Buttons/ButtonDefault/ButtonDefault";
import formatToMoney from "@/utils/formatToMoney";
import formatFloat from "@/utils/formatFloat";

interface ModalAddMilesProps {
  data?: any;
}

const ModalAddMiles: FC<ModalAddMilesProps> = ({ data }) => {
  const { closeModal } = useModalCenter();

  const { form, loading, setLoading, changeState, validation } = useForm({
    currency: {
      invalid: false,
      errorLabel: "Digite o valor da movimentação",
      value: formatToMoney(0) || "",
    },
    miles: {
      invalid: false,
      errorLabel: "Digite o valor da movimentação",
      value: "",
    },
  });

  return (
    <div className="modalAddMiles">
      <InputCurrency
        id="currency"
        label={"Valor (R$)"}
        name="currency"
        value={form.currency.value}
        erroMsg={form.currency.errorLabel}
        invalid={form.currency.invalid}
        onChange={(e) => {
          changeState("currency", "value", e.target.value);
        }}
      />
      <div className="modalAddMiles__row">
        <span className="modalAddMiles__row--title">Milhas:</span>
        <span className="modalAddMiles__row--value">{formatFloat(form.currency.value * 0.2)}</span>
      </div>

      <ButtonDefault children={"Comprar milhas"} onClick={closeModal} />
    </div>
  );
};

export default ModalAddMiles;
