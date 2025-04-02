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
const flights = [
    { id: 1, origin: "GRU", destination: "JFK", date: "2025-04-10", time: "14:00", price: 500, miles: 25000 },
    { id: 2, origin: "GRU", destination: "LAX", date: "2025-04-12", time: "10:00", price: 600, miles: 30000 },
  ];
  
  export default function FlightReservation() {
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [filteredFlights, setFilteredFlights] = useState([]);
  
    const handleSearch = () => {
      setFilteredFlights(
        flights.filter(
          (f) =>
            (!origin || f.origin.includes(origin.toUpperCase())) &&
            (!destination || f.destination.includes(destination.toUpperCase()))
        )
      );
    };
  
    return (
      <div>
        <input placeholder="Aeroporto Origem" value={origin} onChange={(e) => setOrigin(e.target.value)} />
        <input placeholder="Aeroporto Destino" value={destination} onChange={(e) => setDestination(e.target.value)} />
        <button onClick={handleSearch}>Buscar</button>
      </div>
    );
  }
  