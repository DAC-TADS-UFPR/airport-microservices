import axios from "axios";
import { SERVICE_CONFIG } from "../config/services";
export class EmployeeService {
    async create(employeeData) {
        const response = await axios.post(`${SERVICE_CONFIG.EMPLOYEE.url}`, employeeData);
        return response;
    }
}
