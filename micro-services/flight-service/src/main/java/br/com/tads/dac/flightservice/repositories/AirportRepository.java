package br.com.tads.dac.flightservice.repositories;

import br.com.tads.dac.flightservice.entities.Airport;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AirportRepository extends JpaRepository<Airport,String> {
    Optional<Airport> findByAirportCode(String airportCode);
}
