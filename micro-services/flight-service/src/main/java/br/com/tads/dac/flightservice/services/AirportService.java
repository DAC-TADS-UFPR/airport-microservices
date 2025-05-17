package br.com.tads.dac.flightservice.services;

import br.com.tads.dac.flightservice.exceptions.AirportCodeAlreadyExistsException;
import br.com.tads.dac.flightservice.exceptions.ResourceNotFoundException;
import br.com.tads.dac.flightservice.mappers.AirportMapper;
import br.com.tads.dac.flightservice.models.dto.AirportRequestDTO;
import br.com.tads.dac.flightservice.models.entities.Airport;
import br.com.tads.dac.flightservice.repositories.AirportRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AirportService {

    @Autowired
    private AirportRepository airportRepository;


    public Airport create(AirportRequestDTO airportDTO) {
        Airport airport = AirportMapper.toEntity(airportDTO);
        Optional<Airport> existingAirport = airportRepository.findByCodigo(airport.getCodigo());
        if(existingAirport.isPresent()) {
            throw new AirportCodeAlreadyExistsException("Aeroporto já cadastrado");
        }
        return airportRepository.save(airport);
    }

    public Airport update(String airportCode, AirportRequestDTO airportDTO) {
        try {
            Airport airport = AirportMapper.toEntity(airportDTO);
            Airport entity = airportRepository.getReferenceById(airportCode);
            updateData(entity,airport);
            return airportRepository.save(entity);
        }
        catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException(airportCode);
        }
    }

    private void updateData(Airport entity, Airport obj) {
        entity.setCodigo(obj.getCodigo());
        entity.setNome(obj.getNome());
        entity.setCidade(obj.getCidade());
        entity.setUf(obj.getUf());
    }

    public void delete(String airportCode) {
        Airport airport = airportRepository.findById(airportCode).orElseThrow(() -> new EntityNotFoundException("Aeroporto nao encontrado"));
        airportRepository.delete(airport);
    }

    public List<Airport> getAll() {
        return airportRepository.findAll();
    }

    public Optional<Airport> getByAirportCode(String airportCode) {
        return airportRepository.findById(airportCode);
    }


}
