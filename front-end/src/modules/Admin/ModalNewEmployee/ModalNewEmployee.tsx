import "./ModalNewEmployee.scss";
import { FC } from "react";
import { useForm } from "@/hooks/useForm";
import { useModalCenter } from "@/components/Modal/ModalCenter/ModalCenter";
import formatToMoney from "@/utils/formatToMoney";
import InputText from "@/components/Inputs/InputText/InputText";
import InputDate from "@/components/Inputs/InputDate/InputDate";
import InputCurrency from "@/components/Inputs/InputCurrency/InputCurrency";
import ButtonDefault from "@/components/Buttons/ButtonDefault/ButtonDefault";

interface ModalNewEmployeeProps {
  data?: any;
}

const ModalNewEmployee: FC<ModalNewEmployeeProps> = ({ data }) => {
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
    <div className="modalNewEmployee">
      <span className="modalNewEmployee__description">Preencha os campos para cadastrar um novo funcionário.</span>
      <div className="modalNewEmployee__grid">
        <InputText
          id="nome"
          label={"Nome do Funcionário"}
          name="text"
          placeholder="Nome do Funcionario"
          onChange={(e) => {
            changeState("text", "value", e.target.value);
          }}
        />
        <InputText
          id="CPF"
          label={"CPF"}
          placeholder="000.000.000-00"
          name="CPF"
          type="text"
          onChange={(e) => {
            changeState("text", "value", e.target.value);
          }}
        />
        <InputText
          id="email"
          label={"Email"}
          placeholder="nome.funcionario@gmail.com"
          onChange={(e) => {
            changeState("text", "value", e.target.value);
          }}
        />
        <InputText
          id="telefone"
          label={"Telefone"}
          placeholder="(DDD) 90000-0000"
          onChange={(e) => {
            changeState("text", "value", e.target.value);
          }}
        />
        <ButtonDefault children={"Cancelar"} color="white" onClick={closeModal} />
        <ButtonDefault children={"Cadastrar funcionário"} onClick={closeModal} />
      </div>
    </div>
  );
};

export default ModalNewEmployee;
