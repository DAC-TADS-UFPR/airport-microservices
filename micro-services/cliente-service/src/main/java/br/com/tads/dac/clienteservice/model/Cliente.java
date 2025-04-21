package br.com.tads.dac.clienteservice.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String cpf;
    private String name;
    private String email;
    private String number;
    private String complement;
    private String cep;
    private String city;
    private String uf;
    private String street;
    private String neighborhood;
    private String state;
    private Integer milhas;

    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<TransacaoMilhas> transacoes = new java.util.ArrayList<>();
}
