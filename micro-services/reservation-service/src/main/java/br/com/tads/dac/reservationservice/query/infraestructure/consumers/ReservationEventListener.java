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
        .id(dto.getId())
        .flightId(dto.getFlightId())
        .clientId(dto.getClientId())
        .estado(dto.getEstado())
        .pricePaid(dto.getPricePaid())
        .milesUsed(dto.getMilesUsed())
        .origin(dto.getOrigin())
        .destiny(dto.getDestiny())
        .createdAt(dto.getCreatedAt())
        .updatedAt(dto.getUpdatedAt())
        .build();
        viewRepository.save(view);
    }
}
