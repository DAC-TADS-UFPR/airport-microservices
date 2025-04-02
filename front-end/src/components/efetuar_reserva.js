import { useState } from "react";

export default function FlightReservation() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Efetuar Reserva</h1>
      <input placeholder="Aeroporto Origem" value={origin} onChange={(e) => setOrigin(e.target.value)} />
      <input placeholder="Aeroporto Destino" value={destination} onChange={(e) => setDestination(e.target.value)} />
      <button>Buscar</button>
    </div>
  );
}
