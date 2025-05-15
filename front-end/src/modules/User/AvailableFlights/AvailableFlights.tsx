import "./AvailableFlights.scss";
import { FC, useState } from "react";
import { useModal } from "@/components/Provider/ModalProvider/ModalProvider";
import ImgDefault from "@/components/ImgDefault/ImgDefault";
import AvailableFlightsModal from "../AvailableFlightsModal/AvailableFlightsModal";
import ButtonDefault from "@/components/Buttons/ButtonDefault/ButtonDefault";
import InputText from "@/components/Inputs/InputText/InputText";
import { useForm } from "@/hooks/useForm";
import AvailableFlightCard from "./AvailableFlightCard";
import ModalCenter from "@/components/Modal/ModalCenter/ModalCenter";

type Flight = {
  id: string;
  origemCodigo: string;
  origem: string;
  destinoCodigo: string;
  destino: string;
  data: string;
  horaSaida: string;
  preco: number;
};

const flights: Flight[] = [
  {
    id: "CGH123",
    origemCodigo: "CGH",
    origem: "São Paulo",
    destinoCodigo: "CWB",
    destino: "Curitiba",
    data: "2025-03-29",
    horaSaida: "12:00",
    preco: 300,
  },
  {
    id: "GUA456",
    origemCodigo: "GRU",
    origem: "Guarulhos",
    destinoCodigo: "SDU",
    destino: "Rio de Janeiro",
    data: "2025-03-30",
    horaSaida: "10:00",
    preco: 250,
  },
  {
    id: "POA789",
    origemCodigo: "POA",
    origem: "Porto Alegre",
    destinoCodigo: "BSB",
    destino: "Brasília",
    data: "2025-03-31",
    horaSaida: "14:00",
    preco: 400,
  },
];

const AvailableFlights: FC = () => {
  const [modalActive, setModalActive] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);

  const openDetailsModal = (flight: Flight) => {
    setSelectedFlight(flight);
    setModalActive(true);
  };

  const closeDetailsModal = () => {
    setModalActive(false);
    setSelectedFlight(null);
  };

  return (
    <div className="availableFlights">
      <div className="availableFlights__cards">
        {flights.map((flight) => (
          <AvailableFlightCard
            key={flight.id}
            flightCode={flight.id}
            originCode={flight.origemCodigo}
            originCity={flight.origem}
            destinationCode={flight.destinoCodigo}
            destinationCity={flight.destino}
            date={new Date(flight.data).toLocaleDateString("pt-BR", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
            time={`${flight.horaSaida} - 2h`}
            onDetailsClick={() => openDetailsModal(flight)}
          />
        ))}
      </div>

      {selectedFlight && (
        <ModalCenter
          active={modalActive}
          headerName="Detalhes da reserva"
          onClose={closeDetailsModal}
        >
          <AvailableFlightsModal
            data={selectedFlight}
            onClose={closeDetailsModal}
          />
        </ModalCenter>
      )}
    </div>
  );
};

export default AvailableFlights;
