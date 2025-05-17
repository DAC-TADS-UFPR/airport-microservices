package br.com.tads.dac.clienteservice.infraestructure.mappers;

import org.springframework.stereotype.Component;

import br.com.tads.dac.clienteservice.model.Cliente;
import br.com.tads.dac.clienteservice.model.Endereco;
import br.com.tads.dac.clienteservice.model.dto.ClientDTO;
import br.com.tads.dac.clienteservice.model.dto.EnderecoDTO;
import br.com.tads.dac.clienteservice.model.dto.RegisterRequestDTO;

@Component
public class ClientMapper {

    public Cliente toEntity(RegisterRequestDTO dto) {
        Endereco endereco = Endereco.builder()
                .cep(dto.endereco().getCep())
                .uf(dto.endereco().getUf())
                .cidade(dto.endereco().getCidade())
                .bairro(dto.endereco().getBairro())
                .rua(dto.endereco().getRua())
                .numero(dto.endereco().getNumero())
                .complemento(dto.endereco().getComplemento())
                .build();

        return Cliente.builder()
                .cpf(dto.cpf())
                .nome(dto.nome())
                .email(dto.email())
                .saldoMilhas(dto.saldoMilhas() != null ? dto.saldoMilhas() : 0L)
                .endereco(endereco)
                .build();
    }

    public ClientDTO toDto(Cliente cliente) {
        Endereco e = cliente.getEndereco();
        EnderecoDTO enderecoDTO = EnderecoDTO.builder()
                .cep(e.getCep())
                .uf(e.getUf())
                .cidade(e.getCidade())
                .bairro(e.getBairro())
                .rua(e.getRua())
                .numero(e.getNumero())
                .complemento(e.getComplemento())
                .build();

        return new ClientDTO(
                cliente.getId(),
                cliente.getNome(),
                cliente.getEmail(),
                cliente.getCpf(),
                cliente.getSaldoMilhas(),
                enderecoDTO
        );
    }
}
