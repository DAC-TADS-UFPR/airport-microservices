package br.com.tads.dac.reservationservice.query.domain.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.tads.dac.reservationservice.command.domain.model.Reservation;
import br.com.tads.dac.reservationservice.query.domain.models.entities.ReservationView;

@Repository
public interface ReservationViewRepository extends JpaRepository<ReservationView, String> {

    List<Reservation> findByCodigoCliente(String codigoCliente);
    
}
