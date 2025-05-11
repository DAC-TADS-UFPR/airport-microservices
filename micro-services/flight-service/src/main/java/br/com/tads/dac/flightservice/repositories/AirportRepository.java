package br.com.tads.dac.flightservice.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.tads.dac.flightservice.models.entities.Airport;

import java.util.Optional;

public interface AirportRepository extends JpaRepository<Airport,String> {
    Optional<Airport> findByAirportCode(String airportCode);
}
