package br.com.tads.dac.clienteservice.repository;

import br.com.tads.dac.clienteservice.model.Cliente;
import br.com.tads.dac.clienteservice.model.TransacaoMilhas;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransacaoMilhasRepository extends JpaRepository<TransacaoMilhas, Long> {

    List<TransacaoMilhas> findAllByClient(Cliente cliente);
}
