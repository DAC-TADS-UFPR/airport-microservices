package br.com.tads.dac.clienteservice.infraestructure.listeners.reservation;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import br.com.tads.dac.clienteservice.infraestructure.config.RabbitMQConfig;
import br.com.tads.dac.clienteservice.repository.ClienteRepository;

@Component

public class ReservationEventListener {
    private final ClienteRepository clienteRepository;

    public ReservationEventListener(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    @RabbitListener(queues = RabbitMQConfig.UPDATE_RESERVATION_MILES_QUEUE)
    public void onReservationUpdateMiles(ReservationMilesUpdateEvent event) {
        try {
            clienteRepository.findById(event.getCodigoCliente()).ifPresent(cliente -> {
                long milhas = cliente.getSaldoMilhas() == null ? 0 : cliente.getSaldoMilhas();
                cliente.setSaldoMilhas(milhas - event.getMilhas());
                clienteRepository.save(cliente);
            });
        } catch (Exception e) {
            System.err.println("Error processing client event: " + e.getMessage());
        }
        
    }
  
}
