package br.com.tads.dac.flightservice.models.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "flight")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Airport {

    @Id
    @Size(min = 3, max = 3, message = "O código deve ter exatamente 3 caracteres")
    @Column(nullable = false)
    private String airportCode;

    @Column(nullable = false)
    private String airportName;

    @Column(nullable = false)
    private String city;

    @Column(nullable = false)
    private String uf;

}
