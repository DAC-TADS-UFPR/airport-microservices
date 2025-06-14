// src/modules/User/ReservationCard/ReservationCard.tsx
import "./ReservationCard.scss";
import { FC } from "react";
import { useModal } from "@/components/Provider/ModalProvider/ModalProvider";
import ImgDefault from "@/components/ImgDefault/ImgDefault";
import ReservationModal from "@/modules/User/ReservationModal/ReservationModal";
import ButtonDefault from "@/components/Buttons/ButtonDefault/ButtonDefault";
import { ReservationDTO } from "@/models/reserva";

type Status = "Next" | "Completed" | "Canceled";

interface ReservationCardProps {
  data: ReservationDTO;
  status: Status;
}

const ReservationCard: FC<ReservationCardProps> = ({ data, status }) => {
  const { openModal, closeModal } = useModal();

  const detailsModal = () => {
    openModal({
      headerName: `Detalhes da reserva #${data.codigo}`,
      children: (
        <ReservationModal
          reservationId={data.codigo}
          status={status}
          onClose={() => {
            closeModal();
          }}
        />
      ),
    });
  };

  const reservationCode = data.codigo;
  const flight = data.voo;
  const origem = flight.aeroporto_origem;
  const destino = flight.aeroporto_destino;

  const flightDateFormatted = new Date(flight.data).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const flightTimeFormatted = new Date(flight.data).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="reservationCard">
      <div className="reservationCard__header">
        <div className="reservationCard__headerInfo">
          <ImgDefault
            src="/icons/logo.svg"
            alt="Logo AirTADS"
            className="reservationCard__logo"
          />
          <span className="reservationCard__code">{reservationCode}</span>
        </div>
        <div
          className={`reservationCard__status reservationCard__status--${status.toLowerCase()}`}
        >
          <span className="reservationCard__statusText">{status}</span>
        </div>
      </div>

      <div className="reservationCard__body">
        <div className="reservationCard__cityBlock">
          <span className="reservationCard__airport">{origem.codigo}</span>
          <span className="reservationCard__city">{origem.cidade}</span>
        </div>
        <div className="reservationCard__line" />
        <div className="reservationCard__cityBlock">
          <span className="reservationCard__airport">{destino.codigo}</span>
          <span className="reservationCard__city">{destino.cidade}</span>
        </div>
      </div>

      <div className="reservationCard__footer">
        <div className="reservationCard__footerInfo">
          <ImgDefault
            src="/icons/calendar.svg"
            alt="Ícone de calendário"
            className="reservationCard__logo"
          />
          <span className="reservationCard__footerText">
            {flightDateFormatted}
          </span>
        </div>
        <div className="reservationCard__footerInfo">
          <ImgDefault
            src="/icons/clock.svg"
            alt="Ícone de relógio"
            className="reservationCard__logo"
          />
          <span className="reservationCard__footerText">
            {flightTimeFormatted}
          </span>
        </div>
        <div className="reservationCard__footerInfo">
          <ButtonDefault
            children={"Detalhes"}
            style={{ width: "auto" }}
            onClick={detailsModal}
          />
        </div>
      </div>
    </div>
  );
};

export default ReservationCard;
