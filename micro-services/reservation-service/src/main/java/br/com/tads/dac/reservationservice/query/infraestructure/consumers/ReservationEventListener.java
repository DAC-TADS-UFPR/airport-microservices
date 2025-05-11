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
        ReservationView view = ReservationView.builder()
        .id(dto.id())
        .flightId(dto.flightId())
        .clientId(dto.clientId())
        .estado(dto.estado())
        .pricePaid(dto.pricePaid())
        .milesUsed(dto.milesUsed())
        .origin(dto.origin())
        .destiny(dto.destiny())
        .createdAt(dto.createdAt())
        .updatedAt(dto.updatedAt())
        .build();
        viewRepository.save(view);
    }
}
