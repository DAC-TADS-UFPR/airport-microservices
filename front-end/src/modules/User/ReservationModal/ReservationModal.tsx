"use client";

import { FC, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import ButtonDefault from "@/components/Buttons/ButtonDefault/ButtonDefault";
import ImgDefault from "@/components/ImgDefault/ImgDefault";
import { getReservation, updateReservationState } from "@/data/config/reservation";
import { ReservationDTO } from "@/models/reserva";
import "./ReservationModal.scss";
import { ReservaState, ReservaStateEnum } from "@/models/reserva.state";
import router from "next/router";
import { formatDate } from "@/utils/formatDate";
import ResultModal from "../../ResultModal/ResultModal";

type Status = "Next" | "Completed" | "Canceled";

interface ReservationModalProps {
  reservationId: string;
  status: Status;
  onClose: () => void;
}

interface CheckInResponse {
  message: string;
}

const ReservationModal: FC<ReservationModalProps> = ({
  reservationId,
  status,
  onClose,
}) => {
  const [showResultModal, setShowResultModal] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    data: reserva,
    isLoading,
    isError,
  } = useQuery<ReservationDTO, Error>({
    queryKey: ["reserva", reservationId],
    queryFn: getReservation,
    enabled: !!reservationId,
    refetchOnWindowFocus: false,
  });

  const {mutateAsync, isPending} = useMutation<CheckInResponse, Error, ReservaState>({
    mutationKey: ["updateReservationState"],
    mutationFn: updateReservationState,
    onSuccess: (data: CheckInResponse) => {
      setIsSuccess(true);
      setResultMessage("Operação realizada com sucesso!");
      setShowResultModal(true);
      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 2000);
    },
    onError: (error: any) => {
      setIsSuccess(false);
      setResultMessage("Erro ao realizar operação. Por favor, tente novamente.");
      setShowResultModal(true);
      const apiErrors = error?.response?.data?.errors;
      if (Array.isArray(apiErrors)) {
        const errorMessages = apiErrors.map(err => err.message).join(", ");
        setResultMessage(errorMessages);
      }
    },
  });

  const doCheckIn = async () => {
    try {
      const state: ReservaState = {
        id_reserva: reservationId,
        estado: ReservaStateEnum.CHECK_IN,
      };

      await mutateAsync(state);
    } catch (error) {
      console.error("Erro ao realizar check-in:", error);
    }
  };

  const doCancel = async () => {
    try {
      const state: ReservaState = {
        id_reserva: reservationId,
        estado: ReservaStateEnum.CANCELADA,
      };

      await mutateAsync(state);
    } catch (error) {
      console.error("Erro ao realizar check-in:", error);
    }
  };

  const handleModalClose = () => {
    setShowResultModal(false);
    if (isSuccess) {
      window.location.reload();
    }
  };

  if (isLoading) {
    return <p className="reservationModal__status">Carregando detalhes...</p>;
  }

  if (isError || !reserva) {
    return (
      <div className="reservationModal__container">
        <p className="reservationModal__status">
          Erro ao carregar detalhes da reserva.
        </p>
        <ButtonDefault onClick={onClose}>Fechar</ButtonDefault>
      </div>
    );
  }

  const {
    codigo: codigoReserva,
    estado: estadoReserva,
    data: dataReserva,
    valor: valorReserva,
    milhas_utilizadas,
    voo,
  } = reserva;

  console.log("Dados da reserva:", reserva);

  const {
    data: dataVoo,
    valor_passagem,
    aeroporto_origem,
    aeroporto_destino,
  } = voo;

  const dataVooFormatada = formatDate({ date: dataVoo, type: "date" });
  const horaVooFormatada = formatDate({ date: dataVoo, type: "hour" });

  const chegada = new Date(dataVoo);
  chegada.setHours(chegada.getHours() + 2);

  const horaChegadaFormatada = formatDate({ date: chegada, type: "hour" });

  return (
    <div className="reservationModal">
      {/* Header */}
      <div className="reservationModal__header">
        <div className="reservationModal__headerInfo">
          <ImgDefault
            src="/icons/logo.svg"
            alt="Logo AirTADS"
            className="reservationModal__logo"
          />
          <span className="reservationModal__code">{codigoReserva}</span>
        </div>
        <div
          className={`reservationModal__status reservationModal__status--${status.toLowerCase()}`}
        >
          <span className="reservationModal__statusText">{status}</span>
        </div>
      </div>

      {/* Body */}
      <div className="reservationModal__body">
        <div className="reservationModal__cityBlock">
          <span className="reservationModal__airport">
            {aeroporto_origem.codigo}
          </span>
          <span className="reservationModal__city">
            {aeroporto_origem.cidade}
          </span>
        </div>
        <div className="reservationModal__line" />
        <div className="reservationModal__cityBlock">
          <span className="reservationModal__airport">
            {aeroporto_destino.codigo}
          </span>
          <span className="reservationModal__city">
            {aeroporto_destino.cidade}
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="reservationModal__details">
        <div className="reservationModal__detailsInfo">
          <ImgDefault
            src="/icons/calendar.svg"
            alt="Ícone de calendário"
            className="reservationModal__logo"
          />
          <span className="reservationModal__detailsText">
            {dataVooFormatada}
          </span>
        </div>
        <div className="reservationModal__detailsInfo">
          <ImgDefault
            src="/icons/logo.svg"
            alt="Ícone de saída"
            className="reservationModal__logo"
          />
          <span className="reservationModal__detailsText">
            Saída {horaVooFormatada}
          </span>
        </div>
        <div className="reservationModal__detailsInfo">
          <ImgDefault
            src="/icons/logo.svg"
            alt="Ícone de chegada"
            className="reservationModal__logo reservationModal__logo--mod"
          />
          <span className="reservationModal__detailsText">
            Chegada {horaChegadaFormatada}
          </span>
        </div>
      </div>

      {/* Price */}
      <div className="reservationModal__header">
        <div className="reservationModal__headerInfo">
          <span className="reservationModal__priceText">Valor:</span>
          <span className="reservationModal__price">
            {valorReserva.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>
        <div className="reservationModal__headerInfo">
          <span className="reservationModal__priceText">Milhas:</span>
          <span className="reservationModal__price">{milhas_utilizadas}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="reservationModal__footer">
        <ButtonDefault
          onClick={() => {
            if (reserva.estado === ReservaStateEnum.CRIADA) {
              doCheckIn();
            } else if (status === "Completed") {
              console.log("Download do comprovante");
            } else {
              console.log("Reembolsar reserva");
            }
          }}
          disabled={isLoading  || reserva.estado === ReservaStateEnum.CANCELADA || reserva.estado === ReservaStateEnum.REALIZADA} 
        >
          {reserva.estado === ReservaStateEnum.CRIADA
            ? isLoading
              ? "Aguarde..."
              : "Check-in"
            : status === "Completed"
            ? "Download"
            : "Reembolsar"}
        </ButtonDefault>
        <ButtonDefault 
          color="red" 
          onClick={() => doCancel()}
          disabled={isLoading  || reserva.estado === ReservaStateEnum.CANCELADA || reserva.estado === ReservaStateEnum.REALIZADA} 
        >
          Cancelar reserva
        </ButtonDefault>
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

export default ReservationModal;
