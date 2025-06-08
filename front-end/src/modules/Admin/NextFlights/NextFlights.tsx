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
import { Flight } from "@/models/flight";
interface NextFlightsProps {
  data?: any;
}

const NextFlights: FC<NextFlightsProps> = () => {
  const { openModal } = useModal();

  const confirmBording = (id_voo:string) => {
    openModal({
      headerName: "Confirmar embarque do passageiro",
      children: <ModalConfirmBoarding id_voo={id_voo}/>,
    });
  };

  const cancelFlight = (id_voo:string) => {
    openModal({
      headerName: "Cancelar voo",
      children: <ModalCancelFlight id_voo={id_voo}/>,
    });
  };

  const confirmFlight = (id_voo:string) => {
    openModal({
      headerName: "Confirmar realização do voo",
      children: <ModalConfirmFlight id_voo={id_voo} />,
    });
  };

  const agora = new Date();

  const dataInicial = format(new Date(), 'yyyy-MM-dd');

  const dataFinal = format(addHours(new Date(), 48), 'yyyy-MM-dd'); 

   const { data, isLoading, isError, error } = useQuery({
    queryKey: ["next-flights", { dataInicial, dataFinal }],
    queryFn: getFlights,
    refetchOnWindowFocus: false,
    enabled: true,
  });

  const flights: Flight[] = Array.isArray(data?.voos) ? data.voos : [];
  
  return (
    <div className="nextFlights">
      <div className="nextFlights__title">voos (48H)</div>
      <div className="nextFlights__content">
        {isLoading && <p>Carregando próximos voos...</p>}
        {isError && (
          <p>
            Ocorreu um erro ao buscar voos. Tente novamente mais tarde.{" "}
          </p>
        )}
        {flights && flights.length > 0 ? (
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
              {[...flights]
                .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
                .map((voo, index) => (
                  <tr key={index}>
                    <td>{voo?.codigo || ""}</td>
                    <td>{formatDate({ date: voo?.data, type: "dateHour" })}</td>
                    <td>{voo?.aeroporto_origem?.codigo}</td>
                    <td>{voo?.aeroporto_destino?.codigo}</td>
                    <td>{voo?.estado}</td>
                    <td className="nextFlights__actions">
                      {
                        voo.estado == "CONFIRMADO" && (
                          <>
                            <ButtonDefault children="Confirmar passageiro" size="small" color="green" onClick={() => confirmBording(voo.codigo)} />
                            <ButtonDefault children="Cancelar" size="small" color="red" onClick={() => cancelFlight(voo.codigo)} />
                            <ButtonDefault children="Realizar voo" size="small" onClick={() => confirmFlight(voo.codigo)} />
                          </>
                        )
                      }
                      
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
