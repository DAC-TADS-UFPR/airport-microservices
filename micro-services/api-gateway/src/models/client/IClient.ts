export class IClient {
    id: string;
    nome: string;
    email: string;
    password: string;
    phone: string;
    uf: string;
    complemento: string;
    cep: string;

    constructor(
        id: string,
        nome: string,
        email: string,
        password: string,
        phone: string,
        uf: string,
        complemento: string,
        cep: string
    ) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.uf = uf;
        this.complemento = complemento;
        this.cep = cep;
    }
}