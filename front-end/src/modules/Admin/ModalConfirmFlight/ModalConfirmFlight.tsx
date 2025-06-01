import "./ModalConfirmFlight.scss";
import { FC } from "react";
import { useForm } from "@/hooks/useForm";
import { useModalCenter } from "@/components/Modal/ModalCenter/ModalCenter";
import ButtonDefault from "@/components/Buttons/ButtonDefault/ButtonDefault";
import { FlightState } from "@/models/flight.state";
import { updateFlightState } from "@/data/config/flight";
import { useMutation } from "@tanstack/react-query";
import router from "next/router";

interface ModalConfirmFlightProps {
  id_voo?: any;
}

interface ConfirmFlightResponse {
  message: string;
}

const ModalConfirmFlight: FC<ModalConfirmFlightProps> = ({ id_voo }) => {
  const { closeModal } = useModalCenter();

  const { form, loading, setLoading, changeState, validation } = useForm({
    id: {
      invalid: false,
      errorLabel: "Digite o código da reserva",
      value: "",
    },
  });

  const { mutateAsync, isPending } = useMutation<ConfirmFlightResponse, Error, FlightState>({
    mutationKey: ["updateFlightState"],
    mutationFn: updateFlightState,
    onSuccess: (data: ConfirmFlightResponse) => {
      console.log("User created successfully", data);
      router.push("/");
    },
    onError: (error: any) => {
      console.error("Error creating user", error);
      const apiErrors = error?.response?.data?.errors;
      if (Array.isArray(apiErrors)) {
        apiErrors.forEach((err: { field: string; message: string }) => {
          changeState(err.field, "invalid", true);
          changeState(err.field, "errorLabel", err.message);
        });
      }
    },
  });

  const onConfirm = async () => {
    if (!validation()) return;
    setLoading(true);
    try {
      
      const flightState: FlightState = {
        id_voo: id_voo,
        estado: "REALIZADO",
      };

      await mutateAsync(flightState);
      closeModal();
    } catch (error) {
      console.error("Error creating flight:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modalConfirmFlight">
      <span className="modalConfirmFlight__description">Confirme se o voo {id_voo} foi realizado.</span>
      <span className="modalConfirmFlight__description modalConfirmFlight__description--mod">Isso atualizará o status de todas as reservas.</span>
      <ButtonDefault children={"Cancelar"} color="white" onClick={closeModal} />
      <ButtonDefault children={"Confirmar realização do voo"} onClick={onConfirm} />
    </div>
  );
};

export default ModalConfirmFlight;
