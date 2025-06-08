import "./ModalNewEmployee.scss";
import { FC } from "react";
import { useForm } from "@/hooks/useForm";
import { useModalCenter } from "@/components/Modal/ModalCenter/ModalCenter";
import InputText from "@/components/Inputs/InputText/InputText";
import ButtonDefault from "@/components/Buttons/ButtonDefault/ButtonDefault";
import { useMutation } from "@tanstack/react-query";
import { createEmployee } from "@/data/config/employee";

interface ModalNewEmployeeProps {
  data?: any;
}

const ModalNewEmployee: FC<ModalNewEmployeeProps> = ({ data }) => {
  const { closeModal } = useModalCenter();

  const { form, loading, setLoading, changeState, validation } = useForm({
    name: {
      invalid: false,
      errorLabel: "Digite o nome do funcionário.",
      value: "",
    },
    cpf: {
      invalid: false,
      errorLabel: "Digite o CPF do funcionário.",
      value: "",
    },
    email: {
      invalid: false,
      errorLabel: "Digite o email do funcionário.",
      value: "",
    },
    phone: {
      invalid: false,
      errorLabel: "Digite o telefone do funcionário.",
      value: "",
    },
    senha: {
      invalid: false,
      errorLabel: "Digite a senha do funcionário.",
      value: "",
    }
  });

  const { mutateAsync } = useMutation({
    mutationKey: ["createEmployee"],
    mutationFn: createEmployee,
    onSuccess: (data) => {      
      closeModal();
    },
    onError: (error: any) => {
      console.error("Error creating employee:", error);
    }
  });

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (validation()) return; 
      const data = {
        name: form.name.value,
        cpf: form.cpf.value,
        email: form.email.value,
        phone: form.phone.value,
      };
      await mutateAsync({data});
    } catch (error) {
      console.error("Error creating employee:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modalNewEmployee">
      <span className="modalNewEmployee__description">
        Preencha os campos para cadastrar um novo funcionário.
      </span>
      
      <div className="modalNewEmployee__grid">
        <InputText
          id="name"
          label="Nome do Funcionário"
          name="name"
          placeholder="Nome do Funcionario"
          value={form.name.value}
          erroMsg={form.name.errorLabel}
          onChange={(e) => changeState("name", "value", e.target.value)}
        />
        
        <InputText
          id="cpf"
          label="CPF"
          name="cpf"
          placeholder="000.000.000-00"
          value={form.cpf.value}
          erroMsg={form.cpf.errorLabel}
          onChange={(e) => changeState("cpf", "value", e.target.value.replace(/\D/g, ''))}
        />
        
        <InputText
          id="email"
          label="Email"
          name="email"
          placeholder="nome.funcionario@gmail.com"
          value={form.email.value}
          erroMsg={form.email.errorLabel}
          onChange={(e) => changeState("email", "value", e.target.value)}
        />
        
        <InputText
          id="phone"
          label="Telefone"
          name="phone"
          placeholder="(DDD) 90000-0000"
          value={form.phone.value}
          erroMsg={form.phone.errorLabel}
          onChange={(e) => changeState("phone", "value", e.target.value)}
        />
        
        <InputText
          id="senha"
          label="Senha"
          name="senha"
          type="password"
          placeholder="Senha do Funcionário"
          value={form.senha.value}
          erroMsg={form.senha.errorLabel}
          onChange={(e) => changeState("senha", "value", e.target.value)}
        />

        <div className="modalNewEmployee__buttons">
          <ButtonDefault 
            color="white" 
            onClick={closeModal}
            disabled={loading}
          >
            Cancelar
          </ButtonDefault>
          
          <ButtonDefault 
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Cadastrando...' : 'Cadastrar funcionário'}
          </ButtonDefault>
        </div>
      </div>
    </div>
  );
};

export default ModalNewEmployee;
