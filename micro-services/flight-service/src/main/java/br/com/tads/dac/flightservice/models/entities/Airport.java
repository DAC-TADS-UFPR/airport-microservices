package br.com.tads.dac.flightservice.models.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "airport")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Airport {

    @Id
    @Column(nullable = false)
    @Size(min = 3, max = 3, message = "Codigo deve ter 3 caracteres")
    @NotBlank(message = "Código não pode ser vazio")
    private String codigo;

    @Column(nullable = false)
    @Size(min = 2, max = 100, message = "Nome deve ter entre 2 e 100 caracteres")
    @NotBlank(message = "Nome não pode ser vazio")
    private String nome;

    @Column(nullable = false)
    @Size(min = 2, max = 100, message = "Cidade deve ter entre 2 e 100 caracteres")
    @NotBlank(message = "Cidade não pode ser vazia")
    private String cidade;

    @Column(nullable = false)
    @Size(min = 2, max = 2, message = "UF deve ter 2 caracteres")
    @NotBlank(message = "UF não pode ser vazia")
    private String uf;

}
