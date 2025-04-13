export class IClient {
    id: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        id: string,
        name: string,
        email: string,
        password: string,
        phone: string,
        address: string,
        city: string,
        state: string,
        country: string,
        postalCode: string,
        createdAt?: Date,
        updatedAt?: Date
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.address = address;
        this.city = city;
        this.state = state;
        this.country = country;
        this.postalCode = postalCode;
        this.createdAt = createdAt || new Date();
        this.updatedAt = updatedAt || new Date();
    }
}