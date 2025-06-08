import "./ModalNewFlight.scss";
import { FC, useState } from "react";
import { useForm } from "@/hooks/useForm";
import { useModalCenter } from "@/components/Modal/ModalCenter/ModalCenter";
import formatToMoney from "@/utils/formatToMoney";
import InputText from "@/components/Inputs/InputText/InputText";
import InputDate from "@/components/Inputs/InputDate/InputDate";
import InputCurrency from "@/components/Inputs/InputCurrency/InputCurrency";
import ButtonDefault from "@/components/Buttons/ButtonDefault/ButtonDefault";
import { useMutation } from "@tanstack/react-query";
import { createFlight } from "@/data/config/flight";
import router from "next/router";
import ResultModal from "../../ResultModal/ResultModal";

interface ModalNewFlightProps {
  data?: any;
}
interface CreateFlightResponse {
  message: string;
}

const ModalNewFlight: FC<ModalNewFlightProps> = ({ data }) => {
  const { closeModal } = useModalCenter();

  const [showResultModal, setShowResultModal] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const { form, loading, setLoading, changeState, validation } = useForm({
    data_voo: {
      invalid: false,
      errorLabel: "Digite a data do voo.",
      value: "",
    },
    hora: {
      invalid: false,
      errorLabel: "Digite o horário do voo.",
      value: "",
    },
    origem: {
      invalid: false,
      errorLabel: "Digite a origem do voo.",
      value: "",
    },
    destino: {
      invalid: false,
      errorLabel: "Digite o destino do voo.",
      value: "",
    },
    valor_passagem: {
      invalid: false,
      errorLabel: "Digite o preço do voo.",
      value: formatToMoney(0) || "",
    },
    poltronas: {
      invalid: false,
      errorLabel: "Digite o número total de assentos do voo.",
      value: "",
    },
  });

  const { mutateAsync, isPending } = useMutation<CreateFlightResponse, Error, { payload: { form: typeof form } }>({
    mutationKey: ["createFlight"],
    mutationFn: createFlight,
    onSuccess: (data: CreateFlightResponse) => {
      setIsSuccess(true);
      setResultMessage("Voo criado com sucesso!");
      setShowResultModal(true);
      setTimeout(() => {
        closeModal();
        window.location.reload();
      }, 2000);
    },
    onError: (error: any) => {
      console.error("Error creating flight", error);
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
      await mutateAsync({ payload: { form } });
    } catch (error) {
      console.error("Error creating flight:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modalNewFlight">
      <span className="modalNewFlight__description">
        Preencha os campos para criar um novo voo.
      </span>
      <div className="modalNewFlight__grid">
        <InputDate
          id="date"
          label="Data de embarque"
          name="data_voo"
          placeholder="dd/mm/yyyy"
          value={form.data_voo.value}
          erroMsg={form.data_voo.errorLabel}
          invalid={form.data_voo.invalid}
          onChange={(e) => changeState("data_voo", "value", e.target.value)}
        />
        <InputText
          id="time"
          label="Horário de embarque"
          placeholder="hh:mm"
          name="hora"
          type="time"
          value={form.hora.value}
          erroMsg={form.hora.errorLabel}
          invalid={form.hora.invalid}
          onChange={(e) => changeState("hora", "value", e.target.value)}
        />
        <InputText
          id="origin"
          label="Origem"
          placeholder="Origem do voo"
          value={form.origem.value}
          erroMsg={form.origem.errorLabel}
          invalid={form.origem.invalid}
          onChange={(e) => changeState("origem", "value", e.target.value)}
        />
        <InputText
          id="destination"
          label="Destino"
          placeholder="Destino do voo"
          value={form.destino.value}
          erroMsg={form.destino.errorLabel}
          invalid={form.destino.invalid}
          onChange={(e) => changeState("destino", "value", e.target.value)}
        />
        <InputCurrency
          id="price"
          label="Valor (R$)"
          name="valor_passagem"
          value={form.valor_passagem.value}
          erroMsg={form.valor_passagem.errorLabel}
          invalid={form.valor_passagem.invalid}
          onChange={(e) => changeState("valor_passagem", "value", e.target.value)}
        />
        <InputText
          id="seatsTotal"
          label="Número total de assentos"
          placeholder="0"
          type="text"
          value={form.poltronas.value}
          erroMsg={form.poltronas.errorLabel}
          invalid={form.poltronas.invalid}
          onChange={(e) => changeState("poltronas", "value", e.target.value)}
        />
        <ButtonDefault children="Cancelar" color="white" onClick={closeModal} disabled={loading} />
        <ButtonDefault children="Confirmar voo" onClick={onSubmit} disabled={isPending || loading} />
      </div>

      <ResultModal
        open={showResultModal}
        isSuccess={isSuccess}
        isPending={isPending}
        message={resultMessage}
        onClose={() => setShowResultModal(false)}
      />
    </div>
  );
};

export default ModalNewFlight;
