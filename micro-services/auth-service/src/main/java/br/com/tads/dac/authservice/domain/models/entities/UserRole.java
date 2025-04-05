package br.com.tads.dac.authservice.domain.models.entities;

public enum UserRole {
    CLIENT("CLIENT"),
    EMPLOYEE("EMPLOYEE");
    

    private final String description;

    UserRole(String description) {
        this.description = description;
    }

    public String getRole() {
        return description;
    }    
}
