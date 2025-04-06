import "./ModalConfirmFlight.scss";
import { FC } from "react";
import { useForm } from "@/hooks/useForm";
import { useModalCenter } from "@/components/Modal/ModalCenter/ModalCenter";
import ButtonDefault from "@/components/Buttons/ButtonDefault/ButtonDefault";

interface ModalConfirmFlightProps {
  data?: any;
}

const ModalConfirmFlight: FC<ModalConfirmFlightProps> = ({ data }) => {
  const { closeModal } = useModalCenter();

  const { form, loading, setLoading, changeState, validation } = useForm({
    id: {
      invalid: false,
      errorLabel: "Digite o código da reserva",
      value: "",
    },
  });

  return (
    <div className="modalConfirmFlight">
      <span className="modalConfirmFlight__description">Confirme se o voo {`{XXXXXX}`} foi realizado.</span>
      <span className="modalConfirmFlight__description modalConfirmFlight__description--mod">Isso atualizará o status de todas as reservas.</span>
      <ButtonDefault children={"Cancelar"} color="white" onClick={closeModal} />
      <ButtonDefault children={"Confirmar realização do voo"} onClick={closeModal} />
    </div>
  );
};

export default ModalConfirmFlight;
