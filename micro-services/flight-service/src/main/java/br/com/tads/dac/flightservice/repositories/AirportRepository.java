package br.com.tads.dac.flightservice.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.tads.dac.flightservice.models.entities.Airport;

import java.util.Optional;

@Repository
public interface AirportRepository extends JpaRepository<Airport,String> {

    Optional<Airport> findByCodigo(String codigo);
}
