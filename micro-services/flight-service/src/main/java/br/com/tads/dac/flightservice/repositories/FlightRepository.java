package br.com.tads.dac.flightservice.repositories;

import br.com.tads.dac.flightservice.entities.Flight;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FlightRepository extends JpaRepository<Flight,Long> {
}
