package br.com.tads.dac.reservationservice.query.domain.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import br.com.tads.dac.reservationservice.command.domain.model.Reservation;
import br.com.tads.dac.reservationservice.query.domain.exceptions.ReservationNotFoundException;
import br.com.tads.dac.reservationservice.query.domain.models.dto.ReservationDTO;
import br.com.tads.dac.reservationservice.query.domain.models.entities.ReservationView;
import br.com.tads.dac.reservationservice.query.domain.repositories.ReservationViewRepository;

@Service
@RequiredArgsConstructor
public class ReservationViewService {
    
    private final ReservationViewRepository reservationViewRepository;

    public ReservationDTO getById(Long codigo) {
        return reservationViewRepository.findById(codigo)
                .map(reservation -> ReservationDTO.builder()
                        .codigo(reservation.getCodigo())
                        .codigoVoo(reservation.getCodigoVoo())
                        .codigoCliente(reservation.getCodigoCliente())
                        .estado(reservation.getEstado())
                        .valor(reservation.getValor())
                        .milhasUtilizadas(reservation.getMilhasUtilizadas())
                        .codigoAeroportoOrigem(reservation.getCodigoAeroportoOrigem())
                        .codigoAeroportoDestino(reservation.getCodigoAeroportoDestino())
                        .criadoEm(reservation.getCriadoEm())
                        .atualizadoEm(reservation.getAtualizadoEm())
                        .build())
                .orElseThrow(ReservationNotFoundException::new);
    }

    public List<ReservationDTO> getByClientId(String codigoCliente) {
        List<ReservationView> reservas = reservationViewRepository.findByCodigoCliente(codigoCliente);

        return reservas.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private ReservationDTO mapToDTO(ReservationView r) {
        return ReservationDTO.builder()
                .codigo(r.getCodigo())
                .codigoVoo(r.getCodigoVoo())
                .codigoCliente(r.getCodigoCliente())
                .estado(r.getEstado())
                .valor(r.getValor())
                .milhasUtilizadas(r.getMilhasUtilizadas())
                .codigoAeroportoOrigem(r.getCodigoAeroportoOrigem())
                .codigoAeroportoDestino(r.getCodigoAeroportoDestino())
                .criadoEm(r.getCriadoEm())
                .atualizadoEm(r.getAtualizadoEm())
                .build();
    }
}
