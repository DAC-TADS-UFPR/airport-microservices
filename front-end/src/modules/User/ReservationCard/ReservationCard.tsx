import ImgDefault from "@/components/ImgDefault/ImgDefault";
import "./ReservationCard.scss";
import { FC } from "react";
import ButtonDefault from "@/components/Buttons/ButtonDefault/ButtonDefault";

type Status = "Next" | "Completed" | "Canceled";

interface ReservationCardProps {
  data?: any;
  status?: Status;
}

const ReservationCard: FC<ReservationCardProps> = ({ data, status }) => {
  return (
    <div className="reservationCard">
      {/* Header */}
      <div className="reservationCard__header">
        <div className="reservationCard__headerInfo">
          <ImgDefault src="/icons/logo.svg" alt="Logo AirTADS" className="reservationCard__logo" />
          <span className="reservationCard__code">XYZ123</span>
        </div>
        <div className={`reservationCard__status reservationCard__status--${status?.toLowerCase()}`}>
          <span className="reservationCard__statusText">{status}</span>
        </div>
      </div>
      {/* Body */}
      <div className="reservationCard__body">
        <div className="reservationCard__cityBlock">
          <span className="reservationCard__airport">CGH</span>
          <span className="reservationCard__city">São Paulo</span>
        </div>
        <div className="reservationCard__line" />
        <div className="reservationCard__cityBlock">
          <span className="reservationCard__airport">CWB</span>
          <span className="reservationCard__city">Curitiba</span>
        </div>
      </div>
      {/* Footer */}
      <div className="reservationCard__footer">
        <div className="reservationCard__footerInfo">
          <ImgDefault src="/icons/calendar.svg" alt="Logo AirTADS" className="reservationCard__logo" />
          <span className="reservationCard__footerText">Mar 29, 2025</span>
        </div>
        <div className="reservationCard__footerInfo">
          <ImgDefault src="/icons/clock.svg" alt="Logo AirTADS" className="reservationCard__logo" />

          <span className="reservationCard__footerText">12:00 - 13:50</span>
        </div>
        <div className="reservationCard__footerInfo">
          <ButtonDefault children={"Detalhes"} style={{ width: "auto" }} />
        </div>
      </div>
    </div>
  );
};

export default ReservationCard;
