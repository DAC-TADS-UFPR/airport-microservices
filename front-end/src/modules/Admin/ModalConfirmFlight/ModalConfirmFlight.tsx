import "./ModalConfirmFlight.scss";
import { FC, useState } from "react";
import { useForm } from "@/hooks/useForm";
import { useModalCenter } from "@/components/Modal/ModalCenter/ModalCenter";
import ButtonDefault from "@/components/Buttons/ButtonDefault/ButtonDefault";
import { FlightState } from "@/models/flight.state";
import { updateFlightState } from "@/data/config/flight";
import { useMutation } from "@tanstack/react-query";
import router from "next/router";
import ResultModal from "../../ResultModal/ResultModal";

interface ModalConfirmFlightProps {
  id_voo?: any;
}

interface ConfirmFlightResponse {
  message: string;
}

const ModalConfirmFlight: FC<ModalConfirmFlightProps> = ({ id_voo }) => {
  const { closeModal } = useModalCenter();

  const [loading, setLoading] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const { mutateAsync, isPending } = useMutation<ConfirmFlightResponse, Error, FlightState>({
    mutationKey: ["updateFlightState"],
    mutationFn: updateFlightState,
    onSuccess: (data: ConfirmFlightResponse) => {
      setIsSuccess(true);
      setResultMessage("Voo realizado com sucesso!");
      setShowResultModal(true);
      setTimeout(() => {
        closeModal();
        window.location.reload();
      }, 2000);
    },
    onError: (error: any) => {
      console.error("Error confirming flight", error);
      const apiErrors = error?.response?.data?.errors;
      if (Array.isArray(apiErrors)) {
        apiErrors.forEach((err: { field: string; message: string }) => {
        });
      }
    },
  });

  const onConfirm = async () => {
    setLoading(true);
    try {
      const flightState: FlightState = {
        id_voo: id_voo,
        estado: "REALIZADO",
      };
      await mutateAsync(flightState);
    } catch (error) {
      console.error("Error confirming flight:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResultModalClose = () => {
    setShowResultModal(false);
    if (isSuccess) {
      window.location.reload();
    }
  };

  return (
    <div className="modalConfirmFlight">
      <span className="modalConfirmFlight__description">
        Confirme se o voo {id_voo} foi realizado.
      </span>
      <span className="modalConfirmFlight__description modalConfirmFlight__description--mod">
        Isso atualizará o status de todas as reservas.
      </span>
      <ButtonDefault children={"Cancelar"} color="white" onClick={closeModal} />
      <ButtonDefault children={"Confirmar realização do voo"} onClick={onConfirm} disabled={isPending || loading} />

      <ResultModal
        open={showResultModal}
        isSuccess={isSuccess}
        isPending={isPending}
        message={resultMessage}
        onClose={handleResultModalClose}
      />
    </div>
  );
};

export default ModalConfirmFlight;
