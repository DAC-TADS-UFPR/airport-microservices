import "./UserHistory.scss";
import { FC } from "react";
import { formatDate } from "@/utils/formatDate";

interface UserHistoryProps {
  data?: any;
}

const mockedData = [
  {
    data: "2023-10-10",
    codigoReserva: "RES001",
    valor: 150,
    milhas: 2000,
    transactionType: "compra",
    tipo: "Crédito",
  },
  {
    data: "2023-10-11",
    codigoReserva: "RES002",
    valor: 250,
    milhas: 3000,
    transactionType: "reserva",
    origem: "REC",
    destino: "MAO",
    tipo: "Débito",
  },
  {
    data: "2023-10-12",
    codigoReserva: "RES003",
    valor: 350,
    milhas: 4000,
    transactionType: "reserva",
    origem: "CGH",
    destino: "CWB",
    tipo: "Crédito",
  },
  {
    data: "2023-10-13",
    codigoReserva: "RES004",
    valor: 180,
    milhas: 2200,
    transactionType: "compra",
    tipo: "Crédito",
  },
  {
    data: "2023-10-14",
    codigoReserva: "RES005",
    valor: 280,
    milhas: 3200,
    transactionType: "reserva",
    origem: "SSA",
    destino: "FOR",
    tipo: "Débito",
  },
  {
    data: "2023-10-15",
    codigoReserva: "RES006",
    valor: 380,
    milhas: 4200,
    transactionType: "reserva",
    origem: "BEL",
    destino: "RIO",
    tipo: "Crédito",
  },
  {
    data: "2023-10-16",
    codigoReserva: "RES007",
    valor: 200,
    milhas: 2500,
    transactionType: "compra",
    tipo: "Crédito",
  },
  {
    data: "2023-10-17",
    codigoReserva: "RES008",
    valor: 300,
    milhas: 3500,
    transactionType: "reserva",
    origem: "FLN",
    destino: "POA",
    tipo: "Débito",
  },
  {
    data: "2023-10-18",
    codigoReserva: "RES009",
    valor: 400,
    milhas: 4500,
    transactionType: "reserva",
    origem: "NAT",
    destino: "MAN",
    tipo: "Crédito",
  },
  {
    data: "2023-10-19",
    codigoReserva: "RES010",
    valor: 220,
    milhas: 2700,
    transactionType: "compra",
    tipo: "Crédito",
  },
];

const UserHistory: FC<UserHistoryProps> = ({ data }) => {
  return (
    <div className="userHistory">
      <div className="userHistory__title">Histórico</div>
      <div className="userHistory__content">
        {mockedData && mockedData.length > 0 ? (
          <table className="userHistory__table">
            <thead>
              <tr>
                <th>Data da Transação</th>
                <th>Código da Reserva</th>
                <th>Valor (R$)</th>
                <th>Quantidade de Milhas</th>
                <th>Descrição</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody>
              {mockedData.map((transacao, index) => {
                let descricao = "";
                if (transacao.transactionType === "compra") {
                  descricao = "COMPRA DE MILHAS";
                } else if (transacao.transactionType === "reserva") {
                  descricao = `${transacao.origem || ""} → ${transacao.destino || ""}`;
                }
                return (
                  <tr key={index}>
                    <td>{formatDate({ date: transacao.data, type: "date" })}</td>
                    <td>{transacao.codigoReserva || ""}</td>
                    <td>{transacao.valor}</td>
                    <td>{transacao.milhas}</td>
                    <td>{descricao}</td>
                    <td>{transacao.tipo}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p>Nenhum histórico disponível.</p>
        )}
      </div>
    </div>
  );
};

export default UserHistory;
