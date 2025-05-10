package br.com.tads.dac.reservationservice.controller;

import br.com.tads.dac.reservationservice.model.Reservation;
import br.com.tads.dac.reservationservice.model.dto.CreateReservationRequest;
import br.com.tads.dac.reservationservice.service.ReservationService;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
public class ReservationController {

    @Autowired
    private  ReservationService reservaService;
    

    @PostMapping
    public Reservation criarReserva(@RequestBody @Valid CreateReservationRequest request) {
        return reservaService.criarReserva(request);
    }
}