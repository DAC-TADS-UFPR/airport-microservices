package br.com.tads.dac.flightservice.infraestructure.listeners;


import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import br.com.tads.dac.flightservice.infraestructure.config.RabbitMQConfig;
import br.com.tads.dac.flightservice.repositories.FlightRepository;

@Component
public class FlightEventListener {

    private final FlightRepository flightRepository;

    public FlightEventListener(FlightRepository flightRepository) {
        this.flightRepository = flightRepository;
    }

    @RabbitListener(queues = RabbitMQConfig.UPDATE_SEATS_QUEUE)
    public void onUpdateSeats(FlightSeatsUpdateEvent event) {
        try {
            flightRepository.findById(event.getCodigoVoo()).ifPresent(flight -> {
                int ocupadas = flight.getQuantidadePoltronasOcupadas();
                if(event.getEstado() == ReservationState.CANCELADA || event.getEstado() == ReservationState.CANCELADA_VOO) {
                    ocupadas -= event.getQuantidadePoltronas();
                } else {
                    ocupadas += event.getQuantidadePoltronas();
                }
                flight.setQuantidadePoltronasOcupadas(ocupadas);
                flightRepository.save(flight);
            });
        } catch (Exception e) {
            System.err.println("Error processing flight event: " + e.getMessage());
        }
        
    }
}
