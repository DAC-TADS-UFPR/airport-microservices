import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function CancelarReserva() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>Cancelar Reserva</h1>
    </div>
  );
}
type Reserva = {
    id: string;
    status: string;
    voo: {
      origem: string;
      destino: string;
      data: string;
    };
    milhasGastas: number;
    valorPago: number;
  };
  