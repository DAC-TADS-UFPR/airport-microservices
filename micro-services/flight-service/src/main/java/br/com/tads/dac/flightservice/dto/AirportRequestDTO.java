package br.com.tads.dac.flightservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AirportRequestDTO {

    private String airportCode;
    private String airportName;
    private String city;
    private String uf;
}
