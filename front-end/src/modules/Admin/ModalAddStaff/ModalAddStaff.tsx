import "./ModalAddStaff.scss";
import { FC } from "react";
import { useForm } from "@/hooks/useForm";
import { useModalCenter } from "@/components/Modal/ModalCenter/ModalCenter";
import InputCpf from "@/components/Inputs/InputCpf/InputCpf";
import InputText from "@/components/Inputs/InputText/InputText";
import InputPhone from "@/components/Inputs/InputPhone/InputPhone";
import ButtonDefault from "@/components/Buttons/ButtonDefault/ButtonDefault";
import { useMutation } from "@tanstack/react-query";
import { createEmployee } from "@/data/config/employee";

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

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["createEmployee"],
    mutationFn: createEmployee,
    onSuccess: (data: any) => {
      console.log("Funcionário criado com sucesso:", data);
      closeModal();
    },
    onError: (error: any) => {
      console.error("Erro ao criar funcionário:", error);
      const apiErrors = error?.response?.data?.errors;
      if (apiErrors) {
        apiErrors.forEach((err: any) => {
          const field = err.field;
          const message = err.defaultMessage;
          changeState(field, "invalid", true);
          changeState(field, "errorLabel", message);
        });
      }
    },
  });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validation()) return;
    await mutateAsync({ payload: { form } });
  };

  return (
    <div className="modalAddStaff">
      <span className="modalAddStaff__description">Preencha as informações abaixo para cadastrar o novo usuário.</span>
      <form onSubmit={onSubmit}>
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
        <ButtonDefault children={isPending ? "Carregando..." : "Adicionar funcionário"} type="submit" disabled={isPending || loading} />
      </form>
    </div>
  );
};

export default ModalAddStaff;
