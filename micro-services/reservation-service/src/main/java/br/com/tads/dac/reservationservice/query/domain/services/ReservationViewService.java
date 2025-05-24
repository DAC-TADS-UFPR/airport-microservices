package br.com.tads.dac.reservationservice.query.domain.services;

import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import br.com.tads.dac.reservationservice.query.domain.exceptions.ReservationNotFoundException;
import br.com.tads.dac.reservationservice.query.domain.models.dto.ReservationDTO;
import br.com.tads.dac.reservationservice.query.domain.repositories.ReservationViewRepository;

@Service
@RequiredArgsConstructor
public class ReservationViewService {
    
    private final ReservationViewRepository reservationViewRepository;

    public ReservationDTO getById(String codigo) {
        return reservationViewRepository.findById(codigo)
                .map(reservation -> ReservationDTO.builder()
                        .codigo(reservation.getCodigo())
                        .codigoVoo(reservation.getCodigoVoo())
                        .codigoCliente(reservation.getCodigoCliente())
                        .estado(reservation.getEstado())
                        .valor(reservation.getValor())
                        .milhasUtilizadas(reservation.getMilhasUtilizadas())
                        .codigoAeroportoOrigem(reservation.getCodigoAeroportoOrigem())
                        .codigoAeroPortoDestino(reservation.getCodigoAeroPortoDestino())
                        .criadoEm(reservation.getCriadoEm())
                        .atualizadoEm(reservation.getAtualizadoEm())
                        .build())
                .orElseThrow(ReservationNotFoundException::new);
    }
}
