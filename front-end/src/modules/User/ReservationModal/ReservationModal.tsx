import ButtonDefault from "@/components/Buttons/ButtonDefault/ButtonDefault";
import ImgDefault from "@/components/ImgDefault/ImgDefault";
import "./ReservationModal.scss";
import { FC } from "react";

type Status = "Next" | "Completed" | "Canceled";

interface ReservationModalProps {
  data?: any;
  status?: Status;
}

const ReservationModal: FC<ReservationModalProps> = ({ data, status }) => {
  return (
    <div className="reservationModal">
      {/* Header */}
      <div className="reservationModal__header">
        <div className="reservationModal__headerInfo">
          <ImgDefault src="/icons/logo.svg" alt="Logo AirTADS" className="reservationModal__logo" />
          <span className="reservationModal__code">XYZ123</span>
        </div>
        <div className={`reservationModal__status reservationModal__status--${status?.toLowerCase()}`}>
          <span className="reservationModal__statusText">{status}</span>
        </div>
      </div>
      {/* Body */}
      <div className="reservationModal__body">
        <div className="reservationModal__cityBlock">
          <span className="reservationModal__airport">CGH</span>
          <span className="reservationModal__city">São Paulo</span>
        </div>
        <div className="reservationModal__line" />
        <div className="reservationModal__cityBlock">
          <span className="reservationModal__airport">CWB</span>
          <span className="reservationModal__city">Curitiba</span>
        </div>
      </div>
      {/* Details */}
      <div className="reservationModal__details">
        <div className="reservationModal__detailsInfo">
          <ImgDefault src="/icons/calendar.svg" alt="Logo AirTADS" className="reservationModal__logo" />
          <span className="reservationModal__detailsText">Mar 29, 2025</span>
        </div>
        <div className="reservationModal__detailsInfo">
          <ImgDefault src="/icons/logo.svg" alt="Logo AirTADS" className="reservationModal__logo" />
          <span className="reservationModal__detailsText">Saída 12:00</span>
        </div>
        <div className="reservationModal__detailsInfo">
          <ImgDefault src="/icons/logo.svg" alt="Logo AirTADS" className="reservationModal__logo reservationModal__logo--mod" />
          <span className="reservationModal__detailsText">Chegada 13:50</span>
        </div>
      </div>

      {/* Price */}
      <div className="reservationModal__header">
        <div className="reservationModal__headerInfo">
          <span className="reservationModal__priceText">Valor:</span>
          <span className="reservationModal__price">R$ 1.200,00</span>
        </div>
        <div className="reservationModal__headerInfo">
          <span className="reservationModal__priceText">Milhas:</span>
          <span className="reservationModal__price">{1200 * 0.2}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="reservationModal__footer">
        <ButtonDefault
          onClick={() => {
            console.log("Button clicked");
          }}
        >
          {status === "Next" ? "Check-in" : status === "Completed" ? "Download" : "Reembolsar"}
        </ButtonDefault>
        <ButtonDefault
          color="red"
          onClick={() => {
            console.log("Button clicked");
          }}
        >
          Cancelar reserva
        </ButtonDefault>
      </div>
    </div>
  );
};

export default ReservationModal;
