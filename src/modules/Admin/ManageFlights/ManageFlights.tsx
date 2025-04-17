import "./ManageFlights.scss";
import { FC } from "react";
import { formatDate } from "@/utils/formatDate";
import { useModal } from "@/components/Provider/ModalProvider/ModalProvider";
import formatFloat from "@/utils/formatFloat";
import formatToMoney from "@/utils/formatToMoney";
import ModalNewFlight from "../ModalNewFlight/ModalNewFlight";
import ButtonDefault from "@/components/Buttons/ButtonDefault/ButtonDefault";

interface ManageFlightsProps {
  data?: any;
}

const mockedData = [
  {
    code: "RES001",
    dateHour: "2023-10-10T10:00:00",
    origin: "CWB - Curitiba",
    destination: "GRU - São Paulo",
    price: 50000,
    seatsReserved: 100,
    seatsTotal: 175,
    status: "CONFIRMADO",
  },
  {
    code: "RES002",
    dateHour: "2023-10-11T12:30:00",
    origin: "BSB - Brasília",
    destination: "GIG - Rio de Janeiro",
    price: 65000,
    seatsReserved: 80,
    seatsTotal: 150,
    status: "PENDENTE",
  },
  {
    code: "RES003",
    dateHour: "2023-10-12T15:45:00",
    origin: "POA - Porto Alegre",
    destination: "SSA - Salvador",
    price: 78000,
    seatsReserved: 120,
    seatsTotal: 180,
    status: "CONFIRMADO",
  },
  {
    code: "RES004",
    dateHour: "2023-10-13T09:00:00",
    origin: "FOR - Fortaleza",
    destination: "REC - Recife",
    price: 42000,
    seatsReserved: 60,
    seatsTotal: 140,
    status: "CANCELADO",
  },
  {
    code: "RES005",
    dateHour: "2023-10-14T18:20:00",
    origin: "VIX - Vitória",
    destination: "CWB - Curitiba",
    price: 54000,
    seatsReserved: 110,
    seatsTotal: 175,
    status: "CONFIRMADO",
  },
  {
    code: "RES006",
    dateHour: "2023-10-15T07:15:00",
    origin: "GRU - São Paulo",
    destination: "BSB - Brasília",
    price: 30000,
    seatsReserved: 90,
    seatsTotal: 160,
    status: "PENDENTE",
  },
  {
    code: "RES007",
    dateHour: "2023-10-16T20:00:00",
    origin: "MAO - Manaus",
    destination: "BEL - Belém",
    price: 92000,
    seatsReserved: 50,
    seatsTotal: 150,
    status: "CONFIRMADO",
  },
  {
    code: "RES008",
    dateHour: "2023-10-17T14:10:00",
    origin: "GIG - Rio de Janeiro",
    destination: "POA - Porto Alegre",
    price: 66000,
    seatsReserved: 140,
    seatsTotal: 180,
    status: "CANCELADO",
  },
  {
    code: "RES009",
    dateHour: "2023-10-18T11:30:00",
    origin: "REC - Recife",
    destination: "FOR - Fortaleza",
    price: 48000,
    seatsReserved: 75,
    seatsTotal: 145,
    status: "CONFIRMADO",
  },
  {
    code: "RES010",
    dateHour: "2023-10-19T16:40:00",
    origin: "SSA - Salvador",
    destination: "VIX - Vitória",
    price: 53000,
    seatsReserved: 95,
    seatsTotal: 155,
    status: "PENDENTE",
  },
  {
    code: "RES011",
    dateHour: "2023-10-20T08:50:00",
    origin: "CGR - Campo Grande",
    destination: "CWB - Curitiba",
    price: 71000,
    seatsReserved: 85,
    seatsTotal: 160,
    status: "CONFIRMADO",
  },
  {
    code: "RES012",
    dateHour: "2023-10-21T13:25:00",
    origin: "POA - Porto Alegre",
    destination: "GIG - Rio de Janeiro",
    price: 64000,
    seatsReserved: 130,
    seatsTotal: 180,
    status: "CANCELADO",
  },
  {
    code: "RES013",
    dateHour: "2023-10-22T19:55:00",
    origin: "GRU - São Paulo",
    destination: "MAO - Manaus",
    price: 102000,
    seatsReserved: 70,
    seatsTotal: 150,
    status: "CONFIRMADO",
  },
  {
    code: "RES014",
    dateHour: "2023-10-23T06:20:00",
    origin: "BSB - Brasília",
    destination: "REC - Recife",
    price: 58000,
    seatsReserved: 100,
    seatsTotal: 170,
    status: "PENDENTE",
  },
  {
    code: "RES015",
    dateHour: "2023-10-24T17:35:00",
    origin: "VIX - Vitória",
    destination: "FOR - Fortaleza",
    price: 49000,
    seatsReserved: 65,
    seatsTotal: 140,
    status: "CONFIRMADO",
  },
  {
    code: "RES016",
    dateHour: "2023-10-25T12:00:00",
    origin: "CWB - Curitiba",
    destination: "SSA - Salvador",
    price: 77000,
    seatsReserved: 115,
    seatsTotal: 175,
    status: "CANCELADO",
  },
  {
    code: "RES017",
    dateHour: "2023-10-26T21:10:00",
    origin: "GIG - Rio de Janeiro",
    destination: "POA - Porto Alegre",
    price: 68000,
    seatsReserved: 125,
    seatsTotal: 180,
    status: "CONFIRMADO",
  },
  {
    code: "RES018",
    dateHour: "2023-10-27T09:45:00",
    origin: "FOR - Fortaleza",
    destination: "BSB - Brasília",
    price: 43000,
    seatsReserved: 55,
    seatsTotal: 145,
    status: "PENDENTE",
  },
  {
    code: "RES019",
    dateHour: "2023-10-28T15:05:00",
    origin: "MAO - Manaus",
    destination: "GRU - São Paulo",
    price: 94000,
    seatsReserved: 95,
    seatsTotal: 155,
    status: "CONFIRMADO",
  },
  {
    code: "RES020",
    dateHour: "2023-10-29T11:15:00",
    origin: "BEL - Belém",
    destination: "CGR - Campo Grande",
    price: 81000,
    seatsReserved: 80,
    seatsTotal: 160,
    status: "CANCELADO",
  },
];

const ManageFlights: FC<ManageFlightsProps> = ({}) => {
  const { openModal } = useModal();

  const handleNewFlight = () => {
    openModal({
      headerName: "Criar novo voo",
      children: <ModalNewFlight />,
    });
  };

  return (
    <div className="manageFlights">
      <div className="manageFlights__header">
        <div className="manageFlights__title">Gerenciar voos</div>
        <ButtonDefault children="Criar um voo" style={{ width: "auto" }} onClick={handleNewFlight} />
      </div>
      <div className="manageFlights__content">
        {mockedData && mockedData.length > 0 ? (
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
              {[...mockedData]
                .sort((a, b) => new Date(b.dateHour).getTime() - new Date(a.dateHour).getTime())
                .map((flight, index) => (
                  <tr key={index}>
                    <td>{flight?.code || ""}</td>
                    <td>{formatDate({ date: flight?.dateHour, type: "dateHour" })}</td>
                    <td>{flight?.origin}</td>
                    <td>{flight?.destination}</td>
                    <td>
                      R$ {formatToMoney(flight?.price)} / {formatFloat(formatToMoney(flight?.price) * 0.2)} Milhas
                    </td>
                    <td>
                      {flight?.seatsReserved} / {flight?.seatsTotal}
                    </td>
                    <td>{flight.status}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <p>Nenhum histórico disponível.</p>
        )}
      </div>
    </div>
  );
};

export default ManageFlights;
