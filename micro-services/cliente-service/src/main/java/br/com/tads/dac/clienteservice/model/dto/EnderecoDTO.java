package br.com.tads.dac.clienteservice.model.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;
@Data
@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class EnderecoDTO{
    @NotBlank(message = "Digite seu CEP")
    private String cep;
    @NotBlank(message = "Digite o estado")
    private String uf;
    @NotBlank(message = "Digite a cidade")
    private String cidade;
    @NotBlank(message = "Digite o bairro")
    private String bairro;
    @NotBlank(message = "Digite seu endereço")
    private String rua;
    @NotBlank(message = "Digite o número")
    private String numero;
    private String complemento;
}