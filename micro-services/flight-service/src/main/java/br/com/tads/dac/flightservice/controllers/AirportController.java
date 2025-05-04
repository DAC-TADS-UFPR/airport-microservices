package br.com.tads.dac.flightservice.controllers;


import br.com.tads.dac.flightservice.entities.Airport;
import br.com.tads.dac.flightservice.services.AirportService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/aeroportos")
public class AirportController {

    @Autowired
    private AirportService airportService;

    @PostMapping
    public ResponseEntity<Airport> create(@RequestBody @Valid Airport airport) {
        Airport airportCreated = airportService.create(airport);
        return ResponseEntity.status(HttpStatus.CREATED).body(airportCreated);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Airport> update(@PathVariable String id,@RequestBody Airport airport) {
        Airport airport_updated = airportService.update(id,airport);
        return ResponseEntity.ok().body(airport_updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        airportService.delete(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<Airport>> getAll() {
        return ResponseEntity.ok(airportService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Airport> getById(@PathVariable String id) {
        return airportService.getByAirportCode(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

}
