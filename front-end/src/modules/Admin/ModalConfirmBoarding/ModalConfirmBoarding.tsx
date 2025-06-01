import "./ModalConfirmBoarding.scss";
import { FC } from "react";
import { useForm } from "@/hooks/useForm";
import { useModalCenter } from "@/components/Modal/ModalCenter/ModalCenter";
import InputText from "@/components/Inputs/InputText/InputText";
import ButtonDefault from "@/components/Buttons/ButtonDefault/ButtonDefault";
import { updateReservationState } from "@/data/config/reservation";
import { ReservaState, ReservaStateEnum } from "@/models/reserva.state";
import { useMutation } from "@tanstack/react-query";
import router from "next/router";

interface ModalConfirmBoardingProps {
  id_voo?: any;
}

interface ConfirmResponse {
  message: string;
}

const ModalConfirmBoarding: FC<ModalConfirmBoardingProps> = ({ id_voo }) => {
  const { closeModal } = useModalCenter();

  const {mutateAsync} = useMutation<ConfirmResponse, Error, ReservaState>({
    mutationKey: ["updateReservationState"],
    mutationFn: updateReservationState,
    onSuccess: (data: ConfirmResponse) => {
      console.log("Check-in realizado com sucesso:", data);
      router.push("/");
    },
    onError: (error: any) => {
      console.error("Erro ao atualizar reserva:", error);
      const apiErrors = error?.response?.data?.errors;
      if (Array.isArray(apiErrors)) {
        apiErrors.forEach((err: { field: string; message: string }) => {
          console.error(`Erro no campo ${err.field}: ${err.message}`);
        });
      }
    },
  });

  const doConfirm = async () => {
    try {
      const state: ReservaState = {
        id_reserva: form.code.value,
        estado: ReservaStateEnum.EMBARCADA,
      };

      await mutateAsync(state);
    } catch (error) {
      console.error("Erro ao realizar check-in:", error);
    }
  };

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
      <ButtonDefault children={"Confirmar embarque"} onClick={doConfirm} />
    </div>
  );
};

export default ModalConfirmBoarding;
