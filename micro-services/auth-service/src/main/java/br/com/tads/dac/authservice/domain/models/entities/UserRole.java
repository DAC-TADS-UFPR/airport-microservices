package br.com.tads.dac.authservice.domain.models.entities;

public enum UserRole {
    CLIENTE("CLIENTE"),
    FUNCIONARIO("FUNCIONARIO");
    

    private final String descricao;

    UserRole(String descricao) {
        this.descricao = descricao;
    }

    public String getRole() {
        return descricao;
    }    
}
