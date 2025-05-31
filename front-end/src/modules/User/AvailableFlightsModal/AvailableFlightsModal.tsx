import ButtonDefault from "@/components/Buttons/ButtonDefault/ButtonDefault";
import ImgDefault from "@/components/ImgDefault/ImgDefault";
import "./AvailableFlightsModal.scss";
import { FC, useState } from "react";
import { useModal } from "@/components/Provider/ModalProvider/ModalProvider";
import AvailableFlights from "../AvailableFlights/AvailableFlights"; // i
import { useRouter } from "next/navigation";
import { IReserva } from "@/models/reserva.create";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createReservation } from "@/data/config/reservation";
import router from "next/router";

type Flight = {
   codigo: string;
  aeroporto_origem: {
    codigo: string;
    nome: string;
    cidade: string;
    uf: string;
  };
  aeroporto_destino: {
    codigo: string;
    nome: string;
    cidade: string;
    uf: string;
  };
  data: string;
  horaSaida: string;
  valor_passagem: number;
};

interface AvailableFlightsModalProps {
  data: Flight;
  onClose: () => void;
}
interface CreateReservationResponse {
  message: string;
}

const gerarCodigoReserva = () => {
  const letras = Array.from({ length: 3 }, () =>
    String.fromCharCode(65 + Math.floor(Math.random() * 26))
  ).join("");
  const numeros = Math.floor(100 + Math.random() * 900);
  return `${letras}${numeros}`;
};

const AvailableFlightsModal: FC<AvailableFlightsModalProps> = ({
  data,
  onClose,
}) => {
  const [quantidade, setQuantidade] = useState(1);
  const [milhasSaldo, setMilhasSaldo] = useState(1000);
  const [milhasUsadas, setMilhasUsadas] = useState(0);
  const milhasPorAssento = data.valor_passagem * 0.2;
  const totalMilhas = milhasPorAssento * quantidade;
  const valorTotal = data.valor_passagem * quantidade;
  const valorComMilhas = Math.max(0, valorTotal - milhasUsadas / 0.2);

  const { mutateAsync, isPending } = useMutation<CreateReservationResponse, Error, IReserva>({
    mutationKey: ["createReservation"],
    mutationFn: createReservation,
    onSuccess: (data: CreateReservationResponse) => {
      console.log("User created successfully", data);
      router.push("/");
    },
    onError: (error: any) => {
      console.error("Error creating user", error);
      const apiErrors = error?.response?.data?.errors;
      if (Array.isArray(apiErrors)) {
        apiErrors.forEach((err: { field: string; message: string }) => {
        });
      }
    },
  });

  const confirmarCompra = async () => {
    const novaReserva : IReserva = {
      codigo_voo: data.codigo,
      quantidade_poltronas:quantidade,
      milhas_utilizadas:milhasUsadas,
      valor: valorComMilhas,
      codigo_aeroporto_origem: data.aeroporto_origem.codigo,
      codigo_aeroporto_destino: data.aeroporto_destino.codigo,
    };
    await mutateAsync({ ...novaReserva });
    setMilhasSaldo((prev) => prev - milhasUsadas);
    onClose();
  };

  return (
    <div className="availableFlightsModal">
      <h2 className="availableFlightsModal__title">Detalhes do Voo</h2>

      <div className="availableFlightsModal__section">
        <p>
          <strong>Origem:</strong> {data.aeroporto_origem?.codigo}
        </p>
        <p>
          <strong>Destino:</strong> {data.aeroporto_destino?.codigo}
        </p>
        <p>
          <strong>Data:</strong> {`${new Date(data.data).toLocaleDateString("pt-BR", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}`}
        </p>
        <p>
          <strong>Hora Saída:</strong> {`${new Date(data.data).toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })} - 2h`}
        </p>
        <p>
          <strong>Preço Unitário:</strong> R$ {data.valor_passagem.toFixed(2)}
        </p>
        <p>
          <strong>Saldo de Milhas:</strong> {milhasSaldo}
        </p>
      </div>

      <div className="availableFlightsModal__section">
        <label className="availableFlightsModal__inputlabel">
          <p><strong>Quantidade de passagens:</strong></p>
          <input
            type="number"
            value={quantidade}
            min={1}
            onChange={(e) => setQuantidade(Number(e.target.value))}
          />
        </label>

        <label className="availableFlightsModal__label">
          <p>
            <strong>Milhas necessárias:</strong> {totalMilhas}
          </p>
        </label>

        <label className="availableFlightsModal__inputlabel">
          Milhas a usar:
          <input
            type="number"
            value={milhasUsadas}
            min={0}
            max={milhasSaldo}
            onChange={(e) => setMilhasUsadas(Number(e.target.value))}
          />
        </label>

        <p>
          <strong>Valor a pagar:</strong> R$ {valorComMilhas.toFixed(2)}
        </p>

        <div className="availableFlightsModal__buttons">
          <ButtonDefault onClick={confirmarCompra}>
            Confirmar Compra
          </ButtonDefault>
          <ButtonDefault color="red" onClick={onClose}>
            Cancelar
          </ButtonDefault>
        </div>
      </div>
    </div>
  );
};

export default AvailableFlightsModal;
