package br.com.tads.dac.clienteservice.repository;

import br.com.tads.dac.clienteservice.model.Cliente;
import jakarta.validation.constraints.NotBlank;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, String> {

    Optional<Cliente> findByEmail(String email);

    Optional<Cliente> findByCpf(String cpf);
}
