package br.com.tads.dac.clienteservice.service;

import br.com.tads.dac.clienteservice.model.Cliente;
import br.com.tads.dac.clienteservice.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClientService {

    @Autowired
    private ClienteRepository clienteRepository;

    public Cliente create(Cliente client) {
        return clienteRepository.save(client);
    }

    public Cliente update(Cliente client) {
        return clienteRepository.save(client);
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
}
