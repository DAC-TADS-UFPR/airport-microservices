package br.com.tads.dac.reservationservice.command.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.tads.dac.reservationservice.command.domain.model.HistoryReservationState;

public interface HistoryReservationRepository extends JpaRepository<HistoryReservationState, Long> {
}