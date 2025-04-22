package br.com.tads.dac.flightservice.controllers;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/voos")
@RestController
public class FlightController {
    
    @GetMapping
    public String getAllFlights() {
         return "ok";
    }
}