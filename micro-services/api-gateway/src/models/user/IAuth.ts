import { UserType } from "./UserType";

export class IAuth {
    id: string;
    email: string;
    password: string;
    userType:UserType;
    constructor(
        id: string,
        email: string,
        password: string,
        userType:UserType
    ) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.userType = userType;
    }  
}