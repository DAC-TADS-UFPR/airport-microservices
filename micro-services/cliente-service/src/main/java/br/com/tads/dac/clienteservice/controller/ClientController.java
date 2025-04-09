package br.com.tads.dac.clienteservice.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ch.qos.logback.core.net.server.Client;

@RestController
@RequestMapping("/clients")

public class ClientController {
    public ResponseEntity create(@RequestBody Client client) {
        return new ResponseEntity(HttpStatus.OK);
}
    public ResponseEntity update(@RequestBody Client client) {
        return new ResponseEntity(HttpStatus.OK);
    }

    public ResponseEntity delete(@RequestBody Client client) {
        return new ResponseEntity(HttpStatus.OK);
    }

    public ResponseEntity getAll() {
        return new ResponseEntity(HttpStatus.OK);
    }

    public ResponseEntity getById(@PathVariable Long id) {
        return new ResponseEntity(HttpStatus.OK);
    }
    
}
