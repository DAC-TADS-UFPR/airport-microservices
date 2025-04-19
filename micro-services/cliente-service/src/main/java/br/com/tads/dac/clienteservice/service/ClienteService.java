package br.com.tads.dac.clienteservice.service;

import br.com.tads.dac.clienteservice.model.*;
import br.com.tads.dac.clienteservice.repository.ClienteRepository;
import br.com.tads.dac.clienteservice.repository.TransacaoMilhasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private TransacaoMilhasRepository transacaoRepository;

    public Cliente create(Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    public Cliente update(Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    public void delete(Long id) {
        clienteRepository.deleteById(id);
    }

    public List<Cliente> getAll() {
        return clienteRepository.findAll();
    }

    public Optional<Cliente> getById(Long id) {
        return clienteRepository.findById(id);
    }

    public TransacaoMilhas adicionarTransacao(Long clienteId, TransacaoMilhas transacao) {
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
}
