import "./AvailableFlights.scss";
import { FC } from "react";
import { formatDate } from "@/utils/formatDate";
import { useModal } from "@/components/Provider/ModalProvider/ModalProvider";
import ImgDefault from "@/components/ImgDefault/ImgDefault";
import AvailableFlightsModal from "../AvailableFlightsModal/AvailableFlightsModal";
import ButtonDefault from "@/components/Buttons/ButtonDefault/ButtonDefault";
import InputText from "@/components/Inputs/InputText/InputText";
import { useForm } from "@/hooks/useForm";

type Status = "Next" | "Completed" | "Canceled";

interface AvailableFlightsProps {
  data?: any;
  status?: Status;
}

const AvailableFlights: FC<AvailableFlightsProps> = ({ data, status }) => {
  const { openModal } = useModal();

  const detailsModal = () => {
    openModal({
      headerName: "Detalhes da reserva",
      children: <AvailableFlights status={status} />,
    });

    const { form, loading, setLoading, changeState, validation } = useForm({
      origem: { invalid: false, errorLabel: "Origem", value: "" },
      destino: { invalid: false, errorLabel: "Destino", value: "" },
    });
  };

  const handleSearch = () => {
    console.log("Buscar voos!");
  }  

  return (
    <div className="availableFlights">
      <div className="availableFlights__filter">
        <div className="availableFlights__fieldGroup">
          <div className="availableFlights__inputWrapper">
            <InputText id="origem" label="Origem" name="origem" type="text" />
            <button
              type="button"
              className="availableFlights__searchBtn"
              onClick={() => handleSearch()}              // opcional: sua função de filtro
            >
            <ImgDefault
                src="/icons/search.svg"
                alt="Icone Lupa"
                className="availableFlights__search"
            />
            </button>
          </div>
        </div>
        <div className="availableFlights__fieldGroup">
          <div className="availableFlights__inputWrapper">
            <InputText
              id="destino"
              label="Destino"
              name="destino"
              type="text"
            />
            <button
              type="button"
              className="availableFlights__searchBtn"
              onClick={handleSearch} // opcional: sua função de filtro
            >
            <ImgDefault
                src="/icons/search.svg"
                alt="Icone Lupa"
                className="availableFlights__search"
            />
            </button>
          </div>
        </div>
      </div>
      {/* Header */}
      <div className="availableFlights__header">
        <div className="availableFlights__headerInfo">
          <ImgDefault
            src="/icons/logo.svg"
            alt="Logo AirTADS"
            className="availableFlights__logo"
          />
          <span className="reservationCard__code">XYZ123</span>
        </div>
        <div
          className={`availableFlights__status availableFlights__status--${status?.toLowerCase()}`}
        >
          <span className="availableFlights__statusText">{status}</span>
        </div>
      </div>
      {/* Body */}
      <div className="availableFlights__body">
        <div className="availableFlights__cityBlock">
          <span className="availableFlights__airport">CGH</span>
          <span className="availableFlights__city">São Paulo</span>
        </div>
        <div className="availableFlights__line" />
        <div className="availableFlights__cityBlock">
          <span className="availableFlights__airport">CWB</span>
          <span className="availableFlights__city">Curitiba</span>
        </div>
      </div>
      {/* Footer */}
      <div className="availableFlights__footer">
        <div className="availableFlights__footerInfo">
          <ImgDefault
            src="/icons/calendar.svg"
            alt="Logo AirTADS"
            className="availableFlights__logo"
          />
          <span className="availableFlights__footerText">Mar 29, 2025</span>
        </div>
        <div className="availableFlights__footerInfo">
          <ImgDefault
            src="/icons/clock.svg"
            alt="Logo AirTADS"
            className="availableFlights__logo"
          />
          <span className="availableFlights__footerText">12:00 - 13:50</span>
        </div>
        <div className="availableFlights__footerInfo">
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

export default AvailableFlights;
