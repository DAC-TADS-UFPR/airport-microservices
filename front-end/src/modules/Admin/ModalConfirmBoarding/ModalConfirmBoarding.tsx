import "./ModalConfirmBoarding.scss";
import { FC } from "react";
import { useForm } from "@/hooks/useForm";
import { useModalCenter } from "@/components/Modal/ModalCenter/ModalCenter";
import InputText from "@/components/Inputs/InputText/InputText";
import ButtonDefault from "@/components/Buttons/ButtonDefault/ButtonDefault";

interface ModalConfirmBoardingProps {
  data?: any;
}

const ModalConfirmBoarding: FC<ModalConfirmBoardingProps> = ({ data }) => {
  const { closeModal } = useModalCenter();

  const { form, loading, setLoading, changeState, validation } = useForm({
    code: {
      invalid: false,
      errorLabel: "Digite o código da reserva",
      value: "",
    },
  });

  return (
    <div className="modalConfirmBoarding">
      <span className="modalConfirmBoarding__description">Digite o código de reserva para confirmar o embarque no voo.</span>

      <InputText
        id="code"
        label={"Código da reserva"}
        placeholder="RES000"
        value={form.code.value}
        erroMsg={form.code.errorLabel}
        invalid={form.code.invalid}
        onChange={(e) => {
          changeState("code", "value", e.target.value);
        }}
      />
      <ButtonDefault children={"Confirmar embarque"} onClick={closeModal} />
    </div>
  );
};

export default ModalConfirmBoarding;
