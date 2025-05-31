"use client";
import "./page.scss";
import { FormEvent } from "react";
import { useForm } from "@/hooks/useForm";
import { login } from "@/data/config/auth";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import MainDefault from "@/components/Main/Main";
import ImgDefault from "@/components/ImgDefault/ImgDefault";
import InputText from "@/components/Inputs/InputText/InputText";
import InputPassword from "@/components/Inputs/InputPassword/InputPassword";
import ButtonDefault from "@/components/Buttons/ButtonDefault/ButtonDefault";

export default function Page() {
  const router = useRouter();

  const { form, changeState, validation } = useForm({
    login: { invalid: false, errorLabel: "Digite seu usuário", value: "" },
    senha: { invalid: false, errorLabel: "Digite sua senha", value: "", required: false },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: (data: any) => {
      console.log(data);
      const { codigo, nome } = data.usuario;
      const tipo = data.tipo;
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("userId", codigo);
      localStorage.setItem("nome", nome);
      localStorage.setItem("tipo", tipo);

      if (tipo === "EMPLOYEE") {
        router.push(`/admin/${codigo}`);
      }
      if (tipo === "CLIENT") {
        router.push(`/user/${codigo}`);
      }
    },
    onError: (error: any) => {
      console.error("Error login:", error);
    },
  });

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validation()) return;
    mutateAsync({ payload: { form } });
  };

  return (
    <MainDefault id="login">
      <section className="login">
        <form className="login__container" onSubmit={onSubmit}>
          <ImgDefault className="login__logo" src={"/icons/logo.svg"} alt="Air TADS logo" />
          <h1 className="login__title">Bem-vindo!</h1>
          <p className="login__subtitle">Faça login para continuar</p>
          <InputText
            id="login"
            label="Login"
            name="login"
            type="login"
            placeholder="Username"
            value={form.login.value}
            erroMsg={form.login.errorLabel}
            invalid={form.login.invalid}
            onChange={(e) => changeState("login", "value", e.target.value)}
          />
          <InputPassword
            id="senha"
            label="Senha"
            name="senha"
            placeholder="****"
            value={form.senha.value}
            erroMsg={form.senha.errorLabel}
            invalid={form.senha.invalid}
            onChange={(e) => changeState("senha", "value", e.target.value)}
          />
          <ButtonDefault children={isPending ? "Carregando..." : "Login"} type="submit" disabled={isPending} />
        </form>
      </section>
    </MainDefault>
  );
}
