package br.com.tads.dac.clienteservice.model.dto;

import lombok.Builder;

@Builder
public record EnderecoDTO(
    String cep,
    String uf,
    String cidade,
    String bairro,
    String rua,
    String numero,
    String complemento
) {}