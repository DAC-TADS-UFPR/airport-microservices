import { UserType } from "./UserType";

export class IAuth {
    login: string;
    nome: string;
    userId: string;
    tipo:UserType;
    senha?: string;
    constructor(
        login: string,
        nome: string,
        userId: string,
        tipo:UserType,
        senha?: string
    ) {
        this.login = login;
        this.nome = nome;
        this.userId = userId;
        this.tipo = tipo;
        this.senha = senha;
    }  
}