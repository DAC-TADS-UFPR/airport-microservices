package br.com.tads.dac.flightservice.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.tads.dac.flightservice.models.entities.Flight;
@Repository
public interface FlightRepository extends JpaRepository<Flight,String> {

}
