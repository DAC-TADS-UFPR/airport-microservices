"use client";
import "./page.scss";
import { FormEvent } from "react";
import { useForm } from "@/hooks/useForm";
import { useMutation } from "@tanstack/react-query";
import { createUser } from "@/data/config/user";
import MainDefault from "@/components/Main/Main";
import ImgDefault from "@/components/ImgDefault/ImgDefault";
import InputCpf from "@/components/Inputs/InputCpf/InputCpf";
import InputText from "@/components/Inputs/InputText/InputText";
import InputMasks from "@/components/Inputs/InputMasks/InputMasks";
import ButtonDefault from "@/components/Buttons/ButtonDefault/ButtonDefault";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const { form, loading, setLoading, changeState, validation } = useForm({
    name: { invalid: false, errorLabel: "Digite seu nome", value: "" },
    email: { invalid: false, errorLabel: "Digite seu e-mail", value: "" },
    cpf: { invalid: false, errorLabel: "Digite seu CPF", value: "" },
    cep: { invalid: false, errorLabel: "Digite seu CEP", value: "" },
    street: { invalid: false, errorLabel: "Digite seu endereço", value: "" },
    number: { invalid: false, errorLabel: "Digite o número", value: "" },
    complement: {
      invalid: false,
      errorLabel: "Digite o complemento",
      value: "",
    },
    neighborhood: { invalid: false, errorLabel: "Digite o bairro", value: "" },
    city: { invalid: false, errorLabel: "Digite a cidade", value: "" },
    state: { invalid: false, errorLabel: "Digite o estado", value: "" },
  });

  const searchCep = async (value: string) => {
    const cep = value.replace(/\D/g, "");
    if (cep.length === 8) {
      setLoading(true);
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        if (data.erro) {
          console.error("CEP não encontrado");
          changeState("street", "value", "");
          changeState("neighborhood", "value", "");
          changeState("city", "value", "");
          changeState("state", "value", "");
          changeState("cep", "invalid", true);
          changeState("cep", "errorLabel", "CEP não encontrado");
        } else {
          changeState("street", "value", data.logradouro || "");
          changeState("neighborhood", "value", data.bairro || "");
          changeState("city", "value", data.localidade || "");
          changeState("state", "value", data.uf || "");
        }
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  interface CreateUserResponse {
    message: string;
  }

  const { mutateAsync, isPending } = useMutation<CreateUserResponse, Error, { payload: { form: typeof form; password: string } }>({
    mutationKey: ["createUser"],
    mutationFn: createUser,
    onSuccess: (data: CreateUserResponse) => {
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

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validation()) return;
    const senha = gerarSenha();

    await mutateAsync({ payload: { form, password: senha } });

    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email.value,
          password: senha,
        }),
      });

      const emailData = await response.json();
      if (response.ok) {
        console.log("E-mail enviado com sucesso:", emailData.message);
      } else {
        console.error("Erro ao enviar o e-mail:", emailData.error);
      }
    } catch (error) {
      console.error("Erro ao enviar o e-mail:", error);
    }

    router.push("/");
  };

  const gerarSenha = (): string => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

  return (
    <MainDefault id="register">
      <section className="register">
        <form className="register__container" onSubmit={onSubmit}>
          <ImgDefault className="register__logo" src={"/icons/logo.svg"} alt="Air TADS logo" />
          <h1 className="register__title">Criar Conta</h1>
          <p className="login__subtitle">Junte-se à AirTADS para uma experiência de voo perfeita!</p>
          <div className="register__grid">
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

            <InputMasks
              id="cep"
              version="cep"
              name="cep"
              disabled={loading}
              label="CEP"
              value={form.cep.value}
              invalid={form.cep.invalid}
              erroMsg={form.cep.errorLabel}
              onChange={(e) => {
                changeState("cep", "value", e.target.value);
                searchCep(e.target.value);
              }}
            />
            <InputText
              disabled
              id="street"
              label="Endereço"
              name="street"
              type="text"
              value={form.street.value}
              erroMsg={form.street.errorLabel}
              invalid={form.street.invalid}
              onChange={(e) => changeState("street", "value", e.target.value)}
            />
            <InputText
              disabled={loading}
              id="number"
              label="Número"
              name="number"
              type="text"
              value={form.number.value}
              erroMsg={form.number.errorLabel}
              invalid={form.number.invalid}
              onChange={(e) => changeState("number", "value", e.target.value)}
            />
            <InputText
              disabled={loading}
              id="complement"
              label="Complemento"
              name="complement"
              type="text"
              value={form.complement.value}
              erroMsg={form.complement.errorLabel}
              invalid={form.complement.invalid}
              onChange={(e) => changeState("complement", "value", e.target.value)}
            />
            <InputText
              disabled
              id="neighborhood"
              label="Bairro"
              name="neighborhood"
              type="text"
              value={form.neighborhood.value}
              erroMsg={form.neighborhood.errorLabel}
              invalid={form.neighborhood.invalid}
              onChange={(e) => changeState("neighborhood", "value", e.target.value)}
            />
            <InputText
              disabled
              id="city"
              label="Cidade"
              name="city"
              type="text"
              value={form.city.value}
              erroMsg={form.city.errorLabel}
              invalid={form.city.invalid}
              onChange={(e) => changeState("city", "value", e.target.value)}
            />
            <InputText
              disabled
              id="state"
              label="Estado"
              name="state"
              type="text"
              value={form.state.value}
              erroMsg={form.state.errorLabel}
              invalid={form.state.invalid}
              onChange={(e) => changeState("state", "value", e.target.value)}
            />
          </div>
          <ButtonDefault children={isPending ? "Carregando..." : "Criar Conta"} type="submit" disabled={loading || isPending} />
        </form>
      </section>
    </MainDefault>
  );
}
