import "./ModalAddMiles.scss";
import { FC } from "react";
import { useForm } from "@/hooks/useForm";
import { useModalCenter } from "@/components/Modal/ModalCenter/ModalCenter";
import InputCurrency from "@/components/Inputs/InputCurrency/InputCurrency";
import ButtonDefault from "@/components/Buttons/ButtonDefault/ButtonDefault";
import formatToMoney from "@/utils/formatToMoney";
import formatFloat from "@/utils/formatFloat";
import { useMutation } from "@tanstack/react-query";
import { buyMiles } from "@/data/config/client";
import router from "next/router";
interface ModalAddMilesProps {
  data?: any;
}

interface CreateMilesResponse {
    message: string;
}

const ModalAddMiles: FC<ModalAddMilesProps> = ({ data }) => {
  const { closeModal } = useModalCenter();

   const { mutateAsync, isPending } = useMutation<CreateMilesResponse, Error, { payload: { form: typeof form;} }>({
    mutationKey: ["buyMiles"],
    mutationFn: buyMiles,
    onSuccess: (data: CreateMilesResponse) => {
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

  const onSubmit = async () => {
    if (!validation()) return;
    setLoading(true);
    try {
      await mutateAsync({ payload: { form } });
      closeModal();
    } catch (error) {
      console.error("Error creating flight:", error);
    } finally {
      setLoading(false);
    }
  };

  const { form, loading, setLoading, changeState, validation } = useForm({
    currency: {
      invalid: false,
      errorLabel: "Digite o valor da movimentação",
      value: formatToMoney(0) || "",
    },
    miles: {
      invalid: false,
      errorLabel: "Digite o valor da movimentação",
      value: "",
    },
  });

  return (
    <div className="modalAddMiles">
      <InputCurrency
        id="currency"
        label={"Valor (R$)"}
        name="currency"
        value={form.currency.value}
        erroMsg={form.currency.errorLabel}
        invalid={form.currency.invalid}
        onChange={(e) => {
          const value = e.target.value.replace('.', '').replace(',', '.');
          changeState("currency", "value", value);
          console.log(value);
          form.miles.value = formatFloat(value * 0.2);
        }}
      />
      <div className="modalAddMiles__row">
        <span className="modalAddMiles__row--title">Milhas:</span>
        <span className="modalAddMiles__row--value">{formatFloat(form.currency.value * 0.2)}</span>
      </div>

      <ButtonDefault children={"Comprar milhas"} onClick={onSubmit} />
    </div>
  );
};

export default ModalAddMiles;
