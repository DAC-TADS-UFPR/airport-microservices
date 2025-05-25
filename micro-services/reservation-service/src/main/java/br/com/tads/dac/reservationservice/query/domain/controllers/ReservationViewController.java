package br.com.tads.dac.reservationservice.query.domain.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.tads.dac.reservationservice.query.domain.models.dto.ReservationDTO;
import br.com.tads.dac.reservationservice.query.domain.services.ReservationViewService;

@RestController
@RequestMapping("/view")
public class ReservationViewController {
    @Autowired
    private ReservationViewService reservationViewService;

    @GetMapping("/{id}")
    public ResponseEntity<ReservationDTO> getReservation(@PathVariable String id) {
        ReservationDTO dto = reservationViewService.getById(id);
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/cliente/{codigoCliente}")
    public ResponseEntity<List<ReservationDTO>> getReservationsByClient(@PathVariable String codigoCliente) {
        List<ReservationDTO> reservas = reservationViewService.getByClientId(codigoCliente);
        return ResponseEntity.ok(reservas);
    }
}
