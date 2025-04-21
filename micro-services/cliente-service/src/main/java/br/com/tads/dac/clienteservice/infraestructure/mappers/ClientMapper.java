package br.com.tads.dac.clienteservice.infraestructure.mappers;

import org.springframework.stereotype.Component;

import br.com.tads.dac.clienteservice.model.Cliente;
import br.com.tads.dac.clienteservice.model.dto.ClientDTO;
import br.com.tads.dac.clienteservice.model.dto.RegisterRequestDTO;

@Component
public class ClientMapper {
    public Cliente toEntity(RegisterRequestDTO dto) {
        return Cliente.builder()
                .name(dto.name())
                .email(dto.email())
                .cpf(dto.cpf())
                .cep(dto.cep())
                .street(dto.street())
                .number(dto.number())
                .complement(dto.complement())
                .neighborhood(dto.neighborhood())
                .city(dto.city())
                .state(dto.state())
                .build();
    }

    
    public ClientDTO toDto(Cliente cliente) {
        return new ClientDTO(cliente.getId(), cliente.getName(), cliente.getEmail(), cliente.getCpf(), cliente.getCep(),
                cliente.getStreet(), cliente.getNumber(), cliente.getComplement(), cliente.getNeighborhood(),
                cliente.getCity(), cliente.getState());
    }

}
