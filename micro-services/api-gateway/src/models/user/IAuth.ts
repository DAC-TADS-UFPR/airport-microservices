import { UserType } from "./UserType";

export class IAuth {
    login: string;
    nome: string;
    userId: string;
    tipo:UserType;
    constructor(
        login: string,
        nome: string,
        userId: string,
        tipo:UserType
    ) {
        this.login = login;
        this.nome = nome;
        this.userId = userId;
        this.tipo = tipo;
    }  
}