export class Endereco {
    cep: string;
    rua: string;
    bairro: string;
    cidade: string;
    uf: string;
    numero: string;
    complemento: string;

    constructor(
        cep: string,
        rua: string,
        bairro: string,
        cidade: string,
        uf: string,
        numero: string,
        complemento: string
    ) {
        this.cep = cep;
        this.rua = rua;
        this.bairro = bairro;
        this.cidade = cidade;
        this.uf = uf;
        this.numero = numero;
        this.complemento = complemento;
    }
}