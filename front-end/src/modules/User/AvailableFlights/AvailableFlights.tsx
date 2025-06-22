"use client";
import "./AvailableFlights.scss";
import { FC, useState, useEffect } from "react";
import { useModal } from "@/components/Provider/ModalProvider/ModalProvider";
import ImgDefault from "@/components/ImgDefault/ImgDefault";
import AvailableFlightsModal from "../AvailableFlightsModal/AvailableFlightsModal";
import ButtonDefault from "@/components/Buttons/ButtonDefault/ButtonDefault";
import InputText from "@/components/Inputs/InputText/InputText";
import AvailableFlightCard from "./AvailableFlightCard";
import ModalCenter from "@/components/Modal/ModalCenter/ModalCenter";
import { useQuery } from "@tanstack/react-query";
import { getFlights } from "@/data/config/flight";
import { addHours, format } from "date-fns";
import { Flight } from "@/models/flight";


const AvailableFlights: FC = () => {
  const { openModal } = useModal();
  const [modalActive, setModalActive] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);

  const [codigoAeroportoOrigem, setCodigoAeroportoOrigem] = useState("");
  const [codigoAeroportoDestino, setCodigoAeroportoDestino] = useState("");

  const [filteredFlights, setFilteredFlights] = useState<Flight[]>([]);

  const agora = new Date();
  const data = format(agora, "yyyy-MM-dd'T'HH:mm:ssxxx");

  const {
    data: flightsResponse,
    isLoading: isLoadingInitial,
    isError: initialError,
    refetch: fetchFlights
  } = useQuery({
    queryKey: ["availableFlights-inicial", {codigoAeroportoOrigem, codigoAeroportoDestino, data}],
    queryFn: getFlights,
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const handleSearch = async () => {
      await fetchFlights();
  };

  useEffect(() => {
      fetchFlights();
  } , [codigoAeroportoOrigem, codigoAeroportoDestino, data]);

  useEffect(() => {
    if (flightsResponse) {
      setFilteredFlights(flightsResponse.voos);
    }
  }, [flightsResponse]);

  
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
      <div className="availableFlights__filter">
        <div className="availableFlights__fieldGroup">
          <InputText
            name="origem"
            placeholder="Origem"
            value={codigoAeroportoOrigem}
            onChange={(e) => setCodigoAeroportoOrigem(e.target.value)}
          />
        </div>

        <div className="availableFlights__fieldGroup availableFlights__fieldGroup--withButton">
          <InputText
            name="destino"
            placeholder="Destino"
            value={codigoAeroportoDestino}
            onChange={(e) => setCodigoAeroportoDestino(e.target.value)}
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

      {isLoadingInitial ? (
        <p>Carregando voos...</p>
      ) : initialError ? (
        <p>Erro ao carregar voos iniciais.</p>
      ) : (
        <div className="availableFlights__cards">
          {filteredFlights && filteredFlights.length > 0 ? (
            filteredFlights.map((flight) => (
              <div key={flight.codigo} className="flightCardWrapper">
                <AvailableFlightCard
                  flightCode={flight.codigo}
                  originCode={flight.aeroporto_origem?.codigo}
                  originCity={flight.aeroporto_origem?.cidade}
                  destinationCode={flight.aeroporto_destino?.codigo}
                  destinationCity={flight.aeroporto_destino?.cidade}
                  date={new Date(flight.data).toLocaleDateString("pt-BR", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                   time={`${new Date(flight.data).toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}`}
                  onDetailsClick={() => openDetailsModal(flight)}
                />
              </div>
            ))
          ) : (
            <p>Nenhum voo encontrado com os critérios informados.</p>
          )}
        </div>
      )}

      {selectedFlight && (
        <ModalCenter
          active={modalActive}
          headerName="Detalhes do voo"
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