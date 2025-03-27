import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { fetchReserva } from "@/api/cliente";

const VerReserva = () => {
  const { codigo } = useParams();
  const [reserva, setReserva] = useState(null);

  useEffect(() => {
    fetchReserva(codigo).then(setReserva);
  }, [codigo]);

  if (!reserva) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="p-4">
      <Card>
        <CardContent>
          <h2 className="text-xl font-bold mb-2">Detalhes da Reserva</h2>
          <p><strong>Código:</strong> {reserva.codigo}</p>
          <p><strong>Data/Hora:</strong> {reserva.dataHora}</p>
          <p><strong>Origem:</strong> {reserva.origem}</p>
          <p><strong>Destino:</strong> {reserva.destino}</p>
          <p><strong>Valor Gasto (R$):</strong> {reserva.valorReais}</p>
          <p><strong>Milhas Gastas:</strong> {reserva.milhasGastas}</p>
          <p><strong>Estado:</strong> {reserva.estado}</p>
        </CardContent>
      </Card>
      <Button className="mt-4" onClick={() => window.history.back()}>Voltar</Button>
    </div>
  );
};

export default VerReserva;
