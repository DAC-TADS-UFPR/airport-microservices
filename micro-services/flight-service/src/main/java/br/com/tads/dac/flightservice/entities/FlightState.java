package br.com.tads.dac.flightservice.entities;

import jakarta.persistence.Column;

public class FlightState {

    @Column(nullable = false)
    private String stateCode;

    @Column(nullable = false)
    private String uf;

    @Column(nullable = false)
    private FlightDescription flightDescription;
}
