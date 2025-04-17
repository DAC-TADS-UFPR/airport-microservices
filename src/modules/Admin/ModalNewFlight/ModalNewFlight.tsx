import "./ModalNewFlight.scss";
import { FC } from "react";
import { useForm } from "@/hooks/useForm";
import { useModalCenter } from "@/components/Modal/ModalCenter/ModalCenter";
import formatToMoney from "@/utils/formatToMoney";
import InputText from "@/components/Inputs/InputText/InputText";
import InputDate from "@/components/Inputs/InputDate/InputDate";
import InputCurrency from "@/components/Inputs/InputCurrency/InputCurrency";
import ButtonDefault from "@/components/Buttons/ButtonDefault/ButtonDefault";

interface ModalNewFlightProps {
  data?: any;
}

const ModalNewFlight: FC<ModalNewFlightProps> = ({ data }) => {
  const { closeModal } = useModalCenter();

  const { form, loading, setLoading, changeState, validation } = useForm({
    date: {
      invalid: false,
      errorLabel: "Digite a data do voo.",
      value: "",
    },
    time: {
      invalid: false,
      errorLabel: "Digite o horário do voo.",
      value: "",
    },
    origin: {
      invalid: false,
      errorLabel: "Digite a origem do voo.",
      value: "",
    },
    destination: {
      invalid: false,
      errorLabel: "Digite o destino do voo.",
      value: "",
    },
    price: {
      invalid: false,
      errorLabel: "Digite o preço do voo.",
      value: formatToMoney(0) || "",
    },
    seatsTotal: {
      invalid: false,
      errorLabel: "Digite o número total de assentos do voo.",
      value: "",
    },
  });

  return (
    <div className="modalNewFlight">
      <span className="modalNewFlight__description">Preencha os campos para criar um novo voo.</span>
      <div className="modalNewFlight__grid">
        <InputDate
          id="date"
          label={"Data de embarque"}
          name="date"
          placeholder="dd/mm/yyyy"
          value={form.date.value}
          erroMsg={form.date.errorLabel}
          invalid={form.date.invalid}
          onChange={(e) => {
            changeState("date", "value", e.target.value);
          }}
        />
        <InputText
          id="time"
          label={"Horário de embarque"}
          placeholder="hh:mm"
          name="time"
          type="time"
          value={form.time.value}
          erroMsg={form.time.errorLabel}
          invalid={form.time.invalid}
          onChange={(e) => {
            changeState("time", "value", e.target.value);
          }}
        />
        <InputText
          id="origin"
          label={"Origem"}
          placeholder="Origem do voo"
          value={form.origin.value}
          erroMsg={form.origin.errorLabel}
          invalid={form.origin.invalid}
          onChange={(e) => {
            changeState("origin", "value", e.target.value);
          }}
        />
        <InputText
          id="destination"
          label={"Destino"}
          placeholder="Destino do voo"
          value={form.destination.value}
          erroMsg={form.destination.errorLabel}
          invalid={form.destination.invalid}
          onChange={(e) => {
            changeState("destination", "value", e.target.value);
          }}
        />
        <InputCurrency
          id="price"
          label={"Valor (R$)"}
          name="price"
          value={form.price.value}
          erroMsg={form.price.errorLabel}
          invalid={form.price.invalid}
          onChange={(e) => {
            changeState("price", "value", e.target.value);
          }}
        />
        <InputText
          id="seatsTotal"
          label={"Número total de assentos"}
          placeholder="0"
          type="number"
          value={form.seatsTotal.value}
          erroMsg={form.seatsTotal.errorLabel}
          invalid={form.seatsTotal.invalid}
          onChange={(e) => {
            changeState("seatsTotal", "value", e.target.value);
          }}
        />
        <ButtonDefault children={"Cancelar"} color="white" onClick={closeModal} />
        <ButtonDefault children={"Confirmar embarque"} onClick={closeModal} />
      </div>
    </div>
  );
};

export default ModalNewFlight;
