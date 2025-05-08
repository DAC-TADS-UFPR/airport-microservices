import "./AvailableFlights.scss";
import { FC } from "react";
import { useModal } from "@/components/Provider/ModalProvider/ModalProvider";
import ImgDefault from "@/components/ImgDefault/ImgDefault";
import AvailableFlightsModal from "../AvailableFlightsModal/AvailableFlightsModal";
import ButtonDefault from "@/components/Buttons/ButtonDefault/ButtonDefault";
import InputText from "@/components/Inputs/InputText/InputText";
import { useForm } from "@/hooks/useForm";
import AvailableFlightCard from "./AvailableFlightCard";

type Status = "Next" | "Completed" | "Canceled";

interface AvailableFlightsProps {
  data?: any;
  status?: Status;
}

const AvailableFlights: FC<AvailableFlightsProps> = ({ data, status }) => {
  const { openModal } = useModal();

  const { form, loading, setLoading, changeState, validation } = useForm({
    origem: { invalid: false, errorLabel: "Origem", value: "" },
    destino: { invalid: false, errorLabel: "Destino", value: "" },
  });

  const handleSearch = () => {
    console.log("Buscar voos!");
  };

  const detailsModal = (flightCode: string) => {
    openModal({
      headerName: "Detalhes da reserva",
      children: <AvailableFlightsModal data={data} status={status} />,
    });
  };

  return (
    <div className="availableFlights">
      {/* Filtros */}
      <div className="availableFlights__filter">
        <div className="availableFlights__fieldGroup">
          <div className="availableFlights__inputWrapper">
            <InputText id="origem" label="Origem" name="origem" type="text" />
            <button
              type="button"
              className="availableFlights__searchBtn"
              onClick={handleSearch}
            >
              <ImgDefault
                src="/icons/search.svg"
                alt="Ícone Lupa"
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
              onClick={handleSearch}
            >
              <ImgDefault
                src="/icons/search.svg"
                alt="Ícone Lupa"
                className="availableFlights__search"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Cards de voos disponíveis */}
      <div className="availableFlights__cards">
        <AvailableFlightCard
          flightCode="CGH123"
          originCode="CGH"
          originCity="São Paulo"
          destinationCode="CWB"
          destinationCity="Curitiba"
          date="Mar 29, 2025"
          time="12:00 - 13:50"
          onDetailsClick={() => detailsModal("XYZ123")}
        />

        <AvailableFlightCard
          flightCode="GUA456"
          originCode="GRU"
          originCity="Guarulhos"
          destinationCode="SDU"
          destinationCity="Rio de Janeiro"
          date="Mar 30, 2025"
          time="10:00 - 11:30"
          onDetailsClick={() => detailsModal("GUA456")}
        />

        <AvailableFlightCard
          flightCode="POA789"
          originCode="POA"
          originCity="Porto Alegre"
          destinationCode="BSB"
          destinationCity="Brasília"
          date="Mar 31, 2025"
          time="14:00 - 16:10"
          onDetailsClick={() => detailsModal("POA789")}
        />
      </div>
    </div>
  );
};

export default AvailableFlights;
