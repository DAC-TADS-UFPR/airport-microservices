package br.com.tads.dac.reservasservice.service;

import br.com.tads.dac.reservasservice.model.*;
import br.com.tads.dac.reservasservice.repository.*;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class ReservaService {

    private final ReservaRepository reservaRepository;
    private final EstadoReservaRepository estadoRepository;
    private final HistoricoEstadoReservaRepository historicoRepository;

    public ReservaService(ReservaRepository r, EstadoReservaRepository e, HistoricoEstadoReservaRepository h) {
        this.reservaRepository = r;
        this.estadoRepository = e;
        this.historicoRepository = h;
    }

    public Reserva criarReserva(String origem, String destino, String codigoVoo, double valor, int milhas) {
        String codigo = gerarCodigo();
        EstadoReserva estado = estadoRepository.findBySigla("CRIADA").orElseThrow();

        Reserva reserva = new Reserva(
            codigo, codigoVoo, LocalDateTime.now(), estado, valor, milhas, origem, destino
        );

        reservaRepository.save(reserva);

        HistoricoEstadoReserva historico = new HistoricoEstadoReserva(
            null, codigo, LocalDateTime.now(), null, estado.getSigla()
        );
        historicoRepository.save(historico);

        return reserva;
    }

    private String gerarCodigo() {
        String letras = UUID.randomUUID().toString().replaceAll("[^A-Z]", "").substring(0, 3).toUpperCase();
        String numeros = String.valueOf((int)(Math.random() * 900 + 100));
        return letras + numeros;
    }
}
