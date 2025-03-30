package br.com.tads.dac.authservice.application.services.impl;

import java.nio.charset.StandardCharsets;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import br.com.tads.dac.authservice.application.services.TokenService;
import br.com.tads.dac.authservice.domain.user.LoginDTO;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;

public class TokenServiceImpl implements TokenService {

    @Value("${manutencao.equipamento.jwt.expiration}")
    private String expiration;

    @Value("${manutencao.equipamento.jwt.secret}")
    private String secret;

    //@Autowired
    //UserService userService;

    //@Override
    public String generateToken(LoginDTO loginDTO) {
        String token = null;
        /*Date today = new Date();
        Date dateExpiration = new Date(today.getTime() + Long.parseLong(expiration));

        User user = userService.findByEmail(loginDTO.email() , true);
        String senha = userService.findById(user.getId()).getPassword();
        user.setSenha(senha);    

        if (user.isStatus()) {
            
            Key key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
            
            token = Jwts.builder()
                    .setIssuer("mutencaoequipamentoapi")
                    .setSubject(user.id().toString())
                    .claim("id", user.id())
                    .claim("email", user.email())
                    .claim("nome", user.nome())
                    .claim("role", user.role())
                    .setIssuedAt(today)
                    .setExpiration(dateExpiration)
                    .signWith(key, SignatureAlgorithm.HS256)
                    .compact();
        } else {
            return "BLOQUEADO";
        }*/
        return token;
    }

    //@Override
    public boolean validateToken(String token) {
         if (token == null) {
            return false;
        }
        try {
            Key key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (MalformedJwtException e) {
            System.out.println("Token mal formado");
        } catch (UnsupportedJwtException e) {
            System.out.println("Token nao suportado");
        } catch (ExpiredJwtException e) {
            System.out.println("Token expirado");
        } catch (IllegalArgumentException e) {
            System.out.println("Token nulo");
        }
        return false;
    }

    @Override
    public String generateToken() {
        return "";
    }

    @Override
    public boolean validateToken() {
        return false;
    }
}
