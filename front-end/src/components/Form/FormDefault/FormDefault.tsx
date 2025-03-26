"use client";
import "./FormDefault.scss";
import { FC, useState } from "react";
import validator from "validator";
import { sendForm } from "@/data/config/api";
import InputForm from "../components/Inputs/InputForm/InputForm";
import InputPhone from "../components/Inputs/InputPhone/InputPhone";
import InputSelect from "../components/Inputs/InputSelect/InputSelect";
import ButtonSubmit from "@/components/Buttons/ButtonSubmit/ButtonSubmit";
import TextareaForm from "../components/Inputs/TextareaForm/TextareaForm";
import CheckBoxDefault from "../components/Inputs/CheckBoxDefault/CheckBoxDefault";

interface FormDefaultProps {
  data: any;
  submitText?: string;
}

const FormDefault: FC<FormDefaultProps> = ({ data, submitText = "Enviar" }) => {
  const [loading, setLoading] = useState(false);
  const [envio, setEnvio] = useState({ success: false, msg: "" });
  const [form, setForm] = useState(() => ({
    services: { invalid: false, errorLabel: "Escolha uma opção", value: "" },
    client: { invalid: false, errorLabel: "Digite seu nome", value: "" },
    phone: { invalid: false, errorLabel: "Digite seu telefone", value: "" },
    email: { invalid: false, errorLabel: "Digite seu e-mail", value: "" },
    mensagem: { invalid: false, errorLabel: "Digite uma mensagem", value: "" },
    accept: { invalid: false, errorLabel: "Aceite os termos", value: "" },
  }));

  const changeState = (
    input: string,
    field: string,
    value: string | boolean
  ) => {
    if (field === "value") {
      setForm((prevValue: any) => ({
        ...prevValue,
        [input]: { ...prevValue[input], invalid: false },
      }));
    }
    setForm((prevValue: any) => ({
      ...prevValue,
      [input]: { ...prevValue[input], [field]: value },
    }));
  };

  const validation = () => {
    let valid = true;
    for (const input in form) {
      if (Object.prototype.hasOwnProperty.call(form, input)) {
        const field = form[input as keyof typeof form].value;
        if (input === "accept" && !field) {
          changeState(input, "invalid", true);
          changeState(input, "errorLabel", "Você deve aceitar os termos");
          valid = false;
        } else if (!field) {
          changeState(input, "invalid", true);
          changeState(input, "errorLabel", "Este campo não pode estar vazio");
          valid = false;
        }
        if (field && input === "email") {
          if (!validator.isEmail(field)) {
            changeState(input, "invalid", true);
            changeState(input, "errorLabel", "E-mail inválido");
            valid = false;
          }
        }
      }
    }
    if (!valid) {
      setLoading(false);
    }
    return valid;
  };

  const postForm = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const isValid = validation();
    if (!isValid) return;
    const mail = new FormData();
    mail.append("_wpcf7_unit_tag", data.form);
    mail.append("services", form?.services.value);
    mail.append("client", form?.client.value);
    mail.append("email", form?.email.value);
    mail.append("phone", form?.phone.value);
    mail.append("email", form?.email.value);
    mail.append("mensagem", form?.mensagem.value);
    mail.append("accept", form?.accept.value ? "true" : "false");
    try {
      const resp: any = await sendForm(mail, data.form);
      if (resp?.invalid_fields?.length) {
        setEnvio({
          success: false,
          msg: "Ocorreu um erro verifique seus campos e tente novamente.",
        });
        resp?.invalid_fields.forEach((input: any) => {
          console.log(input.field);
        });
        return;
      }
      setEnvio({ success: true, msg: resp.message });
      clear();
    } catch (error) {
      console.log(error);
      setEnvio({
        success: false,
        msg: "Ocorreu um erro verifique seus campos e tente novamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    for (const input in form) {
      if (Object.prototype.hasOwnProperty.call(form, input)) {
        changeState(input, "value", "");
      }
    }
  };

  return (
    <div className="formDefault">
      <form className="formDefault__content" onSubmit={postForm}>
        <InputForm
          id="client"
          label="Nome*"
          name="client"
          type="client"
          value={form.client.value}
          erroMsg={form.client.errorLabel}
          invalid={form.client.invalid}
          onChange={(e) => changeState("client", "value", e.target.value)}
        />
        <InputForm
          id="email"
          label="E-mail*"
          name="email"
          type="text"
          value={form.email.value}
          erroMsg={form.email.errorLabel}
          invalid={form.email.invalid}
          onChange={(e) => changeState("email", "value", e.target.value)}
        />
        <InputPhone
          id="phone"
          label="Telefone*"
          name="phone"
          type="phone"
          value={form.phone.value}
          erroMsg={form.phone.errorLabel}
          invalid={form.phone.invalid}
          onChange={(e) => changeState("phone", "value", e.target.value)}
        />
        <InputSelect
          id="services"
          label="Setor*"
          name="services"
          value={form.services.value}
          erroMsg={form.services.errorLabel}
          invalid={form.services.invalid}
          onChange={(e) => changeState("services", "value", e.target.value)}
          optionsSelect={["Selecao 1", "Selecao 2", "Selecao 3"]}
        />
        <TextareaForm
          label="Mensagem"
          id="mensagem"
          value={form.mensagem.value}
          erroMsg={form.mensagem.errorLabel}
          invalid={form.mensagem.invalid}
          onChange={(e: any) =>
            changeState("mensagem", "value", e.target.value)
          }
        />

        <div className="formDefault-buttonContainer">
          <CheckBoxDefault
            id="accept"
            label={data?.term_accept || "Termos de uso"}
            name="accept"
            type="checkbox"
            value={form.accept.value.toString()}
            erroMsg={form.accept.errorLabel}
            invalid={form.accept.invalid}
            onChange={(e) => changeState("accept", "value", e.target.checked)}
          />
          <ButtonSubmit type="submit">
            {loading ? "Aguarde..." : submitText}
          </ButtonSubmit>
        </div>
      </form>
      <div className="formDefault__resp">
        <p
          className={
            envio.success ? "formResponseSuccess" : "formResponseError"
          }
        >
          {envio.msg}
        </p>
      </div>
    </div>
  );
};

export default FormDefault;
