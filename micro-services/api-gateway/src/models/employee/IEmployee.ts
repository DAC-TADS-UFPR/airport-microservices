export class IEmployee {
    id: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    cpf: string;
    

    constructor(
        id: string,
        name: string,
        email: string,
        password: string,
        phone: string,
        cpf: string,
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.cpf = cpf;
    }
}