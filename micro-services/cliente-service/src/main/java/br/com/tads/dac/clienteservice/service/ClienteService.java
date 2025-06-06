package br.com.tads.dac.clienteservice.service;

import br.com.tads.dac.clienteservice.exceptions.ClientRegisterException;
import br.com.tads.dac.clienteservice.exceptions.FieldError;
import br.com.tads.dac.clienteservice.exceptions.ResourceNotFoundException;
import br.com.tads.dac.clienteservice.infraestructure.mappers.ClientMapper;
import br.com.tads.dac.clienteservice.model.*;
import br.com.tads.dac.clienteservice.model.dto.ClientDTO;
import br.com.tads.dac.clienteservice.model.dto.ClientUpdateDTO;
import br.com.tads.dac.clienteservice.model.dto.ClienteTransacoesResponseDTO;
import br.com.tads.dac.clienteservice.model.dto.MilesTranscationResponseDTO;
import br.com.tads.dac.clienteservice.model.dto.RegisterRequestDTO;
import br.com.tads.dac.clienteservice.model.dto.TransacaoMilhasDTO;
import br.com.tads.dac.clienteservice.repository.ClienteRepository;
import br.com.tads.dac.clienteservice.repository.TransacaoMilhasRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

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
        entity.setNome(obj.name());
        entity.setEmail(obj.email());


        if (obj.endereco() != null) {
            if (entity.getEndereco() == null) {
                entity.setEndereco(new Endereco());
            }
            entity.getEndereco().setCep(obj.endereco().getCep());
            entity.getEndereco().setUf(obj.endereco().getUf());
            entity.getEndereco().setCidade(obj.endereco().getCidade());
            entity.getEndereco().setBairro(obj.endereco().getBairro());
            entity.getEndereco().setRua(obj.endereco().getRua());
            entity.getEndereco().setNumero(obj.endereco().getNumero());
            entity.getEndereco().setComplemento(obj.endereco().getComplemento());
        }

    }

    public void delete(String id) {
        clienteRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Cliente nao encontrado"));
        clienteRepository.deleteById(id);
    }

    public List<Cliente> getAll() {
        return clienteRepository.findAll();
    }

    public ClientDTO getById(String id) {
        return clienteRepository.findById(id).map(t -> mapper.toDto(t)).orElseThrow(() -> new EntityNotFoundException("Cliente não encontrado"));
    }

    public MilesTranscationResponseDTO adicionarTransacao(String clienteId, TransacaoMilhas transacao) {
        Cliente cliente = clienteRepository.findById(clienteId)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

        transacao.setClient(cliente);
        transacao.setDataHora(LocalDateTime.now());

        if (transacao.getTipo() == TipoTransacao.ENTRADA) {
            cliente.setSaldoMilhas(cliente.getSaldoMilhas() + transacao.getQuantidade());
        } else if (transacao.getTipo() == TipoTransacao.SAIDA) {
            cliente.setSaldoMilhas(cliente.getSaldoMilhas() - transacao.getQuantidade());
        }

        clienteRepository.save(cliente);
        TransacaoMilhas transacaoMilhas = transacaoRepository.save(transacao);
        return MilesTranscationResponseDTO.builder().codigo(clienteId)
                .saldoMilhas(cliente.getSaldoMilhas())
                .build();
    }

    public ClienteTransacoesResponseDTO getTransacoes(String clienteId) {
        Cliente cliente = clienteRepository.findById(clienteId)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

        List<TransacaoMilhas> entidades = transacaoRepository.findAllByClient(cliente);

        List<TransacaoMilhasDTO> listaDTO = entidades.stream()
                .map(e -> TransacaoMilhasDTO.builder()
                        .data(e.getDataHora())
                        .valorReais(e.getQuantidade() != null ?BigDecimal.valueOf(e.getQuantidade()*2) : BigDecimal.ZERO)
                        .quantidadeMilhas(e.getQuantidade())
                        .descricao(e.getDescricao())
                        .codigoReserva(e.getCodigoReserva())
                        .tipo(e.getTipo())
                        .build())
                .collect(Collectors.toList());

        int saldo = listaDTO.stream()
                .mapToInt(tx -> {
                    if (tx.getTipo().name().equalsIgnoreCase("ENTRADA")) {
                        return tx.getQuantidadeMilhas();
                    } else {
                        return -tx.getQuantidadeMilhas();
                    }
                })
                .sum();

        return ClienteTransacoesResponseDTO.builder()
                .codigo(cliente.getId())
                .saldoMilhas(saldo)
                .transacoes(listaDTO)
                .build();
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
        
        if(Objects.nonNull(dto.endereco()))
            dto.endereco().getCep().replaceAll("[^0-9]", "");
        
        return errors;
    }
}
