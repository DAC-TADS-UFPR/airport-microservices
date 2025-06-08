import "./ModalConfirmBoarding.scss";
import { FC, useState } from "react";
import { useForm } from "@/hooks/useForm";
import { useModalCenter } from "@/components/Modal/ModalCenter/ModalCenter";
import InputText from "@/components/Inputs/InputText/InputText";
import ButtonDefault from "@/components/Buttons/ButtonDefault/ButtonDefault";
import { updateReservationState } from "@/data/config/reservation";
import { ReservaState, ReservaStateEnum } from "@/models/reserva.state";
import { useMutation } from "@tanstack/react-query";
import router from "next/router";
import ResultModal from "../../ResultModal/ResultModal";

interface ModalConfirmBoardingProps {
  id_voo?: any;
}

interface ConfirmResponse {
  message: string;
}

interface ErrorResponse {
  message: {
    message: string;
    errors?: Array<{ field: string; message: string }>;
  }; 
}

const ModalConfirmBoarding: FC<ModalConfirmBoardingProps> = ({ id_voo }) => {
  const { closeModal } = useModalCenter();

  const [showResultModal, setShowResultModal] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const { mutateAsync } = useMutation<ConfirmResponse, ErrorResponse, ReservaState>({
    mutationKey: ["updateReservationState"],
    mutationFn: updateReservationState,
    onSuccess: (data: ConfirmResponse) => {
      setIsSuccess(true);
      setResultMessage("Voo confirmado com sucesso!");
      setShowResultModal(true);
      setTimeout(() => {
        closeModal();
        window.location.reload();
      }, 2000);
    },
    onError: (error: ErrorResponse) => {
      const backendMessage =
        error?.message?.message || "Erro ao confirmar voo. Por favor, tente novamente.";
      setIsSuccess(true);
      setResultMessage(backendMessage);
      setShowResultModal(true);
    },
  });

  const { form, loading, changeState, validation } = useForm({
    code: {
      invalid: false,
      errorLabel: "Digite o código da reserva",
      value: "",
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

  const handleResultModalClose = () => {
    setShowResultModal(false);
    if (isSuccess) {
      window.location.reload();
    }
  };

  return (
    <div className="modalConfirmBoarding">
      <span className="modalConfirmBoarding__description">
        Digite o código da reserva para confirmar o embarque no voo.
      </span>

      <InputText
        id="code"
        label={"Código da reserva"}
        placeholder="RES000"
        value={form.code.value}
        erroMsg={form.code.errorLabel}
        invalid={form.code.invalid}
        onChange={(e) => changeState("code", "value", e.target.value)}
      />
      <ButtonDefault children={"Confirmar embarque"} onClick={doConfirm} />

      <ResultModal
        open={showResultModal}
        isSuccess={isSuccess}
        isPending={loading}
        message={resultMessage}
        onClose={handleResultModalClose}
      />
    </div>
  );
};

export default ModalConfirmBoarding;
