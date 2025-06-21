"use client";
import ButtonDefault from "@/components/Buttons/ButtonDefault/ButtonDefault";
import "./AvailableFlightsModal.scss";
import { FC, useState } from "react";
import { useModal } from "@/components/Provider/ModalProvider/ModalProvider";
import AvailableFlights from "../AvailableFlights/AvailableFlights"; // i
import { useRouter } from "next/navigation";
import { IReserva } from "@/models/reserva.create";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createReservation } from "@/data/config/reservation";
import router from "next/router";
import { Flight } from "@/models/flight";
import ResultModal from '../../ResultModal/ResultModal';
import { useParams } from "next/navigation";
import { getCliente } from "@/data/config/client";


interface AvailableFlightsModalProps {
  data: Flight;
  onClose: () => void;
}
interface CreateReservationResponse {
  message: string;
}
const AvailableFlightsModal: FC<AvailableFlightsModalProps> = ({
  data,
  onClose,
}) => {
  const router = useRouter();
  const [quantidade, setQuantidade] = useState(1);
  const [milhasSaldo, setMilhasSaldo] = useState(1000);
  const [milhasUsadas, setMilhasUsadas] = useState(0);
  const [showResultModal, setShowResultModal] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const milhasPorAssento = data.valor_passagem * 0.2;
  const totalMilhas = milhasPorAssento * quantidade;
  const valorTotal = data.valor_passagem * quantidade;
  const valorComMilhas = Math.max(0, valorTotal - milhasUsadas / 0.2);
   const { id } = useParams();
  // const { client, isLoading } = useQuery({
  //   queryKey: [`cliente-${id}`, id],
  //   queryFn: getCliente,

  //   refetchOnWindowFocus: false,
  // });
  // setMilhasSaldo(client?.saldo_milhas || 0);
  const { mutateAsync, isPending } = useMutation<CreateReservationResponse, Error, IReserva>({
    mutationKey: ["createReservation"],
    mutationFn: createReservation,
    onSuccess: (data: CreateReservationResponse) => {
      setIsSuccess(true);
      setResultMessage("Reserva criada com sucesso!");
      setShowResultModal(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    },
    onError: (error: any) => {
      setIsSuccess(false);
      setResultMessage("Erro ao criar reserva. Por favor, tente novamente.");
      setShowResultModal(true);
      const apiErrors = error?.response?.data?.errors;
      if (Array.isArray(apiErrors)) {
        const errorMessages = apiErrors.map(err => err.message).join(", ");
        setResultMessage(errorMessages);
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
  };

  const handleModalClose = () => {
    setShowResultModal(false);
    if (isSuccess) {
      window.location.reload();
    }
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

      <ResultModal
        open={showResultModal}
        isSuccess={isSuccess}
        isPending={isPending}
        message={resultMessage}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default AvailableFlightsModal;
