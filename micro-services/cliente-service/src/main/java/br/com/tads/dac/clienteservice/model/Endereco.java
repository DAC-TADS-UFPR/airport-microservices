package br.com.tads.dac.clienteservice.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "endereco")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Endereco {

    @Id
    @Column(name = "id",        nullable = false)
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name = "cep",       nullable = false)
    private String cep;

    @Column(name = "uf",        nullable = false)
    private String uf;

    @Column(name = "cidade",    nullable = false)
    private String cidade;

    @Column(name = "bairro",    nullable = false)
    private String bairro;

    @Column(name = "rua",       nullable = false)
    private String rua;

    @Column(name = "numero",    nullable = false)
    private String numero;

    @Column(name = "complemento")
    private String complemento;

    @JoinColumn(name = "cliente_id")
    @OneToOne(mappedBy = "endereco")
    private Cliente cliente;
}