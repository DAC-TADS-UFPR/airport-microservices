import "./ManageFlights.scss";
import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { formatDate } from "@/utils/formatDate";
import { useModal } from "@/components/Provider/ModalProvider/ModalProvider";
import formatFloat from "@/utils/formatFloat";
import formatToMoney from "@/utils/formatToMoney";
import ModalNewFlight from "../ModalNewFlight/ModalNewFlight";
import ButtonDefault from "@/components/Buttons/ButtonDefault/ButtonDefault";
import { getFlights } from "@/data/config/flight";
import { format } from "date-fns";
import { Flight } from "@/models/flight";

interface ManageFlightsProps {
  data?: any;
}

const ManageFlights: FC<ManageFlightsProps> = () => {
  const { openModal } = useModal();

  const handleNewFlight = () => {
    openModal({
      headerName: "Criar novo voo",
      children: <ModalNewFlight />,
    });
  };

  const currentYearStart = new Date(new Date().getFullYear(), 0, 1);
  const today = new Date();
  const dataInicial = format(currentYearStart, 'yyyy-MM-dd');
  const dataFinal = format(today, 'yyyy-MM-dd');

  const {
    data: flightsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["flights", { dataInicial, dataFinal }],
    queryFn: getFlights,
    refetchOnWindowFocus: false,
  });

  const flights:Flight[] = flightsData?.voos || [];

  return (
    <div className="manageFlights">
      <div className="manageFlights__header">
        <div className="manageFlights__title">Gerenciar voos</div>
        <ButtonDefault
          children="Criar um voo"
          style={{ width: "auto" }}
          onClick={handleNewFlight}
        />
      </div>
      <div className="manageFlights__content">
        {isLoading ? (
          <p>Carregando voos...</p>
        ) : isError ? (
          <p>Ocorreu um erro ao buscar os voos.</p>
        ) : flights.length > 0 ? (
          <table className="manageFlights__table">
            <thead>
              <tr>
                <th>Código do voo</th>
                <th>Data/Hora</th>
                <th>Origem</th>
                <th>Destino</th>
                <th>Preço / Milhas</th>
                <th>Lugares</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {flights.map((flight: Flight, index: number) => (
                  <tr key={index}>
                    <td>{flight?.codigo || ""}</td>
                    <td>
                      {formatDate({ date: flight?.data, type: "dateHour" })}
                    </td>
                    <td>{flight?.aeroporto_origem.codigo}</td>
                    <td>{flight?.aeroporto_destino.codigo}</td>
                    <td>
                      R$ {formatToMoney(flight?.valor_passagem)} /{" "}
                      {formatFloat(formatToMoney(flight?.valor_passagem) * 0.2)} Milhas
                    </td>
                    <td>
                      {flight?.quantidade_poltronas_ocupadas} / {flight?.quantidade_poltronas_total}
                    </td>
                    <td>{flight.estado}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <p>Nenhum voo disponível.</p>
        )}
      </div>
    </div>
  );
};

export default ManageFlights;
