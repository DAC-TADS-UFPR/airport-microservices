import "./ModalCancelFlight.scss";
import { FC, useState } from "react";
import { useForm } from "@/hooks/useForm";
import { useModalCenter } from "@/components/Modal/ModalCenter/ModalCenter";
import ButtonDefault from "@/components/Buttons/ButtonDefault/ButtonDefault";
import router from "next/router";
import { useMutation } from "@tanstack/react-query";
import { updateFlightState } from "@/data/config/flight";
import { FlightState } from "@/models/flight.state";
import ResultModal from "../../ResultModal/ResultModal";

interface ModalCancelFlightProps {
  id_voo?: any;
}

interface CancelFlightResponse {
  message: string;  
}

const ModalCancelFlight: FC<ModalCancelFlightProps> = ({ id_voo }) => {
  const { closeModal } = useModalCenter();


  const [loading, setLoading] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const { mutateAsync, isPending } = useMutation<CancelFlightResponse, Error, FlightState>({
    mutationKey: ["updateFlightState"],
    mutationFn: updateFlightState,
    onSuccess: (data: CancelFlightResponse) => {
      setIsSuccess(true);
      setResultMessage("Voo cancelado com sucesso!");
      setShowResultModal(true);
      setTimeout(() => {
        closeModal();
        window.location.reload();
      }, 2000);
    },
    onError: (error: any) => {
      console.error("Error cancelling flight", error);
      const apiErrors = error?.response?.data?.errors;
      if (Array.isArray(apiErrors)) {
        apiErrors.forEach((err: { field: string; message: string }) => {
         
        });
      }
    },
  });

  const onSubmit = async () => {
    setLoading(true);
    try {
      const flightState: FlightState = {
        id_voo: id_voo,
        estado: "CANCELADO",
      };
      await mutateAsync(flightState);
    } catch (error) {
      console.error("Error cancelling flight:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResultModalClose = () => {
    setShowResultModal(false);
    if (isSuccess) {
      router.push("/");
    }
  };

  return (
    <div className="modalCancelFlight">
      <span className="modalCancelFlight__description">
        Tem certeza de que deseja cancelar o voo {id_voo}?
      </span>
      <span className="modalCancelFlight__description modalCancelFlight__description--mod">
        Isso cancelará todas as reservas para este voo e não poderá ser desfeito.
      </span>
      <ButtonDefault children={"Cancelar voo"} color="red" onClick={onSubmit} disabled={loading || isPending} />

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

export default ModalCancelFlight;
