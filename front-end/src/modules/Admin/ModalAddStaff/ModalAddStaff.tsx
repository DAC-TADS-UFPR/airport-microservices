import "./ModalAddStaff.scss";
import { FC } from "react";
import { useForm } from "@/hooks/useForm";
import { useMutation } from "@tanstack/react-query";
import { invalidateCache } from "@/utils/invalidateCache";
import { createEmployee, updateEmployee } from "@/data/config/employee";
import { useModalCenter } from "@/components/Modal/ModalCenter/ModalCenter";
import InputCpf from "@/components/Inputs/InputCpf/InputCpf";
import InputText from "@/components/Inputs/InputText/InputText";
import InputPhone from "@/components/Inputs/InputPhone/InputPhone";
import ButtonDefault from "@/components/Buttons/ButtonDefault/ButtonDefault";
import { se } from "date-fns/locale";

interface ModalAddStaffProps {
  data?: any;
}

const ModalAddStaff: FC<ModalAddStaffProps> = ({ data }) => {
  const { closeModal } = useModalCenter();

  const { form, loading, setLoading, changeState, validation } = useForm({
    name: { invalid: false, errorLabel: "Digite seu nome", value: data?.nome || "" },
    email: { invalid: false, errorLabel: "Digite seu e-mail", value: data?.email || "" },
    cpf: { invalid: false, errorLabel: "Digite seu CPF", value: data?.cpf || "" },
    phone: { invalid: false, errorLabel: "Digite seu telefone", value: data?.telefone || "" },
    senha: { invalid: false, errorLabel: "Digite sua senha", value: "" },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["createEmployee"],
    mutationFn: !!data?.cpf ? updateEmployee : createEmployee,
    onSuccess: (data: any) => {
      setLoading(false);
      invalidateCache(`staffMembers`);
      console.log("Funcionário criado com sucesso:", data);
      closeModal();
    },
    onError: (error: any) => {
      setLoading(false);
      const apiErrors = error?.response?.data?.errors;
      if (apiErrors) {
        apiErrors.forEach((err: any) => {
          const field = err.field;
          const message = err.message;
          changeState(field, "invalid", true);
          changeState(field, "errorLabel", message);
        });
      }
    },
  });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validation()) return;
    setLoading(true);
    const payload = {
      nome: form.name.value,
      email: form.email.value,
      cpf: form.cpf.value,
      telefone: form.phone.value,
      senha: form.senha.value,
      ...(data?.cpf && { codigo: data.codigo }),
    };
    await mutateAsync({ payload });
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
        <InputText
          disabled={loading}
          id="senha"
          label="Senha"
          name="senha"
          type="password"
          value={form.senha.value}
          erroMsg={form.senha.errorLabel}
          invalid={form.senha.invalid}
          onChange={(e) => changeState("senha", "value", e.target.value)}
        />
        <ButtonDefault children={isPending ? "Carregando..." : "Adicionar funcionário"} type="submit" disabled={isPending || loading} />
      </form>
    </div>
  );
};

export default ModalAddStaff;
