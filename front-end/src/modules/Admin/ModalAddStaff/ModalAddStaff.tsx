import "./ModalAddStaff.scss";
import { FC } from "react";
import { useForm } from "@/hooks/useForm";
import { useModalCenter } from "@/components/Modal/ModalCenter/ModalCenter";
import InputCpf from "@/components/Inputs/InputCpf/InputCpf";
import InputText from "@/components/Inputs/InputText/InputText";
import InputPhone from "@/components/Inputs/InputPhone/InputPhone";
import ButtonDefault from "@/components/Buttons/ButtonDefault/ButtonDefault";

interface ModalAddStaffProps {
  data?: any;
}

const ModalAddStaff: FC<ModalAddStaffProps> = ({ data }) => {
  const { closeModal } = useModalCenter();

  const { form, loading, setLoading, changeState, validation } = useForm({
    name: { invalid: false, errorLabel: "Digite seu nome", value: "" },
    email: { invalid: false, errorLabel: "Digite seu e-mail", value: "" },
    cpf: { invalid: false, errorLabel: "Digite seu CPF", value: "" },
    phone: { invalid: false, errorLabel: "Digite seu telefone", value: "" },
  });

  return (
    <div className="modalAddStaff">
      <span className="modalAddStaff__description">Digite o código de reserva para confirmar o embarque no voo.</span>
      <form>
        <InputText
          disabled={loading}
          id="name"
          label="Nome"
          name="name"
          type="text"
          value={form.name.value}
          erroMsg={form.name.errorLabel}
          invalid={form.name.invalid}
          onChange={(e) => changeState("name", "value", e.target.value)}
        />
        <InputText
          disabled={loading}
          id="email"
          label="E-mail"
          name="email"
          type="email"
          value={form.email.value}
          erroMsg={form.email.errorLabel}
          invalid={form.email.invalid}
          onChange={(e) => changeState("email", "value", e.target.value)}
        />
        <InputCpf
          disabled={loading}
          id="cpf"
          label="CPF"
          name="cpf"
          type="text"
          value={form.cpf.value}
          erroMsg={form.cpf.errorLabel}
          invalid={form.cpf.invalid}
          onChange={(e) => changeState("cpf", "value", e.target.value)}
        />
        <InputPhone
          id="phone"
          label="Telefone*"
          name="phone"
          erroMsg={form.phone.errorLabel}
          value={form.phone.value}
          invalid={form.phone.invalid}
          onChange={(e) => changeState("phone", "value", e.target.value)}
        />
        <ButtonDefault children={"Adicionar membro"} onClick={closeModal} />
      </form>
    </div>
  );
};

export default ModalAddStaff;
