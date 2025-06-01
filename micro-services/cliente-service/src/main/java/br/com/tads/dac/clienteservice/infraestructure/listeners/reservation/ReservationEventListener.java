package br.com.tads.dac.clienteservice.infraestructure.listeners.reservation;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import br.com.tads.dac.clienteservice.infraestructure.config.RabbitMQConfig;
import br.com.tads.dac.clienteservice.model.TipoTransacao;
import br.com.tads.dac.clienteservice.model.TransacaoMilhas;
import br.com.tads.dac.clienteservice.service.ClienteService;

@Component
public class ReservationEventListener {
    private final ClienteService clienteService;
    public ReservationEventListener(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @RabbitListener(queues = RabbitMQConfig.UPDATE_RESERVATION_MILES_QUEUE)
    public void onReservationUpdateMiles(ReservationMilesUpdateEvent event) {
        try {
            TipoTransacao tipoTransacao = event.getEstado() == ReservationState.CANCELADA || event.getEstado() == ReservationState.CANCELADA_VOO
                ? TipoTransacao.ENTRADA
                : TipoTransacao.SAIDA;

            String descricao = "Atualização de milhas para reserva: " + event.getCodigoReserva()
                + " - Estado: " + event.getEstado().getEstado(); 

            TransacaoMilhas transacaoMilhas = TransacaoMilhas.builder()
                .quantidade(event.getMilhas())
                .tipo(tipoTransacao)
                .codigoReserva(event.getCodigoReserva())
                .descricao(descricao)
                .build();

            clienteService.adicionarTransacao(event.getCodigoCliente(), transacaoMilhas);   
        } catch (Exception e) {
            System.err.println("Error processing client event: " + e.getMessage());
        }
        
    }
  
}
