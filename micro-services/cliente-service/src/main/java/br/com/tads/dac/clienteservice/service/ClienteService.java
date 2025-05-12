package br.com.tads.dac.clienteservice.service;

import br.com.tads.dac.clienteservice.exceptions.ClientRegisterException;
import br.com.tads.dac.clienteservice.exceptions.FieldError;
import br.com.tads.dac.clienteservice.exceptions.ResourceNotFoundException;
import br.com.tads.dac.clienteservice.infraestructure.mappers.ClientMapper;
import br.com.tads.dac.clienteservice.model.*;
import br.com.tads.dac.clienteservice.model.dto.ClientDTO;
import br.com.tads.dac.clienteservice.model.dto.ClientUpdateDTO;
import br.com.tads.dac.clienteservice.model.dto.RegisterRequestDTO;
import br.com.tads.dac.clienteservice.repository.ClienteRepository;
import br.com.tads.dac.clienteservice.repository.TransacaoMilhasRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private TransacaoMilhasRepository transacaoRepository;

    @Autowired
    private ClientMapper mapper;

    public ClientDTO create(RegisterRequestDTO dto) {
        var errors = validate(dto);
        if (!errors.isEmpty()) {
            throw new ClientRegisterException("Erro ao salvar cliente", errors);
        }
        return mapper.toDto(clienteRepository.save(mapper.toEntity(dto)));
    }

    public ClientDTO update(String id, ClientUpdateDTO cliente) {
        try {
            Cliente entity = clienteRepository.getReferenceById(id);
            updateData(entity,cliente);
            return mapper.toDto(clienteRepository.save(entity));
        }
        catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException(id);
        }
    }

    private void updateData(Cliente entity, ClientUpdateDTO obj) {
        entity.setName(obj.name());
        entity.setEmail(obj.email());
        entity.setCep(obj.endereco().cep());
        entity.setUf(obj.endereco().uf());
        entity.setCity(obj.endereco().cidade());
        entity.setNeighborhood(obj.endereco().bairro());
        entity.setStreet(obj.endereco().rua());
        entity.setNumber(obj.endereco().numero());
        entity.setComplement(obj.endereco().complemento());
    }

    public void delete(String id) {
        Cliente cliente = clienteRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Cliente nao encontrado"));
        clienteRepository.deleteById(id);
    }

    public List<Cliente> getAll() {
        return clienteRepository.findAll();
    }

    public ClientDTO getById(String id) {
        return clienteRepository.findById(id).map(t -> mapper.toDto(t)).orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
    }

    public TransacaoMilhas adicionarTransacao(String clienteId, TransacaoMilhas transacao) {
        Cliente cliente = clienteRepository.findById(clienteId)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

        transacao.setClient(cliente);
        transacao.setDataHora(LocalDateTime.now());

        if (transacao.getTipo() == TipoTransacao.ENTRADA) {
            cliente.setMilhas(cliente.getMilhas() + transacao.getQuantidade());
        } else if (transacao.getTipo() == TipoTransacao.SAIDA) {
            cliente.setMilhas(cliente.getMilhas() - transacao.getQuantidade());
        }

        clienteRepository.save(cliente);
        return transacaoRepository.save(transacao);
    }

    public List<FieldError> validate(RegisterRequestDTO dto) {
        var cliente = clienteRepository.findByCpf(dto.cpf());
        List<FieldError> errors = new ArrayList<>();
        if (cliente.isPresent()) {
            errors.add(new FieldError("cpf", "CPF já cadastrado"));
        }
        cliente = clienteRepository.findByEmail(dto.email());
        if (cliente.isPresent()) {
            errors.add(new FieldError("email", "E-mail já cadastrado"));
        }

        dto.cpf().replaceAll("[^0-9]", "");
        dto.cep().replaceAll("[^0-9]", "");
        return errors;
    }
}
