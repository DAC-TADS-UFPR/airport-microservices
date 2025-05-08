import { FC } from "react";
import ImgDefault from "@/components/ImgDefault/ImgDefault";
import ButtonDefault from "@/components/Buttons/ButtonDefault/ButtonDefault";
import "./AvailableFlightCard.scss";

interface AvailableFlightCardProps {
  flightCode: string;
  originCode: string;
  originCity: string;
  destinationCode: string;
  destinationCity: string;
  date: string;
  time: string;
  onDetailsClick: () => void;
}

const AvailableFlightCard: FC<AvailableFlightCardProps> = ({
  flightCode,
  originCode,
  originCity,
  destinationCode,
  destinationCity,
  date,
  time,
  onDetailsClick,
}) => {
  return (
    <div className="availableFlightsModal">
      {/* Header */}
      <div className="availableFlightsModal__header">
        <div className="availableFlightsModal__headerInfo">
          <ImgDefault
            src="/icons/logo.svg"
            alt="Avião"
            className="availableFlightsModal__logo"
          />
          <span className="availableFlightsModal__code">{flightCode}</span>
        </div>
      </div>

      {/* Body */}
      <div className="availableFlightsModal__body">
        <div className="availableFlightsModal__cityBlock">
          <span className="availableFlightsModal__airport">{originCode}</span>
          <span className="availableFlightsModal__city">{originCity}</span>
        </div>

        <div className="availableFlightsModal__line" />

        <div className="availableFlightsModal__cityBlock">
          <span className="availableFlightsModal__airport">{destinationCode}</span>
          <span className="availableFlightsModal__city">{destinationCity}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="availableFlightsModal__footer">
        <div className="availableFlightsModal__detailsInfo">
          <ImgDefault
            src="/icons/calendar.svg"
            alt="Calendário"
            className="availableFlightsModal__logo"
          />
          <span className="availableFlightsModal__detailsText">{date}</span>
        </div>

        <div className="availableFlightsModal__detailsInfo">
          <ImgDefault
            src="/icons/clock.svg"
            alt="Horário"
            className="availableFlightsModal__logo"
          />
          <span className="availableFlightsModal__detailsText">{time}</span>
        </div>

        <ButtonDefault onClick={onDetailsClick}>
          Detalhes
        </ButtonDefault>
      </div>
    </div>
  );
};

export default AvailableFlightCard;
