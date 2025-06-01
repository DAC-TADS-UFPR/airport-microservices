package br.com.tads.dac.flightservice.controllers;
import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RequestMapping
@RestController
public class FlightController {
    
    @Autowired
    private FlightService flightService;

    @PostMapping("/voos")
    public ResponseEntity<FlightDTO> createFlight(@Valid @RequestBody CreateFlightRequest request) {
        return ResponseEntity.ok(flightService.create(request));
    }

    @PatchMapping("/voos/{id}/estado")
    public ResponseEntity<FlightDTO> updateFlightState(@PathVariable Long id , @Valid @RequestBody UpdateStateRequest request) {
        return ResponseEntity.ok(flightService.updateFlightState(id, request));
    }

    @GetMapping("/voo/{id}")
    public ResponseEntity<FlightDTO> getFlightById(@PathVariable Long id) {
       return ResponseEntity.ok(flightService.getFlightById(id));
    }

    @GetMapping("/voos")
    public ResponseEntity<List<FlightDTO>> getFlights(
        @DateTimeFormat(pattern = "yyyy-MM-dd") @RequestParam(required = false) LocalDate dataFinal,
		@DateTimeFormat(pattern = "yyyy-MM-dd") @RequestParam(required = false) LocalDate dataInicial,
        @DateTimeFormat(pattern = "yyyy-MM-dd") @RequestParam(required = false) LocalDate data,
        @RequestParam(required = false) String codigoAeroportoOrigem,
        @RequestParam(required = false) String codigoAeroportoDestino
    ) {
       return ResponseEntity.ok(flightService.getFlights(dataInicial, dataFinal , data, codigoAeroportoOrigem, codigoAeroportoDestino));
    }

    
    
}