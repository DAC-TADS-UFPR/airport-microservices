package br.com.tads.dac.clienteservice.infraestructure.listeners.reservation;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import br.com.tads.dac.clienteservice.infraestructure.config.RabbitMQConfig;
import br.com.tads.dac.clienteservice.model.TipoTransacao;
import br.com.tads.dac.clienteservice.model.TransacaoMilhas;
import br.com.tads.dac.clienteservice.repository.ClienteRepository;
import br.com.tads.dac.clienteservice.service.ClienteService;

@Component
public class ReservationEventListener {
    private final ClienteRepository clienteRepository;
    private final ClienteService clienteService;
    public ReservationEventListener(ClienteRepository clienteRepository , ClienteService clienteService) {
        this.clienteRepository = clienteRepository;
        this.clienteService = clienteService;
    }

    @RabbitListener(queues = RabbitMQConfig.UPDATE_RESERVATION_MILES_QUEUE)
    public void onReservationUpdateMiles(ReservationMilesUpdateEvent event) {
        try {
            
            TransacaoMilhas transacaoMilhas = TransacaoMilhas.builder()
                .quantidade(event.getMilhas())
                .tipo(TipoTransacao.SAIDA)
                .codigoReserva(event.getCodigoReserva())
                .build();

            clienteService.adicionarTransacao(event.getCodigoCliente(), transacaoMilhas);   
        } catch (Exception e) {
            System.err.println("Error processing client event: " + e.getMessage());
        }
        
    }
  
}
