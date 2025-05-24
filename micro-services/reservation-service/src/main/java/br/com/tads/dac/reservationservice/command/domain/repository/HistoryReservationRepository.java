package br.com.tads.dac.reservationservice.command.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.tads.dac.reservationservice.command.domain.model.HistoryReservationState;

@Repository
public interface HistoryReservationRepository extends JpaRepository<HistoryReservationState, Long> {
}