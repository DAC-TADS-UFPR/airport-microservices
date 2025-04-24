
import { useState } from "react";

type Reserva = {
  codigo: string;
  origem: string;
  destino: string;
  dataHora: string;
  valorGasto: number;
  milhasGastas: number;
  estadoVoo: string;
};

export default function ConsultaReserva() {
  const [codigo, setCodigo] = useState("");
  const [reserva, setReserva] = useState<Reserva | null>(null);
  const [erro, setErro] = useState("");

  const buscarReserva = async () => {
    setErro("");
    setReserva(null);
    try {
      const res = await fetch(`/api/reservas/${codigo}`);
      if (!res.ok) throw new Error("Reserva não encontrada");
      const dados = await res.json();
      setReserva(dados);
    } catch (err: any) {
      setErro(err.message);
    }
  };

  const podeFazerCheckin = (dataHora: string) => {
    const horaVoo = new Date(dataHora).getTime();
    const agora = Date.now();
    const diff = horaVoo - agora;
    return diff <= 48 * 60 * 60 * 1000 && diff > 0;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">Consultar Reserva</h1>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Digite o código da reserva"
          className="border rounded px-4 py-2"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
        />
        <button
          onClick={buscarReserva}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Buscar
        </button>
      </div>

      {erro && <p className="text-red-500 mb-4">{erro}</p>}

      {reserva && (
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-2">
          <p><strong>Código:</strong> {reserva.codigo}</p>
          <p><strong>Origem:</strong> {reserva.origem}</p>
          <p><strong>Destino:</strong> {reserva.destino}</p>
          <p><strong>Data/Hora:</strong> {new Date(reserva.dataHora).toLocaleString()}</p>
          <p><strong>Valor Gasto:</strong> R$ {reserva.valorGasto.toFixed(2)}</p>
          <p><strong>Milhas Gastas:</strong> {reserva.milhasGastas}</p>
          <p><strong>Estado do Voo:</strong> {reserva.estadoVoo}</p>

          <div className="mt-4 flex gap-3">
            {podeFazerCheckin(reserva.dataHora) && (
              <button className="bg-green-600 text-white px-4 py-2 rounded">
                Fazer Check-in
              </button>
            )}
            <button className="bg-red-600 text-white px-4 py-2 rounded">
              Cancelar Reserva
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
