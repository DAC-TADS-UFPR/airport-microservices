package br.com.tads.dac.authservice.domain.services;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailService {
    
    private final JavaMailSender mailSender;

    public void sendPasswordEmail(String to, String password) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("equipamentosmatheus@gmail.com");
        message.setTo(to);
        message.setSubject("Sua senha de acesso ao sistema");
        message.setText("Sua senha de acesso é: " + password);
        
        mailSender.send(message);
    }
}