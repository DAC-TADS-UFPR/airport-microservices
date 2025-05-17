import { Endereco } from "./IEndereco";

export class IClient {
    id: string;
    nome: string;
    email: string;
    cpf: string;
    endereco: Endereco;
    constructor(
        id: string,
        nome: string,
        email: string,
        cpf: string,
        endereco: Endereco
    ) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.cpf = cpf;
        this.endereco = endereco;
    }
}