package br.com.tads.dac.reservationservice.query.infraestructure.consumers;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import br.com.tads.dac.reservationservice.command.domain.model.dto.ReservationDTO;
import br.com.tads.dac.reservationservice.config.RabbitMQConfig;
import br.com.tads.dac.reservationservice.query.domain.models.entities.ReservationView;
import br.com.tads.dac.reservationservice.query.domain.repositories.ReservationViewRepository;

@Component
public class ReservationEventListener {

    private final ReservationViewRepository viewRepository;

    public ReservationEventListener(ReservationViewRepository viewRepository) {
        this.viewRepository = viewRepository;
    }

    @RabbitListener(queues = RabbitMQConfig.QUERY_QUEUE)
    public void onReservationCreated(ReservationDTO dto) {
        try {
            ReservationView view = viewRepository.findById(dto.getCodigo())
            .map(existing -> {
                existing.setCodigoVoo(dto.getCodigoVoo());
                existing.setCodigoCliente(dto.getCodigoCliente());
                existing.setEstado(dto.getEstado());
                existing.setValor(dto.getValor());
                existing.setMilhasUtilizadas(dto.getMilhasUtilizadas());
                existing.setCodigoAeroportoOrigem(dto.getCodigoAeroportoOrigem());
                existing.setCodigoAeroportoDestino(dto.getCodigoAeroportoDestino());
                return existing;
            })
            .orElseGet(() -> ReservationView.builder()
                .codigo(dto.getCodigo())
                .codigoVoo(dto.getCodigoVoo())
                .codigoCliente(dto.getCodigoCliente())
                .estado(dto.getEstado())
                .valor(dto.getValor())
                .milhasUtilizadas(dto.getMilhasUtilizadas())
                .codigoAeroportoOrigem(dto.getCodigoAeroportoOrigem())
                .codigoAeroportoDestino(dto.getCodigoAeroportoDestino())
                .build()
            );

        viewRepository.save(view);
        } catch (Exception e) {
            // Log the error or handle it as needed
            System.err.println("Error processing reservation event: " + e.getMessage());
        }
    }

}
