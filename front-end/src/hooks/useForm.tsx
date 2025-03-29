"use client";

import { isValidCPF, isValidCNPJ } from "@/utils/validateCpfCnpj";
import { useEffect, useState } from "react";
import validator from "validator";

export type TFormField = {
  invalid: boolean;
  errorLabel: string;
  value: any;
  required?: boolean; // Add a required flag, default is true
};

export type TForm = {
  [key: string]: TFormField;
};

export const useForm = (initialForm: TForm, trigger?: any[]) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(() => initialForm);

  if (trigger && trigger.length) {
    useEffect(() => {
      setForm(() => initialForm);
    }, trigger);
  }

  const changeState = (input: string, field: keyof TFormField, value: any) => {
    if (field === "value") {
      setForm((prevValue) => ({
        ...prevValue,
        [input]: { ...prevValue[input], invalid: false },
      }));
    }
    setForm((prevValue) => ({
      ...prevValue,
      [input]: { ...prevValue[input], [field]: value },
    }));
  };

  const clearForm = () => {
    for (const input in form) {
      if (Object.prototype.hasOwnProperty.call(form, input)) {
        changeState(input, "value", "");
      }
    }
  };

  const validation = () => {
    let valid = true;
    for (const input in form) {
      if (Object.prototype.hasOwnProperty.call(form, input)) {
        const field = form[input].value;
        const isRequired = form[input].required ?? true; // Default to true if not set
        const validField = field && isRequired;

        if (!field && isRequired) {
          changeState(input, "invalid", true);
          changeState(input, "errorLabel", "Este campo não pode estar vazio");
          valid = false;
        }
        if (validField && input === "email") {
          if (!validator.isEmail(field)) {
            changeState(input, "invalid", true);
            changeState(input, "errorLabel", "E-mail inválido");
            valid = false;
          }
        }
        if (validField && input === "password") {
          if (!validator.isStrongPassword(field)) {
            changeState(input, "invalid", true);
            changeState("password", "errorLabel", "Inclua uma combinação de letras maiúsculas e minúsculas, números e caracteres especiais.");
            valid = false;
          }
        }
        if (validField && input === "passwordConfirm") {
          if (!validator.equals(form.password.value || "", field)) {
            changeState(input, "invalid", true);
            changeState(input, "errorLabel", "As senhas não são iguais.");
            valid = false;
          }
        }
        if (validField && Array.isArray(field)) {
          if (!field.length) {
            changeState(input, "invalid", true);
            changeState(input, "errorLabel", "Selecione ao menos uma opção");
            valid = false;
          }
        }
        if ((!!field || validField) && input === "cpf") {
          if (!isValidCPF(field)) {
            changeState(input, "invalid", true);
            changeState(input, "errorLabel", "CPF inválido.");
            valid = false;
          }
        }
        if ((!!field || validField) && input === "cnpj") {
          if (!isValidCNPJ(field)) {
            changeState(input, "invalid", true);
            changeState(input, "errorLabel", "CNPJ inválido.");
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

  return {
    form,
    loading,
    setLoading,
    changeState,
    validation,
    clearForm,
  };
};
