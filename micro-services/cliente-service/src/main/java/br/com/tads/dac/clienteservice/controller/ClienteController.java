package br.com.tads.dac.clienteservice.controller;

import br.com.tads.dac.clienteservice.model.Cliente;
import br.com.tads.dac.clienteservice.model.TipoTransacao;
import br.com.tads.dac.clienteservice.model.TransacaoMilhas;
import br.com.tads.dac.clienteservice.model.dto.ClientDTO;
import br.com.tads.dac.clienteservice.model.dto.ClientUpdateDTO;
import br.com.tads.dac.clienteservice.model.dto.ClienteTransacoesResponseDTO;
import br.com.tads.dac.clienteservice.model.dto.MilesTranscationResponseDTO;
import br.com.tads.dac.clienteservice.model.dto.RegisterRequestDTO;
import br.com.tads.dac.clienteservice.service.ClienteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @PostMapping
    @Operation(summary = "Criar novo cliente")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Cliente criado com sucesso",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = RegisterRequestDTO.class))),
            @ApiResponse(responseCode = "400", description = "Dados inválidos",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = Exception.class))),
            @ApiResponse(responseCode = "500", description = "Erro interno no servidor",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = Exception.class))),
    })
    public ResponseEntity<ClientDTO> create(@RequestBody @Valid RegisterRequestDTO cliente) {
        return ResponseEntity.status(HttpStatus.CREATED).body(clienteService.create(cliente));
    }

    @PutMapping(value = "/{id}")
    @Operation(summary = "Atualizar cliente por ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Cliente atualizado com sucesso",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = Cliente.class))),
            @ApiResponse(responseCode = "404", description = "Cliente não encontrado",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = Exception.class))),
            @ApiResponse(responseCode = "400", description = "Dados inválidos",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = Exception.class))),
            @ApiResponse(responseCode = "500", description = "Erro interno no servidor",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = Exception.class))),
    })
    public ResponseEntity<ClientDTO> update(@PathVariable String id, @RequestBody @Valid ClientUpdateDTO clientUpdateDTO) {
        ClientDTO client_updated = clienteService.update(id,clientUpdateDTO);
        return ResponseEntity.ok().body(client_updated);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar cliente por ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Cliente deletado com sucesso"),
            @ApiResponse(responseCode = "404", description = "Cliente não encontrado",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = Exception.class))),
            @ApiResponse(responseCode = "500", description = "Erro interno no servidor",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = Exception.class))),
    })
    public ResponseEntity<Void> delete(@PathVariable String id) {
        clienteService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    @Operation(summary = "Listar todos os clientes")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Clientes retornados com sucesso",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = Cliente.class))),
            @ApiResponse(responseCode = "500", description = "Erro interno no servidor",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = Exception.class))),
    })
    public ResponseEntity<List<Cliente>> getAll() {
        return ResponseEntity.ok(clienteService.getAll());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar cliente por ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Cliente encontrado",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = Cliente.class))),
            @ApiResponse(responseCode = "404", description = "Cliente não encontrado",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = Exception.class))),
            @ApiResponse(responseCode = "500", description = "Erro interno no servidor",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = Exception.class))),
    })
    public ResponseEntity<ClientDTO> getById(@PathVariable String id) {
        return ResponseEntity.ok(clienteService.getById(id));
    }

    @PostMapping("/{id}/transacoes")
    public ResponseEntity<MilesTranscationResponseDTO> adicionarTransacao(@PathVariable String id, @RequestBody TransacaoMilhas transacao) {
        return ResponseEntity.ok(clienteService.adicionarTransacao(id, transacao));
    }

    @PostMapping("/{id}/milhas")
    public ResponseEntity<MilesTranscationResponseDTO> adicionarMilhas(@PathVariable String id, @RequestBody TransacaoMilhas transacao) {
        transacao.setTipo(TipoTransacao.ENTRADA);
        return ResponseEntity.ok(clienteService.adicionarTransacao(id, transacao));
    }

    @GetMapping("/{id}/milhas")
    public ResponseEntity<ClienteTransacoesResponseDTO> buscarMilhas(@PathVariable String id) {
        return ResponseEntity.ok(clienteService.getTransacoes(id));
    }

    
}
