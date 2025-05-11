import { UserType } from "./UserType";

export class IAuth {
    email: string;
    name: string;
    userId: string;
    userType:UserType;
    constructor(
        email: string,
        name: string,
        userId: string,
        userType:UserType
    ) {
        this.email = email;
        this.name = name;
        this.userId = userId;
        this.userType = userType;
    }  
}