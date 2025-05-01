package br.com.tads.dac.flightservice.controllers;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.tads.dac.flightservice.models.dto.UpdateStateRequest;

@RequestMapping

@RestController
public class FlightController {
    
    @PatchMapping("/{id}/estado")
    public String updateFlight(UpdateStateRequest request) {
         return "ok";
    }
}