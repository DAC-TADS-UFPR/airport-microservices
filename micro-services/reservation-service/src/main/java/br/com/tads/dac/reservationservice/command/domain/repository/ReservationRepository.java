package br.com.tads.dac.reservationservice.command.domain.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.tads.dac.reservationservice.command.domain.model.Reservation;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
     List<Reservation> findByCodigoVoo(Long codigoVoo);
}