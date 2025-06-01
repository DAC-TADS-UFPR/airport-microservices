package br.com.tads.dac.reservationservice.command.domain.controller;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.com.tads.dac.reservationservice.command.domain.model.ReservationState;
import br.com.tads.dac.reservationservice.command.domain.model.dto.CreateReservationRequest;
import br.com.tads.dac.reservationservice.command.domain.model.dto.ReservationDTO;
import br.com.tads.dac.reservationservice.command.domain.model.dto.UpdateReservationRequest;
import br.com.tads.dac.reservationservice.command.domain.service.ReservationService;

@RestController
@RequestMapping
public class ReservationController {

    @Autowired
    private  ReservationService reservaService;
    

    @PostMapping
    public ResponseEntity<ReservationDTO> criarReserva(@RequestBody @Valid CreateReservationRequest request) {
        return ResponseEntity.ok().body(reservaService.criarReserva(request));
    }

    @PatchMapping("/{id}/estado")
    public ResponseEntity<ReservationDTO> updateReservationState(@PathVariable Long id , @Valid @RequestBody UpdateReservationRequest request) {
        return ResponseEntity.ok(reservaService.alterarEstado(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ReservationDTO> cancelReservation(@PathVariable Long id) {
        return ResponseEntity.ok(reservaService.alterarEstado(id, new UpdateReservationRequest(ReservationState.CANCELADA)));
    }

}