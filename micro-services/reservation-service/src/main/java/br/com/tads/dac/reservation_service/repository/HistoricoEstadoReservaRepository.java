package br.com.tads.dac.reservasservice.repository;

import br.com.tads.dac.reservasservice.model.HistoricoEstadoReserva;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HistoricoEstadoReservaRepository extends JpaRepository<HistoricoEstadoReserva, Long> {
}