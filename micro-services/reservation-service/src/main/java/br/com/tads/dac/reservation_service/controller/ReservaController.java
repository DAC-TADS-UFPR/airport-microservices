package br.com.tads.dac.reservasservice.controller;

import br.com.tads.dac.reservasservice.model.Reserva;
import br.com.tads.dac.reservasservice.service.ReservaService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/reservas")
public class ReservaController {

    private final ReservaService reservaService;

    public ReservaController(ReservaService r) {
        this.reservaService = r;
    }

    @PostMapping("/criar")
    public Reserva criarReserva(@RequestParam String origem,
                                 @RequestParam String destino,
                                 @RequestParam String codigoVoo,
                                 @RequestParam double valor,
                                 @RequestParam int milhas) {
        return reservaService.criarReserva(origem, destino, codigoVoo, valor, milhas);
    }
}