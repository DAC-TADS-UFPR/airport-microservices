package br.com.tads.dac.reservationservice.repository;

import br.com.tads.dac.reservationservice.model.HistoryReservationState;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HistoryReservationRepository extends JpaRepository<HistoryReservationState, Long> {
}