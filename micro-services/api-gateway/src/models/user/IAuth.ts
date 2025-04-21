import { UserType } from "./UserType";

export class IAuth {
    email: string;
    password: string;
    name: string;
    id: string;
    userType:UserType;
    constructor(
        email: string,
        password: string,
        name: string,
        id: string,
        userType:UserType
    ) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.id = id;
        this.userType = userType;
    }  
}