// src/modules/User/ReservationModal/ReservationModal.tsx
"use client";

import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import ButtonDefault from "@/components/Buttons/ButtonDefault/ButtonDefault";
import ImgDefault from "@/components/ImgDefault/ImgDefault";
import { getReservation } from "@/data/config/reservation";
import { ReservationDTO } from "@/models/reserva";
import "./ReservationModal.scss";

type Status = "Next" | "Completed" | "Canceled";

interface ReservationModalProps {
  reservationId: string;
  status: Status;
  onClose: () => void;
}

const ReservationModal: FC<ReservationModalProps> = ({
  reservationId,
  status,
  onClose,
}) => {
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

  // Extrair dados da reserva
  const {
    codigo: codigoReserva,
    estado: estadoReserva,
    data: dataReserva,
    valor: valorReserva,
    milhas_utilizadas,
    voo,
  } = reserva;

  // Extrair dados do voo
  const {
    data: dataVoo,
    valor_passagem,
    aeroporto_origem,
    aeroporto_destino,
  } = voo;

  // Formatar datas e horas
  const dataVooFormatada = new Date(dataVoo).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const horaVooFormatada = new Date(dataVoo).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Exibe a hora de chegada somando 2h à hora de partida
  const chegada = new Date(dataVoo);
  chegada.setHours(chegada.getHours() + 2);
  const horaChegadaFormatada = chegada.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

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
            if (status === "Next") {
              console.log("Realizar check-in");
            } else if (status === "Completed") {
              console.log("Download do comprovante");
            } else {
              console.log("Reembolsar reserva");
            }
          }}
        >
          {status === "Next"
            ? "Check-in"
            : status === "Completed"
            ? "Download"
            : "Reembolsar"}
        </ButtonDefault>
        <ButtonDefault
          color="red"
          onClick={() => {
            console.log("Cancelar reserva");
          }}
        >
          Cancelar reserva
        </ButtonDefault>
      </div>
    </div>
  );
};

export default ReservationModal;
