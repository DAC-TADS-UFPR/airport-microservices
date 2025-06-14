package br.com.tads.dac.flightservice.repositories;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.tads.dac.flightservice.models.entities.Flight;

@Repository
public interface FlightRepository extends JpaRepository<Flight, Long> {

    // Busca todos os voos cuja data (LocalDateTime) esteja entre dois instantes
    List<Flight> findAllByDataBetween(LocalDateTime start, LocalDateTime end);


    List<Flight> findAllByDataAfterAndAeroportoOrigem_CodigoAndAeroportoDestino_Codigo(
      LocalDateTime data, String origem, String destino);

    List<Flight> findAllByAeroportoOrigem_CodigoAndAeroportoDestino_Codigo(
        String codigoAeroportoOrigem,
        String codigoAeroportoDestino
    );

    List<Flight> findAllByDataAfter(LocalDateTime data);
}
