import axios, { AxiosError } from "axios";
import { SERVICE_CONFIG } from "../config/services";
import { IAuth } from "../models/user/IAuth";
import { IEmployee } from "../models/employee/IEmployee";
import { UserType } from "../models/user/UserType";

export class EmployeeSagaOrchestatorator {    
    public constructor() {}
    
    public async createEmployee(employeeData: IEmployee , token:string): Promise<any> {
        try {      
            var options = {
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
                }
            }      
            const employeeResponse = await axios.post(`${SERVICE_CONFIG.EMPLOYEE.url}`, employeeData);
            var employeeId = employeeResponse.data?.cpf;
            if(employeeResponse.status !== 201) {
                return employeeResponse;
            }
            const authRequest:IAuth = new IAuth( employeeData.email, employeeData.nome ,employeeId, UserType.FUNCIONARIO , employeeData.senha);
            console.log('authRequest', authRequest);
            const authResponse = await axios.post(`${SERVICE_CONFIG.AUTH.url}/`, authRequest , options);
            if(authResponse.status !== 201) {
                await axios.delete(`${SERVICE_CONFIG.EMPLOYEE.url}/${employeeId}/`);
                return authResponse;
            }  
            return employeeResponse;
        }catch (error) {
            console.log('error', error);    
            if (employeeId) {
                await axios.delete(`${SERVICE_CONFIG.EMPLOYEE.url}/${employeeId}`);
            }

            const axiosError = error as AxiosError;
            console.error('Error during employee creation:', axiosError.response?.data || axiosError.message);
            return {
                status: axiosError.response?.status || 500,
                data: axiosError.response?.data || { message: "Erro ao criar funcionario" },
            };
        }   
        
    }

    public async updateEmployee(employeeData: IEmployee): Promise<any> {
        try {
            const employeeResponse = await axios.put(`${SERVICE_CONFIG.EMPLOYEE.url}/${employeeData.cpf}`, employeeData);
            const employeeId = employeeResponse.data?.codigo;
            console.log('employeeId', employeeId);
            console.log('data', employeeResponse.data);
            if(employeeResponse.status !== 200) {
                return employeeResponse;
            }
            const authRequest:IAuth = new IAuth( employeeData.email, employeeData.nome ,employeeId, UserType.FUNCIONARIO);
            const authResponse = await axios.put(`${SERVICE_CONFIG.AUTH.url}`, authRequest);
            
            return employeeResponse;
        }catch (error) {
            const axiosError = error as AxiosError;
            console.error('Error during employee update:', axiosError.response?.data || axiosError.message);
            return {
                status: axiosError.response?.status || 500,
                data: axiosError.response?.data || { message: "Erro interno ao atualizar Funcionário" },
            };
        }   
        
    }
}