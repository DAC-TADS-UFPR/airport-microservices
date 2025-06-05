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
type eserva = {
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
if (!reserva) return <p>Carregando...</p>;

return (
  <div className="max-w-xl mx-auto p-4 border rounded shadow">
    <h1 className="text-2xl font-bold mb-4">Cancelar Reserva</h1>

    <div className="mb-4">
      <p><strong>Origem:</strong> {reserva.voo.origem}</p>
      <p><strong>Destino:</strong> {reserva.voo.destino}</p>
      <p><strong>Data:</strong> {reserva.voo.data}</p>
      <p><strong>Milhas Gastas:</strong> {reserva.milhasGastas}</p>
      <p><strong>Valor Pago:</strong> R$ {reserva.valorPago}</p>
      <p><strong>Status:</strong> {reserva.status}</p>
    </div>
    <button
      onClick={cancelarReserva}
      disabled={!podeCancelar}
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:bg-gray-400"
    >
      Cancelar Reserva
    </button>
  </div>
);
{mensagem && <p className="mt-4 text-blue-700">{mensagem}</p>}
