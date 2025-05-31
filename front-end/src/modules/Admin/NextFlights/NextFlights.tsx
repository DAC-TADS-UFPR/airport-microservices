import "./NextFlights.scss";
import { FC } from "react";
import { formatDate } from "@/utils/formatDate";
import { useModal } from "@/components/Provider/ModalProvider/ModalProvider";
import ModalCancelFlight from "../ModalCancelFlight/ModalCancelFlight";
import ModalConfirmFlight from "../ModalConfirmFlight/ModalConfirmFlight";
import ButtonDefault from "@/components/Buttons/ButtonDefault/ButtonDefault";
import ModalConfirmBoarding from "../ModalConfirmBoarding/ModalConfirmBoarding";
import { useQuery } from "@tanstack/react-query";
import { getFlights } from "@/data/config/flight";
import { addHours, format  } from 'date-fns';
interface NextFlightsProps {
  data?: any;
}

const mockedData = [
  {
    code: "RES001",
    dateHour: "2023-10-10T10:00:00",
    origin: "CWB - Curitiba",
    destination: "GRU - São Paulo",
    status: "CONFIRMADO",
  },
  {
    code: "RES002",
    dateHour: "2023-10-11T11:00:00",
    origin: "SSA - Salvador",
    destination: "CNF - Belo Horizonte",
    status: "PENDENTE",
  },
  {
    code: "RES003",
    dateHour: "2023-10-12T12:00:00",
    origin: "POA - Porto Alegre",
    destination: "GIG - Rio de Janeiro",
    status: "CANCELADO",
  },
  {
    code: "RES004",
    dateHour: "2023-10-13T13:00:00",
    origin: "FOR - Fortaleza",
    destination: "REC - Recife",
    status: "CONFIRMADO",
  },
  {
    code: "RES005",
    dateHour: "2023-10-14T14:00:00",
    origin: "BEL - Belém",
    destination: "CGB - Cuiabá",
    status: "EM ANDAMENTO",
  },
  {
    code: "RES006",
    dateHour: "2023-10-15T15:00:00",
    origin: "MAO - Manaus",
    destination: "NAT - Natal",
    status: "PENDENTE",
  },
  {
    code: "RES007",
    dateHour: "2023-10-16T16:00:00",
    origin: "FLN - Florianópolis",
    destination: "THE - Teresina",
    status: "CONFIRMADO",
  },
  {
    code: "RES008",
    dateHour: "2023-10-17T17:00:00",
    origin: "SLZ - São Luís",
    destination: "VIX - Vitória",
    status: "PENDENTE",
  },
  {
    code: "RES009",
    dateHour: "2023-10-18T18:00:00",
    origin: "CGB - Cuiabá",
    destination: "FOR - Fortaleza",
    status: "CANCELADO",
  },
  {
    code: "RES010",
    dateHour: "2023-10-19T19:00:00",
    origin: "REC - Recife",
    destination: "POA - Porto Alegre",
    status: "CONFIRMADO",
  },
  {
    code: "RES011",
    dateHour: "2023-10-20T20:00:00",
    origin: "GIG - Rio de Janeiro",
    destination: "SSA - Salvador",
    status: "EM ANDAMENTO",
  },
  {
    code: "RES012",
    dateHour: "2023-10-21T21:00:00",
    origin: "NAT - Natal",
    destination: "MAO - Manaus",
    status: "PENDENTE",
  },
  {
    code: "RES013",
    dateHour: "2023-10-22T22:00:00",
    origin: "THE - Teresina",
    destination: "SLZ - São Luís",
    status: "CONFIRMADO",
  },
  {
    code: "RES014",
    dateHour: "2023-10-23T23:00:00",
    origin: "VIX - Vitória",
    destination: "FLN - Florianópolis",
    status: "CANCELADO",
  },
  {
    code: "RES015",
    dateHour: "2023-10-24T09:00:00",
    origin: "CNF - Belo Horizonte",
    destination: "BEL - Belém",
    status: "CONFIRMADO",
  },
  {
    code: "RES016",
    dateHour: "2023-10-25T08:30:00",
    origin: "GRU - São Paulo",
    destination: "CWB - Curitiba",
    status: "EM ANDAMENTO",
  },
];

const NextFlights: FC<NextFlightsProps> = () => {
  const { openModal } = useModal();

  const confirmBording = () => {
    openModal({
      headerName: "Confirmar embarque do passageiro",
      children: <ModalConfirmBoarding />,
    });
  };

  const cancelFlight = () => {
    openModal({
      headerName: "Cancelar voo",
      children: <ModalCancelFlight />,
    });
  };

  const confirmFlight = () => {
    openModal({
      headerName: "Confirmar realização do voo",
      children: <ModalConfirmFlight />,
    });
  };

  const agora = new Date();
  const daqui48h = addHours(agora, 48);

  const dataInicial = format(new Date(), 'yyyy-MM-dd');

  const dataFinal = format(addHours(new Date(), 48), 'yyyy-MM-dd'); 

   const { data, isLoading } = useQuery({
    queryKey: [`_`, 
      {
      dataInicial,
      dataFinal
    }
    ],
    queryFn: getFlights,

    refetchOnWindowFocus: false,
    enabled: true,
  });

  console.log("Dados dos voos:", data);
  
  return (
    <div className="nextFlights">
      <div className="nextFlights__title">Próximos voos (48H)</div>
      <div className="nextFlights__content">
        {mockedData && mockedData.length > 0 ? (
          <table className="nextFlights__table">
            <thead>
              <tr>
                <th>Código do voo</th>
                <th>Data/Hora</th>
                <th>Origem</th>
                <th>Destino</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {[...mockedData]
                .sort((a, b) => new Date(b.dateHour).getTime() - new Date(a.dateHour).getTime())
                .map((transacao, index) => (
                  <tr key={index}>
                    <td>{transacao?.code || ""}</td>
                    <td>{formatDate({ date: transacao?.dateHour, type: "dateHour" })}</td>
                    <td>{transacao?.origin}</td>
                    <td>{transacao?.destination}</td>
                    <td>{transacao?.status}</td>
                    <td className="nextFlights__actions">
                      <ButtonDefault children="Confirmar passageiro" size="small" color="green" onClick={confirmBording} />
                      <ButtonDefault children="Cancelar" size="small" color="red" onClick={cancelFlight} />
                      <ButtonDefault children="Realizar voo" size="small" onClick={confirmFlight} />
                    </td>
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

export default NextFlights;
