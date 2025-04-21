export class IClient {
    id: string;
    name: string;
    email: string;
    complement: string;
    cep: string;
    cpf: string;
    city: string;
    street: string;
    neighborhood: string;
    number: string;
    state: string;
    constructor(
        id: string,
        name: string,
        email: string,
        complement: string,
        cep: string,
        cpf: string,
        city: string,
        street: string,
        neighborhood: string,
        number: string,
        state: string,
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.cep = cep;
        this.cpf = cpf;
        this.city = city;
        this.street = street;
        this.neighborhood = neighborhood;
        this.number = number;
        this.state = state;
        this.complement = complement;
    }
}