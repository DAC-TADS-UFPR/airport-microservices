package br.com.tads.dac.clienteservice.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
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
    @Size(min = 8, max = 8, message = "CEP deve ter 8 dígitos")
    @NotBlank(message = "CEP não pode ser vazio")
    private String cep;

    @Column(name = "uf",        nullable = false)
    @Size(min = 2, max = 2, message = "UF deve ter 2 caracteres")
    @NotBlank(message = "UF não pode ser vazio")
    private String uf;

    @Column(name = "cidade",    nullable = false)
    @Size(min = 2, max = 100, message = "Cidade deve ter entre 2 e 100 caracteres")
    @NotBlank(message = "Cidade não pode ser vazia")
    private String cidade;

    @Column(name = "bairro",    nullable = false)
    @Size(min = 2, max = 100, message = "Bairro deve ter entre 2 e 100 caracteres")
    @NotBlank(message = "Bairro não pode ser vazia")
    private String bairro;

    @Column(name = "rua",       nullable = false)
    @Size(min = 2, max = 100, message = "Rua deve ter entre 2 e 100 caracteres")
    @NotBlank(message = "Rua não pode ser vazia")
    private String rua;

    @Column(name = "numero",    nullable = false)
    @Size(min = 1, max = 10, message = "Número deve ter entre 1 e 10 caracteres")
    @NotBlank(message = "Numero não pode ser vazia")
    private String numero;

    @Column(name = "complemento")
    @Size(max = 100, message = "Complemento deve ter no máximo 100 caracteres")
    @NotBlank(message = "Complemento não pode ser vazia")
    private String complemento;

    @JoinColumn(name = "cliente_id")
    @OneToOne(mappedBy = "endereco")
    private Cliente cliente;
}