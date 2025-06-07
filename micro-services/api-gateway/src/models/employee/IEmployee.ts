export class IEmployee {
    codigo: string;
    nome: string;
    email: string;
    telefone: string;
    cpf: string;
    senha?: string;

    constructor(
        codigo: string,
        nome: string,
        email: string,
        telefone: string,
        cpf: string,
        senha?: string
    ) {
        this.codigo = codigo;
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.cpf = cpf;
        this.senha = senha;
    }
}