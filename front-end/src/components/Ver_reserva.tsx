
'use client'

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

type Reserva = {
  id: string;
  dataHora: string;
  codigo: string;
  origem: string;
  destino: string;
  valorReais: number;
  milhas: number;
  estado: string;
};

export default function VerReserva() {
  const { id } = useParams();
  const [reserva, setReserva] = useState<Reserva | null>(null);

  useEffect(() => {
    async function fetchReserva() {
      const res = await fetch(`/api/reservas/${id}`);
      const data = await res.json();
      setReserva(data);
    }

    fetchReserva();
  }, [id]);

  if (!reserva) return <p className="p-4">Carregando reserva...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-8">
      <h1 className="text-2xl font-bold mb-4">Detalhes da Reserva</h1>
      <div className="space-y-2">
        <p><strong>Data/Hora:</strong> {new Date(reserva.dataHora).toLocaleString()}</p>
        <p><strong>Código:</strong> {reserva.codigo}</p>
        <p><strong>Origem:</strong> {reserva.origem}</p>
        <p><strong>Destino:</strong> {reserva.destino}</p>
        <p><strong>Valor Gasto (R$):</strong> {reserva.valorReais.toFixed(2)}</p>
        <p><strong>Milhas Gastas:</strong> {reserva.milhas}</p>
        <p><strong>Estado:</strong> {reserva.estado}</p>
      </div>
    </div>
  );
}
