import axios from "axios";
import { SERVICE_CONFIG } from "../config/services";
import { IAuth } from "../models/user/IAuth";
import { IEmployee } from "../models/employee/IEmployee";
import { UserType } from "../models/user/UserType";
import { EmployeeService } from "../services/employeeService";

export class EmployeeSagaOrchestatorator {    
    public constructor() {}
    
    public async createEmployee(employeeData: IEmployee): Promise<any> {
        console.log('Employee create request:', employeeData);
        const employeeResponse = await axios.post(`${SERVICE_CONFIG.EMPLOYEE.url}`, employeeData);
        const employeeId = employeeResponse.data?.id;
        if(employeeResponse.status !== 200) {
            return employeeResponse;
        }
        const authRequest:IAuth = new IAuth( employeeData.email, employeeData.password , UserType.EMPLOYEE);
        const authResponse = await axios.post(`${SERVICE_CONFIG.AUTH.url}/create`, authRequest);
        if(authResponse.status !== 201) {
            await axios.delete(`${SERVICE_CONFIG.EMPLOYEE.url}/${employeeId}`);
            return authResponse;
        }  
        return authResponse;
    }
}