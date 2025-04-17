import "./ModalCancelFlight.scss";
import { FC } from "react";
import { useForm } from "@/hooks/useForm";
import { useModalCenter } from "@/components/Modal/ModalCenter/ModalCenter";
import ButtonDefault from "@/components/Buttons/ButtonDefault/ButtonDefault";

interface ModalCancelFlightProps {
  data?: any;
}

const ModalCancelFlight: FC<ModalCancelFlightProps> = ({ data }) => {
  const { closeModal } = useModalCenter();

  const { form, loading, setLoading, changeState, validation } = useForm({
    id: {
      invalid: false,
      errorLabel: "Digite o código da reserva",
      value: "",
    },
  });

  return (
    <div className="modalCancelFlight">
      <span className="modalCancelFlight__description">Tem certeza de que deseja cancelar o voo {`{XXXXXX}`}?</span>
      <span className="modalCancelFlight__description modalCancelFlight__description--mod">
        Isso cancelará todas as reservas para este voo e não poderá ser desfeito.
      </span>
      <ButtonDefault children={"Cancelar voo"} color="red" onClick={closeModal} />
    </div>
  );
};

export default ModalCancelFlight;
