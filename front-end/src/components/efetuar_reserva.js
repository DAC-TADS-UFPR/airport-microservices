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
  return (
    <div>
      <button onClick={handleSearch}>Buscar</button>
      <table>
        <thead>
          <tr>
            <th>Origem</th>
            <th>Destino</th>
            <th>Data/Hora</th>
            <th>Preço</th>
            <th>Selecionar</th>
          </tr>
        </thead>
        <tbody>
          {filteredFlights.map((flight) => (
            <tr key={flight.id}>
              <td>{flight.origin}</td>
              <td>{flight.destination}</td>
              <td>{flight.date} {flight.time}</td>
              <td>${flight.price}</td>
              <td><button onClick={() => setSelectedFlight(flight)}>Selecionar</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  const [selectedFlight, setSelectedFlight] = useState(null);

  return (
    <div>
      {!selectedFlight ? (
        <table> {/* Tabela de voos */} </table>
      ) : (
        <div>
          <h2>Detalhes da Reserva</h2>
          <p>Origem: {selectedFlight.origin}</p>
          <p>Destino: {selectedFlight.destination}</p>
          <p>Data/Hora: {selectedFlight.date} {selectedFlight.time}</p>
          <p>Preço: ${selectedFlight.price}</p>
          <button>Confirmar</button>
        </div>
      )}
    </div>
  );
  const [tickets, setTickets] = useState(1);
  const totalPrice = tickets * selectedFlight.price;
  
  return (
    <div>
      <p>Quantidade de passagens:</p>
      <input type="number" min="1" value={tickets} onChange={(e) => setTickets(Number(e.target.value))} />
      <p>Total: ${totalPrice}</p>
    </div>
  );
  const [balanceMiles, setBalanceMiles] = useState(50000);
  const [milesUsed, setMilesUsed] = useState(0);
  const [reservationCode, setReservationCode] = useState(null);
  
  const handleConfirmReservation = () => {
    const finalPrice = Math.max(0, totalPrice - milesUsed);
    setBalanceMiles(balanceMiles - milesUsed);
    setReservationCode("RES" + Math.floor(100 + Math.random() * 900));
  };
  
  return (
    <div>
      <p>Saldo de Milhas: {balanceMiles}</p>
      <input type="number" min="0" max={balanceMiles} value={milesUsed} onChange={(e) => setMilesUsed(Number(e.target.value))} />
      <p>Valor a pagar: ${totalPrice - milesUsed}</p>
      <button onClick={handleConfirmReservation}>Confirmar</button>
      {reservationCode && <p>Código de Reserva: {reservationCode}</p>}
    </div>
  );
          