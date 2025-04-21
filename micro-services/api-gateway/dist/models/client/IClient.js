export class IClient {
    constructor(id, name, email, password, complement, cep, city, street, neighborhood, number, state) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = '123456';
        this.cep = cep;
        this.city = city;
        this.street = street;
        this.neighborhood = neighborhood;
        this.number = number;
        this.state = state;
        this.complement = complement;
    }
}
