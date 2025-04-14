import axios, { Axios, AxiosResponse } from "axios";
import { SERVICE_CONFIG } from "../config/services";
import { IEmployee } from "../models/employee/IEmployee";

export class EmployeeService {
    public async create(employeeData : IEmployee): Promise<AxiosResponse<any , any>> {
        const response = await axios.post(`${SERVICE_CONFIG.EMPLOYEE.url}` ,employeeData);
        return response;
    }	
}