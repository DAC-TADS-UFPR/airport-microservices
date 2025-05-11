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
    email: { invalid: false, errorLabel: "Digite seu e-mail", value: "" },
    password: { invalid: false, errorLabel: "Digite sua senha", value: "", required: false },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: (data: any) => {
      console.log("Login success:", data);
      const { userId } = data.user;
      const userType = data.userType;
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("userId", userId);
      localStorage.setItem("userType", userType);

      console.log(data.accessToken, userId, userType);

      if (userType === "EMPLOYEE") {
        router.push(`/admin/${userId}`);
      }
      if (userType === "CLIENT") {
        router.push(`/user/${userId}`);
      }
    },
    onError: (error: any) => {
      console.error("Error login:", error);
      const apiErrors = error?.response?.data?.errors;
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
            id="email"
            label="E-mail"
            name="email"
            type="email"
            placeholder="email@exemplo.com"
            value={form.email.value}
            erroMsg={form.email.errorLabel}
            invalid={form.email.invalid}
            onChange={(e) => changeState("email", "value", e.target.value)}
          />
          <InputPassword
            id="password"
            label="Senha"
            name="password"
            placeholder="****"
            value={form.password.value}
            erroMsg={form.password.errorLabel}
            invalid={form.password.invalid}
            onChange={(e) => changeState("password", "value", e.target.value)}
          />
          <ButtonDefault children={isPending ? "Carregando..." : "Login"} type="submit" disabled={isPending} />
        </form>
      </section>
    </MainDefault>
  );
}
