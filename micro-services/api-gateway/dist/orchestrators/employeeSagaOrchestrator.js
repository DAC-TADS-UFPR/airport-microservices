import axios from "axios";
import { SERVICE_CONFIG } from "../config/services";
import { IAuth } from "../models/user/IAuth";
import { UserType } from "../models/user/UserType";
export class EmployeeSagaOrchestatorator {
    constructor() { }
    async createEmployee(employeeData) {
        try {
            console.log('Employee create request:', employeeData);
            const employeeResponse = await axios.post(`${SERVICE_CONFIG.EMPLOYEE.url}`, employeeData);
            const employeeId = employeeResponse.data?.id;
            if (employeeResponse.status !== 201) {
                return employeeResponse;
            }
            const authRequest = new IAuth(employeeData.email, employeeData.password, UserType.EMPLOYEE);
            const authResponse = await axios.post(`${SERVICE_CONFIG.AUTH.url}/create`, authRequest);
            if (authResponse.status !== 201) {
                await axios.delete(`${SERVICE_CONFIG.EMPLOYEE.url}/${employeeId}`);
                return authResponse;
            }
            return authResponse;
        }
        catch (error) {
            const axiosError = error;
            console.error('Error during employee creation:', axiosError.response?.data || axiosError.message);
            return {
                status: axiosError.response?.status || 500,
                data: axiosError.response?.data || { message: "Erro interno" },
            };
        }
    }
}
