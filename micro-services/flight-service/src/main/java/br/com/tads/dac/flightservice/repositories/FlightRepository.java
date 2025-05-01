package br.com.tads.dac.flightservice.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.tads.dac.flightservice.models.entities.Flight;

public interface FlightRepository extends JpaRepository<Flight,Long> {
}
