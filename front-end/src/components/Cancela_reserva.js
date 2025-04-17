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
