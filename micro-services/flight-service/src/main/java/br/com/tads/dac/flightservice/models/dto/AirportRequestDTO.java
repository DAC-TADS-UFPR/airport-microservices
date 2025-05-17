package br.com.tads.dac.flightservice.models.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AirportRequestDTO {
    private String codigo;
    private String nome;
    private String cidade;
    private String uf;
}
