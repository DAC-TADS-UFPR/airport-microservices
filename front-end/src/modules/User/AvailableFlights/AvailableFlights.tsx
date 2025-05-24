import "./AvailableFlights.scss";
import { FC, useState } from "react";
import { useModal } from "@/components/Provider/ModalProvider/ModalProvider";
import ImgDefault from "@/components/ImgDefault/ImgDefault";
import AvailableFlightsModal from "../AvailableFlightsModal/AvailableFlightsModal";
import ButtonDefault from "@/components/Buttons/ButtonDefault/ButtonDefault";
import InputText from "@/components/Inputs/InputText/InputText";
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
  {
    id: "REC321",
    origemCodigo: "REC",
    origem: "Recife",
    destinoCodigo: "NAT",
    destino: "Natal",
    data: "2025-04-01",
    horaSaida: "09:30",
    preco: 280,
  },
  {
    id: "SSA654",
    origemCodigo: "SSA",
    origem: "Salvador",
    destinoCodigo: "FOR",
    destino: "Fortaleza",
    data: "2025-04-02",
    horaSaida: "15:45",
    preco: 350,
  },
  {
    id: "VIX987",
    origemCodigo: "VIX",
    origem: "Vitória",
    destinoCodigo: "CWB",
    destino: "Curitiba",
    data: "2025-04-03",
    horaSaida: "11:20",
    preco: 320,
  },
  {
    id: "BEL258",
    origemCodigo: "BEL",
    origem: "Belém",
    destinoCodigo: "MAO",
    destino: "Manaus",
    data: "2025-04-04",
    horaSaida: "13:15",
    preco: 420,
  },
  {
    id: "CGR369",
    origemCodigo: "CGR",
    origem: "Campo Grande",
    destinoCodigo: "POA",
    destino: "Porto Alegre",
    data: "2025-04-05",
    horaSaida: "16:00",
    preco: 380,
  },
];

const AvailableFlights: FC = () => {
  const [modalActive, setModalActive] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [originFilter, setOriginFilter] = useState("");
  const [destinationFilter, setDestinationFilter] = useState("");
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>(flights);

  const openDetailsModal = (flight: Flight) => {
    setSelectedFlight(flight);
    setModalActive(true);
  };

  const closeDetailsModal = () => {
    setModalActive(false);
    setSelectedFlight(null);
  };

  const handleSearch = () => {
    const filtered = flights.filter(
      (flight) =>
        flight.origem.toLowerCase().includes(originFilter.toLowerCase()) &&
        flight.destino.toLowerCase().includes(destinationFilter.toLowerCase())
    );
    setFilteredFlights(filtered);
  };

  return (
    <div className="availableFlights">
      <div className="availableFlights__filter">
        <div className="availableFlights__fieldGroup">
          <InputText
            name="origem"
            placeholder="Origem"
            value={originFilter}
            onChange={(e) => setOriginFilter(e.target.value)}
          />
        </div>

        <div className="availableFlights__fieldGroup availableFlights__fieldGroup--withButton">
          <InputText
            name="destino"
            placeholder="Destino"
            value={destinationFilter}
            onChange={(e) => setDestinationFilter(e.target.value)}
          />
          <div className="availableFlights__inputWrapper">
            <button
              className="availableFlights__searchBtn"
              onClick={handleSearch}
              aria-label="Buscar voos"
            >
              <img
                src="/icons/search.svg"
                alt="Buscar"
                className="availableFlights__search"
              />
            </button>
          </div>
        </div>
      </div>

      <div className="availableFlights__cards">
        {filteredFlights.length > 0 ? (
          filteredFlights.map((flight) => (
            <div key={flight.id} className="flightCardWrapper">
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
            </div>
          ))
        ) : (
          <p>Nenhum voo encontrado com os critérios informados.</p>
        )}
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
