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
  const [reserva, setReserva] = useState<Reserva | null>(null);

useEffect(() => {
  if (id) {
    fetch(`/api/reservas/${id}`)
      .then(res => res.json())
      .then(data => setReserva(data));
  }
}, [id]);
const podeCancelar = reserva?.status === 'CRIADA' || reserva?.status === 'CHECK-IN';
const [mensagem, setMensagem] = useState('');

const cancelarReserva = async () => {
  if (!podeCancelar) {
    setMensagem("Esta reserva não pode ser cancelada.");
    return;
  }

  const res = await fetch(`/api/reservas/${id}/cancelar`, {
    method: 'POST',
  });

  if (res.ok) {
    setMensagem("Reserva cancelada com sucesso.");
    router.push('/minhas-reservas');
  } else {
    setMensagem("Erro ao cancelar a reserva.");
  }
};
