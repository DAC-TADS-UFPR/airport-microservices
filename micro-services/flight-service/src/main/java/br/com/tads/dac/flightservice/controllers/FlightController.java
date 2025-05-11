package br.com.tads.dac.flightservice.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.tads.dac.flightservice.models.dto.CreateFlightRequest;
import br.com.tads.dac.flightservice.models.dto.FlightDTO;
import br.com.tads.dac.flightservice.models.dto.UpdateStateRequest;
import br.com.tads.dac.flightservice.services.FlightService;
import jakarta.validation.Valid;

@RequestMapping
@RestController
public class FlightController {
    
    @Autowired
    private FlightService flightService;

    @PostMapping("/{id}/estado")
    public ResponseEntity<FlightDTO> createFlight(@Valid @RequestBody CreateFlightRequest request) {
        return ResponseEntity.ok(flightService.create(request));
    }

    @PatchMapping("/{id}/estado")
    public ResponseEntity<FlightDTO> updateFlightState(@PathVariable String id , @Valid @RequestBody UpdateStateRequest request) {
        return ResponseEntity.ok(flightService.updateFlightState(id, request));
    }
}