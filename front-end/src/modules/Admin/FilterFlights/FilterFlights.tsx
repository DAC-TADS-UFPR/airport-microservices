import React, { useState, useEffect, useMemo, ChangeEvent } from "react";

interface Flight {
  id: string;
  flightNumber: string;
  origin: string;
  destination: string;
  departureDate: string;
  arrivalDate: string;
  status: "Scheduled" | "Boarding" | "Departed" | "Arrived" | "Cancelled";
}

const ALL_STATUSES: Flight["status"][] = ["Scheduled", "Boarding", "Departed", "Arrived", "Cancelled"];

const fetchFlights = async (): Promise<Flight[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "1",
          flightNumber: "UA100",
          origin: "SFO",
          destination: "LAX",
          departureDate: "2024-07-01T08:00:00Z",
          arrivalDate: "2024-07-01T09:30:00Z",
          status: "Scheduled",
        },
        {
          id: "2",
          flightNumber: "DL200",
          origin: "JFK",
          destination: "LHR",
          departureDate: "2024-07-02T12:00:00Z",
          arrivalDate: "2024-07-02T22:00:00Z",
          status: "Departed",
        },
      ]);
    }, 500);
  });
};

const FilterFlights: React.FC = () => {
  const [allFlights, setAllFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filter state
  const [flightNumberFilter, setFlightNumberFilter] = useState<string>("");
  const [originFilter, setOriginFilter] = useState<string>("");
  const [destinationFilter, setDestinationFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<Flight["status"] | "">("");
  const [startDateFilter, setStartDateFilter] = useState<string>("");
  const [endDateFilter, setEndDateFilter] = useState<string>("");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchFlights();
        setAllFlights(data);
      } catch (e: any) {
        setError(e.message || "Failed to load flights");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filteredFlights = useMemo(() => {
    return allFlights.filter((f) => {
      if (flightNumberFilter && !f.flightNumber.toLowerCase().includes(flightNumberFilter.toLowerCase())) {
        return false;
      }
      if (originFilter && !f.origin.toLowerCase().includes(originFilter.toLowerCase())) {
        return false;
      }
      if (destinationFilter && !f.destination.toLowerCase().includes(destinationFilter.toLowerCase())) {
        return false;
      }
      if (statusFilter && f.status !== statusFilter) {
        return false;
      }
      if (startDateFilter) {
        const dt = new Date(f.departureDate).getTime();
        const sd = new Date(startDateFilter).getTime();
        if (dt < sd) return false;
      }
      if (endDateFilter) {
        const dt = new Date(f.departureDate).getTime();
        const ed = new Date(endDateFilter).getTime();
        if (dt > ed) return false;
      }
      return true;
    });
  }, [allFlights, flightNumberFilter, originFilter, destinationFilter, statusFilter, startDateFilter, endDateFilter]);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "flightNumber":
        setFlightNumberFilter(value);
        break;
      case "origin":
        setOriginFilter(value);
        break;
      case "destination":
        setDestinationFilter(value);
        break;
      case "status":
        setStatusFilter(value as Flight["status"] | "");
        break;
      case "startDate":
        setStartDateFilter(value);
        break;
      case "endDate":
        setEndDateFilter(value);
        break;
    }
  };

  if (loading) return <div>Loading flights...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Filter Flights</h2>
      <form
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
          marginBottom: "1.5rem",
        }}
        onSubmit={(e) => e.preventDefault()}
      >
        <div>
          <label>Flight Number</label>
          <input type="text" name="flightNumber" value={flightNumberFilter} onChange={onChange} />
        </div>
        <div>
          <label>Origin</label>
          <input type="text" name="origin" value={originFilter} onChange={onChange} />
        </div>
        <div>
          <label>Destination</label>
          <input type="text" name="destination" value={destinationFilter} onChange={onChange} />
        </div>
        <div>
          <label>Status</label>
          <select name="status" value={statusFilter} onChange={onChange}>
            <option value="">All</option>
            {ALL_STATUSES.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Departure From</label>
          <input type="date" name="startDate" value={startDateFilter} onChange={onChange} />
        </div>
        <div>
          <label>Departure To</label>
          <input type="date" name="endDate" value={endDateFilter} onChange={onChange} />
        </div>
      </form>
      <table width="100%" border={1} cellPadding={5} cellSpacing={0}>
        <thead>
          <tr>
            <th>Flight #</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>Departure</th>
            <th>Arrival</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredFlights.length === 0 && (
            <tr>
              <td colSpan={6} style={{ textAlign: "center" }}>
                No flights match the current filters.
              </td>
            </tr>
          )}
          {filteredFlights.map((f) => (
            <tr key={f.id}>
              <td>{f.flightNumber}</td>
              <td>{f.origin}</td>
              <td>{f.destination}</td>
              <td>{new Date(f.departureDate).toLocaleString()}</td>
              <td>{new Date(f.arrivalDate).toLocaleString()}</td>
              <td>{f.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: "1rem" }}>
        Showing {filteredFlights.length} of {allFlights.length} flights.
      </div>
    </div>
  );
};

export default FilterFlights;
