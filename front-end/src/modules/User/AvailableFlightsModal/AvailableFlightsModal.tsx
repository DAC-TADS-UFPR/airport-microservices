import ButtonDefault from "@/components/Buttons/ButtonDefault/ButtonDefault";
import ImgDefault from "@/components/ImgDefault/ImgDefault";
import "./AvailableFlightsModal.scss";
import { FC } from "react";

type Status = "Next" | "Completed" | "Canceled";

interface AvailableFlightsModalProps {
  data?: any;
  status?: Status;
}

const ReservationModal: FC<AvailableFlightsModalProps> = ({ data, status }) => {
  return (
    <div className="availableFlightsModal">
      {/* Header */}
      <div className="availableFlightsModal__header">
        <div className="availableFlightsModal__headerInfo">
          <ImgDefault src="/icons/logo.svg" alt="Logo AirTADS" className="availableFlightsModal__logo" />
          <span className="availableFlightsModal__code">XYZ123</span>
        </div>
        <div className={`availableFlightsModal__status availableFlightsModal__status--${status?.toLowerCase()}`}>
          <span className="availableFlightsModal__statusText">{status}</span>
        </div>
      </div>
      {/* Body */}
      <div className="availableFlightsModal__body">
        <div className="availableFlightsModal__cityBlock">
          <span className="availableFlightsModal__airport">CGH</span>
          <span className="availableFlightsModal__city">São Paulo</span>
        </div>
        <div className="availableFlightsModal__line" />
        <div className="availableFlightsModal__cityBlock">
          <span className="availableFlightsModal__airport">CWB</span>
          <span className="availableFlightsModal__city">Curitiba</span>
        </div>
      </div>
      {/* Details */}
      <div className="availableFlightsModal__details">
        <div className="availableFlightsModal__detailsInfo">
          <ImgDefault src="/icons/calendar.svg" alt="Logo AirTADS" className="availableFlightsModal__logo" />
          <span className="availableFlightsModal__detailsText">Mar 29, 2025</span>
        </div>
        <div className="availableFlightsModal__detailsInfo">
          <ImgDefault src="/icons/logo.svg" alt="Logo AirTADS" className="availableFlightsModal__logo" />
          <span className="availableFlightsModal__detailsText">Saída 12:00</span>
        </div>
        <div className="availableFlightsModal__detailsInfo">
          <ImgDefault src="/icons/logo.svg" alt="Logo AirTADS" className="availableFlightsModal__logo availableFlightsModal__logo--mod" />
          <span className="availableFlightsModal__detailsText">Chegada 13:50</span>
        </div>
      </div>

      {/* Price */}
      <div className="availableFlightsModal__header">
        <div className="availableFlightsModal__headerInfo">
          <span className="availableFlightsModal__priceText">Valor:</span>
          <span className="availableFlightsModal__price">R$ 1.200,00</span>
        </div>
        <div className="availableFlightsModal__headerInfo">
          <span className="availableFlightsModal__priceText">Milhas:</span>
          <span className="availableFlightsModal__price">{1200 * 0.2}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="availableFlightsModal__footer">
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

export default AvailableFlightsModalProps;
