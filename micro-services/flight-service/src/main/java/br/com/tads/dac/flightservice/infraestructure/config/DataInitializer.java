package br.com.tads.dac.flightservice.infraestructure.config;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.Arrays;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import br.com.tads.dac.flightservice.models.dto.CreateFlightRequest;
import br.com.tads.dac.flightservice.models.entities.Airport;
import br.com.tads.dac.flightservice.repositories.AirportRepository;
import br.com.tads.dac.flightservice.services.FlightService;
import jakarta.transaction.Transactional;

@Configuration
public class DataInitializer {

   
    @Bean
    @Transactional
    public CommandLineRunner seedVoos(FlightService flightService, AirportRepository airportRepo) {
        return args -> {
            if (flightService.getAllFlights().isEmpty()) {
                List<Airport> airports = Arrays.asList(
                    new Airport("GRU", "Aeroporto Internacional de São Paulo/Guarulhos", "Guarulhos", "SP"),
                    new Airport("GIG", "Aeroporto Internacional do Rio de Janeiro/Galeão", "Rio de Janeiro", "RJ"),
                    new Airport("CWB", "Aeroporto Internacional de Curitiba", "Curitiba", "PR"),
                    new Airport("POA", "Aeroporto Internacional Salgado Filho", "Porto Alegre", "RS")
                );
                
                airportRepo.saveAll(airports);
                airportRepo.flush();

                CreateFlightRequest voo1 = CreateFlightRequest.builder()
                    .data(OffsetDateTime.parse("2025-08-10T10:30-03:00"))
                    .valorPassagem(new BigDecimal("300.00"))
                    .quantidadePoltronasTotal(100)
                    .quantidadePoltronasOcupadas(0)
                    .codigoAeroportoOrigem("POA")
                    .codigoAeroportoDestino("CWB")
                    .build();

                CreateFlightRequest voo2 = CreateFlightRequest.builder()
                    .data(OffsetDateTime.parse("2025-09-11T09:30-03:00"))
                    .valorPassagem(new BigDecimal("400.00"))
                    .quantidadePoltronasTotal(100)
                    .quantidadePoltronasOcupadas(0)
                    .codigoAeroportoOrigem("CWB")
                    .codigoAeroportoDestino("GIG")
                    .build();

                CreateFlightRequest voo3 = CreateFlightRequest.builder()
                    .data(OffsetDateTime.parse("2025-10-12T08:30-03:00"))
                    .valorPassagem(new BigDecimal("300.00"))
                    .quantidadePoltronasTotal(100)
                    .quantidadePoltronasOcupadas(0)
                    .codigoAeroportoOrigem("CWB")
                    .codigoAeroportoDestino("POA")
                    .build();

                try {
                    flightService.create(voo1);
                    flightService.create(voo2);
                    flightService.create(voo3);
                    System.out.println(">> Voos iniciais inseridos");
                } catch (Exception e) {
                    System.out.println(">> Erro ao inserir voos: " + e.getMessage());
                    throw e;
                }
            }
        };
    }
}