// src/modules/User/UserHistory/UserHistory.tsx
"use client";

import { FC, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { formatDate } from "@/utils/formatDate";
import { getMiles } from "@/data/config/client";
import "./UserHistory.scss";

interface TransacaoDTO {
  data: string;
  valor_reais: number;
  quantidade_milhas: number;
  descricao: string;
  codigo_reserva: string;
  tipo: "ENTRADA" | "SAIDA";
}

interface ClienteTransacoesResponseDTO {
  codigo: number;
  saldo_milhas: number;
  transacoes: TransacaoDTO[];
}

const UserHistory: FC = () => {
  const { id } = useParams();

  const {
    data: historicoData,
    isLoading,
    isError,
  } = useQuery<ClienteTransacoesResponseDTO, Error>({
    queryKey: ["transacoes-milhas", id],
    queryFn: getMiles,
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  const transacoes = useMemo(
    () => historicoData?.transacoes || [],
    [historicoData]
  );
console.log(historicoData)
  if (isLoading) {
    return <p className="userHistory__status">Carregando histórico...</p>;
  }

  if (isError) {
    return <p className="userHistory__status">Erro ao carregar histórico.</p>;
  }

  return (
    <div className="userHistory">
      <div className="userHistory__title">Histórico</div>
      <div className="userHistory__content">
        {transacoes.length > 0 ? (
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
              {transacoes.map((transacao, index) => (
                <tr key={index}>
                  <td>
                    {formatDate({
                      date: transacao.data,
                      type: "dateHour",
                    })}
                  </td>
                  <td>{transacao.codigo_reserva || "-"}</td>
                  <td>
                    {transacao.valor_reais?.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                  <td>
                    {transacao.quantidade_milhas?.toLocaleString("pt-BR")}
                  </td>
                  <td>{transacao.descricao}</td>
                  <td>
                    {transacao.tipo === "ENTRADA" ? "Crédito" : "Débito"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="userHistory__empty">Nenhum histórico disponível.</p>
        )}
      </div>
    </div>
  );
};

export default UserHistory;
