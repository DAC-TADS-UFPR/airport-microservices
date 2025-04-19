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
    private String nome;
    private String email;
    private String ruaNumero;
    private String complemento;
    private String cep;
    private String cidade;
    private String uf;
    private Integer milhas;

    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<TransacaoMilhas> transacoes = new java.util.ArrayList<>();
}
