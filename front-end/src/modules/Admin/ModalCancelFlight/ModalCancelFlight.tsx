import "./ModalCancelFlight.scss";
import { FC } from "react";
import { useForm } from "@/hooks/useForm";
import { useModalCenter } from "@/components/Modal/ModalCenter/ModalCenter";
import ButtonDefault from "@/components/Buttons/ButtonDefault/ButtonDefault";
import router from "next/router";
import { useMutation } from "@tanstack/react-query";
import { updateFlightState } from "@/data/config/flight";
import { FlightState } from "@/models/flight.state";

interface ModalCancelFlightProps {
  id_voo?: any;
}

interface CancelFlightResponse {
  message: string;  
}

const ModalCancelFlight: FC<ModalCancelFlightProps> = ({ id_voo }) => {
  const { closeModal } = useModalCenter();

  const { form, loading, setLoading, changeState, validation } = useForm({
    id: {
      invalid: false,
      errorLabel: "Digite o código da reserva",
      value: "",
    },
  });

  const { mutateAsync, isPending } = useMutation<CancelFlightResponse, Error, FlightState>({
    mutationKey: ["updateFlightState"],
    mutationFn: updateFlightState,
    onSuccess: (data: CancelFlightResponse) => {
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

  const onSubmit = async () => {
    if (!validation()) return;
    setLoading(true);
    try {
      
      const flightState: FlightState = {
        id_voo: id_voo,
        estado: "CANCELADO",
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
    <div className="modalCancelFlight">
      <span className="modalCancelFlight__description">Tem certeza de que deseja cancelar o voo {id_voo}?</span>
      <span className="modalCancelFlight__description modalCancelFlight__description--mod">
        Isso cancelará todas as reservas para este voo e não poderá ser desfeito.
      </span>
      <ButtonDefault children={"Cancelar voo"} color="red" onClick={onSubmit} />
    </div>
  );
};

export default ModalCancelFlight;
