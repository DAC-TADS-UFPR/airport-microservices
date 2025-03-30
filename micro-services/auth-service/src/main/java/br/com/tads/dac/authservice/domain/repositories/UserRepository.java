package br.com.tads.dac.authservice.domain.repositories;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import br.com.tads.dac.authservice.domain.models.entities.User;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

    Optional<User> findByEmail(String email);

    @Query(value = "{ 'email' : { $regex: ?0, $options: 'i' } }", exists = true)
    boolean existsByEmail(String email);

    Optional<User> findByUserId(String userId);
}