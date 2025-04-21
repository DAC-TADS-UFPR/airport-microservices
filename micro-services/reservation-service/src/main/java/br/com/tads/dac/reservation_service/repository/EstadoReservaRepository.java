package br.com.tads.dac.reservasservice.repository;

import br.com.tads.dac.reservasservice.model.EstadoReserva;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface EstadoReservaRepository extends JpaRepository<EstadoReserva, Long> {
    Optional<EstadoReserva> findBySigla(String sigla);
}
