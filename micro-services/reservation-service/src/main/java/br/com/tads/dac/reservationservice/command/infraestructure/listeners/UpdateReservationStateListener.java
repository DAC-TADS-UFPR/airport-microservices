package br.com.tads.dac.reservationservice.command.infraestructure.listeners;


import java.util.List;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import br.com.tads.dac.reservationservice.command.domain.model.Reservation;
import br.com.tads.dac.reservationservice.command.domain.model.ReservationState;
import br.com.tads.dac.reservationservice.command.domain.model.dto.UpdateReservationRequest;
import br.com.tads.dac.reservationservice.command.domain.repository.ReservationRepository;
import br.com.tads.dac.reservationservice.command.domain.service.ReservationService;
import br.com.tads.dac.reservationservice.config.RabbitMQConfig;

@Component
public class UpdateReservationStateListener {

    private final ReservationRepository reservationRepository;
    private final ReservationService reservationService;

    public UpdateReservationStateListener(ReservationRepository reservationRepository , ReservationService reservationService) {
        this.reservationRepository = reservationRepository;
        this.reservationService = reservationService;
    }

    @RabbitListener(queues = RabbitMQConfig.RESERVATION_STATE_QUEUE)
    @Transactional
    public void onUpdateState(UpdateReservationStateEvent event) {
        try {
            Long codigoVoo = event.getCodigoVoo();
            
            List<Reservation> reservasDoVoo = reservationRepository.findByCodigoVoo(codigoVoo);

            if (reservasDoVoo.isEmpty()) {
                System.out.println("Nenhuma reserva encontrada para o voo: " + codigoVoo);
                return;
            }

            reservasDoVoo.forEach(reserva -> {
                reservationService.alterarEstado(reserva.getCodigo(), new UpdateReservationRequest(getReservatiionStateByFlight(event.getEstadoVoo(), reserva.getEstado())));
            });

        } catch (Exception e) {
            System.err.println("Erro ao processar evento de atualização de reservas: " + e.getMessage());
            throw e; 
        }
    }

    public ReservationState getReservatiionStateByFlight(FlightState flightState , ReservationState estadoAtual) {
        if (flightState == FlightState.REALIZADO && estadoAtual == ReservationState.EMBARCADA)
            return ReservationState.REALIZADA;
        else if (flightState == FlightState.REALIZADO && estadoAtual != ReservationState.EMBARCADA)
            return ReservationState.NAO_REALIZADA;
        else if (flightState == FlightState.CANCELADO && (estadoAtual == ReservationState.CRIADA || estadoAtual == ReservationState.EMBARCADA || estadoAtual == ReservationState.CHECK_IN))
            return ReservationState.CANCELADA_VOO;
        else
            return estadoAtual;      
    }
    
}
